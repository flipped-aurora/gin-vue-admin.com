import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const heroPath = path.join(root, 'docs/.vitepress/theme/components/home/sections/HeroSection.vue')
const landingPath = path.join(root, 'docs/.vitepress/theme/styles/landing.scss')

const hero = fs.readFileSync(heroPath, 'utf8')
const landing = fs.readFileSync(landingPath, 'utf8')

const failures = []

if (!/\.hero__lead\s*\{[^}]*color:\s*#808080;/s.test(hero)) {
  failures.push('Hero subtitle .hero__lead should use color #808080.')
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
