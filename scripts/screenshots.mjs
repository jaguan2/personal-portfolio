// Capture the real portfolio with headless Chrome, following TaskNook's CDP approach.
// Node 22+; npm run screenshots. Set CHROME_PATH for a nonstandard browser location.
import { spawn } from 'node:child_process'
import { existsSync, mkdtempSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createServer } from 'vite'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const output = join(root, 'docs', 'screenshots')
const chrome = [process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome', '/usr/bin/chromium',
].find(path => path && existsSync(path))
if (!chrome) throw new Error('Set CHROME_PATH to your Chrome or Chromium executable.')

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
async function until(check, label) {
  const deadline = Date.now() + 30000
  while (Date.now() < deadline) {
    const value = await check()
    if (value) return value
    await delay(100)
  }
  throw new Error(`Timed out waiting for ${label}`)
}

const profile = mkdtempSync(join(tmpdir(), 'portfolio-screenshots-'))
const server = await createServer({ root, server: { host: '127.0.0.1', port: 0, open: false } })
let browser, socket
try {
  await server.listen()
  const address = server.httpServer.address()
  const url = `http://127.0.0.1:${address.port}/personal-portfolio/`
  browser = spawn(chrome, ['--headless=new', '--remote-debugging-port=0',
    `--user-data-dir=${profile}`, '--no-first-run', '--no-default-browser-check',
    '--hide-scrollbars', 'about:blank'], { windowsHide: true, stdio: 'ignore' })
  let launchError
  browser.on('error', error => { launchError = error })
  const port = await until(() => {
    if (launchError) throw launchError
    const file = join(profile, 'DevToolsActivePort')
    return existsSync(file) && readFileSync(file, 'utf8').split('\n')[0]
  }, 'Chrome startup')
  const response = await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, { method: 'PUT' })
  const tab = await response.json()
  socket = new WebSocket(tab.webSocketDebuggerUrl)
  await new Promise((resolve, reject) => { socket.onopen = resolve; socket.onerror = reject })
  let id = 0
  const pending = new Map()
  socket.onmessage = event => {
    const message = JSON.parse(event.data)
    const request = pending.get(message.id)
    if (!request) return
    clearTimeout(request.timer)
    pending.delete(message.id)
    if (message.error) request.reject(new Error(message.error.message))
    else request.resolve(message.result)
  }
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const requestId = ++id
    const timer = setTimeout(() => { pending.delete(requestId); reject(new Error(`Timed out: ${method}`)) }, 30000)
    pending.set(requestId, { resolve, reject, timer })
    socket.send(JSON.stringify({ id: requestId, method, params }))
  })
  const evaluate = async expression => {
    const result = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true })
    if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception?.description || 'Page evaluation failed')
    return result.result.value
  }
  mkdirSync(output, { recursive: true })
  for (const shot of [
    { name: 'desktop-home', width: 1440, height: 900 },
    { name: 'desktop-featured-work', width: 1440, height: 900, selector: '#projects' },
    { name: 'desktop-other-works', width: 1440, height: 900, selector: '#other-works' },
    { name: 'mobile-home', width: 390, height: 844 },
  ]) {
    await send('Emulation.setDeviceMetricsOverride', { width: shot.width, height: shot.height, deviceScaleFactor: 1, mobile: shot.width < 768 })
    await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] })
    await send('Page.navigate', { url })
    await until(async () => {
      try { return await evaluate("document.readyState === 'complete' && document.body.classList.contains('loaded')") }
      catch { return false }
    }, 'portfolio loader')
    await evaluate('document.fonts.ready.then(() => true)')
    // Load below-the-fold images before capturing complete sections.
    await evaluate("document.querySelectorAll('img[loading=lazy]').forEach(image => { image.loading = 'eager' }); true")
    await until(() => evaluate('[...document.images].every(image => image.complete && image.naturalWidth > 0)'), 'images')
    await send('Page.enable')
    let clip
    if (shot.selector) {
      const selector = JSON.stringify(shot.selector)
      clip = await evaluate(`(() => {
        const element = document.querySelector(${selector});
        if (!element) throw new Error('Missing screenshot section');
        window.scrollTo({ top: element.offsetTop - 80, behavior: 'instant' });
        const rect = element.getBoundingClientRect();
        return { x: 0, y: rect.top + window.scrollY, width: ${shot.width}, height: Math.ceil(rect.height), scale: 1 };
      })()`)
    }
    await delay(500)
    const overflow = await evaluate('document.documentElement.scrollWidth > innerWidth')
    if (overflow) throw new Error(`Horizontal overflow in ${shot.name}`)
    const image = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: !!clip, ...(clip ? { clip } : {}) })
    if (!image.data) throw new Error(`Empty screenshot: ${shot.name}`)
    writeFileSync(join(output, `${shot.name}.png`), Buffer.from(image.data, 'base64'))
    console.log(`Captured ${shot.name}.png (${shot.width} × ${clip?.height || shot.height})`)
  }
} finally {
  socket?.close()
  browser?.kill()
  await server.close()
}
