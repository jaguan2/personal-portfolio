// Capture the real portfolio with headless Chrome, following TaskNook's CDP approach.
// Node 22+; npm run screenshots. Set CHROME_PATH for a nonstandard browser location.
import { spawn } from 'node:child_process'
import { existsSync, mkdtempSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createServer } from 'vite'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const responsive = process.argv.includes('--responsive')
const output = join(root, 'docs', 'screenshots', ...(responsive ? ['responsive'] : []))
const shots = responsive ? [
  { name: 'phone-small-home', width: 320, height: 720 },
  { name: 'phone-small-skills', width: 320, height: 720, selector: '#skills' },
  { name: 'phone-home', width: 390, height: 844 },
  { name: 'phone-projects', width: 390, height: 844, selector: '#projects' },
  { name: 'phone-menu', width: 390, height: 844, selector: '#other-works' },
  { name: 'phone-experience', width: 390, height: 844, selector: '#experience' },
  { name: 'phone-landscape-home', width: 844, height: 390 },
  { name: 'phone-wide-skills', width: 600, height: 900, selector: '#skills' },
  { name: 'ipad-mini-home', width: 768, height: 1024 },
  { name: 'ipad-mini-about', width: 768, height: 1024, selector: '#about' },
  { name: 'ipad-home', width: 820, height: 1180 },
  { name: 'ipad-experience', width: 820, height: 1180, selector: '#experience' },
  { name: 'ipad-projects', width: 820, height: 1180, selector: '#projects' },
  { name: 'ipad-skills', width: 820, height: 1180, selector: '#skills' },
  { name: 'ipad-landscape-home', width: 1180, height: 820 },
  { name: 'ipad-landscape-projects', width: 1180, height: 820, selector: '#projects' },
  { name: 'ipad-pro-home', width: 1024, height: 1366 },
  { name: 'ipad-pro-landscape-home', width: 1366, height: 1024 },
  { name: 'phone-dark-projects', width: 390, height: 844, selector: '#projects', dark: true },
] : [
  { name: 'desktop-home', width: 1440, height: 900 },
  { name: 'desktop-featured-work', width: 1440, height: 900, selector: '#projects' },
  { name: 'desktop-other-works', width: 1440, height: 900, selector: '#other-works' },
  { name: 'mobile-home', width: 390, height: 844 },
]
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
const server = await createServer({ root, configLoader: 'runner', server: { host: '127.0.0.1', port: 0, open: false } })
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
  const checks = []
  for (const shot of shots) {
    const captureUrl = `${url}?capture=${shot.name}`
    await send('Emulation.setDeviceMetricsOverride', { width: shot.width, height: shot.height, deviceScaleFactor: 1, mobile: shot.width < 768 })
    await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] })
    await send('Page.navigate', { url: captureUrl })
    await until(async () => {
      try { return await evaluate(`location.href === ${JSON.stringify(captureUrl)} && document.readyState === 'complete' && document.body.classList.contains('loaded')`) }
      catch { return false }
    }, 'portfolio loader')
    await evaluate('document.fonts.ready.then(() => true)')
    await evaluate('document.activeElement?.blur()')
    if (shot.dark) await evaluate("document.querySelector('.theme-toggle').click()")
    // Load below-the-fold images before capturing complete sections.
    await evaluate("document.querySelectorAll('img[loading=lazy]').forEach(image => { image.loading = 'eager' }); true")
    await until(() => evaluate('[...document.images].every(image => image.complete && image.naturalWidth > 0)'), 'images')
    await evaluate('Promise.all([...document.images].map(image => image.decode().catch(() => {})))')
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
    if (responsive) {
      const result = await evaluate(`(() => {
        const problems = [];
        const selectors = ['.skill-row', '.skill-card-head', '.menu-item-head', '.experience-header', '.project-title-row', 'nav'];
        for (const selector of selectors) {
          document.querySelectorAll(selector).forEach(el => {
            if (el.scrollWidth > el.clientWidth + 2) problems.push({selector, text:el.textContent.trim().slice(0,70), extra:el.scrollWidth-el.clientWidth});
          });
        }
        const nav = document.querySelector('nav').getBoundingClientRect();
        const right = document.querySelector('.nav-right').getBoundingClientRect();
        if (right.right > nav.right + 1) problems.push({selector:'.nav-right',extra:right.right-nav.right});
        const dot = document.querySelector('.depth-carousel-dot').getBoundingClientRect();
        const visualDot = getComputedStyle(document.querySelector('.depth-carousel-dot'), '::before');
        if (visualDot.content !== 'none' && visualDot.width !== visualDot.height) problems.push({selector:'.depth-carousel-dot::before',text:'Marker is not circular'});
        return {width:innerWidth,problems,dot:{width:dot.width,height:dot.height}};
      })()`)
      checks.push({name:shot.name,...result})
      console.log(JSON.stringify(checks.at(-1)))
    }
    const overflow = await evaluate('document.documentElement.scrollWidth > innerWidth')
    if (overflow) throw new Error(`Horizontal overflow in ${shot.name}`)
    // Responsive captures use the real viewport; long offscreen captures can
    // miss composited layers after Chrome changes mobile device metrics.
    const fullSection = clip && !responsive
    const image = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: !!fullSection, ...(fullSection ? { clip } : {}) })
    if (!image.data) throw new Error(`Empty screenshot: ${shot.name}`)
    writeFileSync(join(output, `${shot.name}.png`), Buffer.from(image.data, 'base64'))
    console.log(`Captured ${shot.name}.png (${shot.width} × ${fullSection ? clip.height : shot.height})`)
    if (responsive && shot.name === 'phone-projects') {
      const swipe = await evaluate(`(() => {
        const el = document.querySelector('.depth-carousel-card[tabindex="0"]');
        el.scrollIntoView({block:'center',behavior:'instant'});
        const r = el.getBoundingClientRect();
        return {x:r.left+r.width*.75,y:r.top+r.height/2};
      })()`)
      await send('Emulation.setTouchEmulationEnabled', {enabled:true,maxTouchPoints:1})
      await send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[swipe]})
      for (const offset of [20,45,70,100]) await send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:swipe.x-offset,y:swipe.y}]})
      await send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]})
      await delay(100)
      const swipePassed = await evaluate("document.querySelector('.depth-carousel-count').textContent.trim() === '2 / 6' && !document.querySelector('dialog[open]')")
      console.log(`Phone gallery swipe: ${swipePassed ? 'PASS' : 'FAIL'}`)
      if (!swipePassed) process.exitCode = 1
      await evaluate("document.querySelector('.depth-carousel-card[tabindex=\"0\"]').click()")
      await delay(100)
      const modalPassed = await evaluate("!!document.querySelector('dialog[open]')?.contains(document.activeElement)")
      if (!modalPassed) process.exitCode = 1
      console.log(`Phone lightbox focus: ${modalPassed ? 'PASS' : 'FAIL'}`)
      await evaluate("document.querySelector('dialog[open] button').click()")
      await send('Emulation.setTouchEmulationEnabled',{enabled:false})
    }
    if (responsive && shot.name === 'phone-home') {
      await evaluate("document.querySelector('.menu-btn').click()")
      await delay(50)
      const menuPassed = await evaluate("document.querySelector('.menu-btn').getAttribute('aria-expanded') === 'true' && getComputedStyle(document.querySelector('.nav-links')).display !== 'none'")
      await evaluate("document.querySelector('.nav-links a[href=\"#about\"]').click()")
      await delay(50)
      const closePassed = await evaluate("document.querySelector('.menu-btn').getAttribute('aria-expanded') === 'false'")
      console.log(`Phone menu open / navigate / close: ${menuPassed && closePassed ? 'PASS' : 'FAIL'}`)
      if (!menuPassed || !closePassed) process.exitCode = 1
    }
  }
  if (responsive) {
    writeFileSync(join(output, 'layout-checks.json'), JSON.stringify(checks, null, 2))
    if (checks.some(check => check.problems.length)) process.exitCode = 1
  }
} finally {
  socket?.close()
  browser?.kill()
  await server.close()
}
