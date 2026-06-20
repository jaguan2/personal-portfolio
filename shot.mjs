import { chromium } from 'playwright'

const browser = await chromium.launch({ channel: 'msedge', headless: true })
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' })
const page = await ctx.newPage()
const errors = []
page.on('pageerror', e => errors.push(String(e)))
await page.goto('http://localhost:5173', { waitUntil: 'domcontentloaded' })
await page.waitForTimeout(2200)

const quote = page.locator('.quote-text')
await quote.scrollIntoViewIfNeeded()
await page.waitForTimeout(300)
const box = await quote.boundingBox()
await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2)
const label = () => page.locator('.quote-label').textContent()

// a flick = burst of wheel events with momentum tail
async function flick(dir) {
  for (let i = 0; i < 12; i++) { await page.mouse.wheel(dir * 16, 0); await page.waitForTimeout(20) }
}

console.log('landing:', await label())

await flick(1)
await page.waitForTimeout(150)
console.log('after 1st swipe (expect tomorrow):', await label())

await flick(1)  // immediately, within the 2s gate
await page.waitForTimeout(150)
console.log('swipe again WITHIN 2s (expect STILL tomorrow):', await label())

await page.waitForTimeout(2000) // wait out the gate
await flick(1)
await page.waitForTimeout(150)
console.log('swipe again AFTER 2s (expect in 2 days):', await label())

console.log('CONSOLE ERRORS:', errors.length ? errors : 'none')
await browser.close()
