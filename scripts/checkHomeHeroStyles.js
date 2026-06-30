import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const homeLandingPath = path.join(root, 'docs/.vitepress/theme/components/home/HomeLanding.vue')
const heroPath = path.join(root, 'docs/.vitepress/theme/components/home/sections/HeroSection.vue')
const videoPath = path.join(root, 'docs/.vitepress/theme/components/home/sections/VideoSection.vue')
const landingPath = path.join(root, 'docs/.vitepress/theme/styles/landing.scss')

const homeLanding = fs.readFileSync(homeLandingPath, 'utf8')
const hero = fs.readFileSync(heroPath, 'utf8')
const video = fs.readFileSync(videoPath, 'utf8')
const landing = fs.readFileSync(landingPath, 'utf8')

const failures = []

if (!/\.hero__lead\s*\{[^}]*color:\s*#808080;/s.test(hero)) {
  failures.push('Hero subtitle .hero__lead should use color #808080.')
}

for (const text of [
  '让现有 API 成为',
  'AI Agent <span class="hero__title-accent">可直接调用</span>的',
  '业务能力',
  '在 GVA 中选择 API，填写每个 Skill 的名称与描述',
  '调用这些 API，统一内部权限校验，无需额外配置。',
]) {
  if (!hero.includes(text)) {
    failures.push(`Mobile hero title should include: ${text}`)
  }
}

if (!/\.hero__mobile-title\s*\{\s*display:\s*none;/s.test(hero)) {
  failures.push('Mobile hero title should be hidden outside mobile media query.')
}

const mobileHero = hero.match(/@media\s*\(max-width:\s*860px\)\s*\{(?<body>[\s\S]*)\n\}/)
if (!mobileHero?.groups?.body) {
  failures.push('Hero should define mobile-only styles.')
} else {
  const body = mobileHero.groups.body
  for (const [selector, expected] of [
    ['.hero__desktop-title', 'display: none;'],
    ['.hero__mobile-title', 'display: block;'],
    ['.hero__mobile-title', 'font-size: 28px;'],
    ['.hero__inner', 'width: min(100%, 300px);'],
    ['.hero__lead', 'font-size: 13px;'],
    ['.hero__actions', 'flex-direction: column;'],
    ['.hero__actions .gva-btn', 'width: 90%;'],
  ]) {
    const re = new RegExp(`${selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*\\{[^}]*${expected.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 's')
    if (!re.test(body)) {
      failures.push(`Mobile hero styles should set ${selector} ${expected}`)
    }
  }
}

const buttonRule = landing.match(/\.gva-btn\s*\{(?<body>[^}]*)\}/s)
if (!buttonRule?.groups?.body) {
  failures.push('Missing .gva-btn rule in landing.scss.')
} else {
  const body = buttonRule.groups.body
  for (const [property, value] of [
    ['height', '43px'],
    ['font-size', '14px'],
    ['font-weight', 'normal'],
  ]) {
    const re = new RegExp(`${property}:\\s*${value};`)
    if (!re.test(body)) {
      failures.push(`.gva-btn should set ${property}: ${value}.`)
    }
  }
}

const ghostRule = landing.match(/\.gva-btn--ghost\s*\{(?<body>[^}]*)\}/s)
if (!ghostRule?.groups?.body) {
  failures.push('Missing .gva-btn--ghost rule in landing.scss.')
} else if (!/color:\s*var\(--gva-primary\);/.test(ghostRule.groups.body)) {
  failures.push('.gva-btn--ghost should use theme color var(--gva-primary).')
}

if (failures.length) {
  console.error(failures.join('\n'))
  process.exit(1)
}

const mobileVideo = video.match(/@media\s*\(max-width:\s*860px\)\s*\{(?<body>[\s\S]*)\n\}/)
if (!mobileVideo?.groups?.body) {
  failures.push('VideoSection should define mobile-only styles.')
} else {
  const body = mobileVideo.groups.body
  for (const [selector, expected] of [
    ['.vsec', 'padding: 28px 16px 0;'],
    ['.vsec__card', 'border-radius: 14px;'],
    ['.vsec__player', 'aspect-ratio: 306 / 236;'],
    ['.vsec__play', 'width: 40px;'],
  ]) {
    const re = new RegExp(`${selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*\\{[^}]*${expected.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 's')
    if (!re.test(body)) {
      failures.push(`Mobile video styles should set ${selector} ${expected}`)
    }
  }
}

if (failures.length) {
  console.error(failures.join('\n'))
  process.exit(1)
}
