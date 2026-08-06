import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'
import { parse } from '@vue/compiler-sfc'

const sectionRoot = new URL(
  '../docs/.vitepress/theme/components/home/sections/',
  import.meta.url
)

const headingCases = [
  {
    file: 'HeroSection.vue', tag: 'h1', text: '用 AI 构建系统', count: 1,
    lightClasses: ['text-[#1a1a1a]'], accents: [['系统', 'text-[#2264F2]'], ['AI', 'text-[#2264F2]']]
  },
  {
    file: 'HeroSection.vue', tag: 'h1', text: '让现有 API 成为', count: 1,
    lightClasses: ['text-[#1a1a1a]'], accents: [['可直接调用', 'text-[var(--gva-primary)]']]
  },
  {
    file: 'ToolCompat.vue', tag: 'p', text: '你熟悉的 AI 工具', count: 1,
    lightClasses: ['text-[#030303]'], accents: [['AI 工具', 'text-[#2264F2]']]
  },
  {
    file: 'SkillsSystem.vue', tag: 'h3', text: '不只是接入', count: 2,
    lightClasses: ['text-[#050505]', 'text-[#030303]'], accents: [['直接调用', 'text-[#2264F2]']]
  },
  {
    file: 'LiveGenerate.vue', tag: 'h3', text: '一句话需求', count: 2,
    lightClasses: ['text-[#050505]', 'text-[#1c1c1c]'], accents: [['一句话需求', 'text-[#2264F2]']]
  },
  {
    file: 'ApiCli.vue', tag: 'h2', text: '已有 API', count: 2,
    lightClasses: ['text-[#050505]', '!text-[#050505]'],
    accents: [['一键生成', 'text-[#2264F2]'], ['一键生成', '!text-[#2264F2]']]
  },
  {
    file: 'CallDeps.vue', tag: 'h2', text: '调用顺序', count: 1,
    lightClasses: ['text-[var(--gva-text-strong)]'], accents: [['自动编排', 'text-[var(--gva-primary)]']]
  },
  {
    file: 'CoreFeatures.vue', tag: 'h2', text: '亲自试一试', count: 1,
    lightClasses: ['text-[var(--gva-text-strong)]'], accents: [['AI 驱动', 'text-[var(--gva-primary)]']]
  },
  {
    file: 'Community.vue', tag: 'h2', text: '3 万+', count: 1,
    lightClasses: ['text-[var(--gva-text-strong)]'], accents: [['3 万+', 'text-[var(--gva-primary)]']]
  },
  {
    file: 'StarUsers.vue', tag: 'h2', text: '他们都在用', count: 1,
    lightClasses: ['text-[var(--gva-text-strong)]'], accents: [['GVA', 'text-[var(--gva-primary)]']]
  },
  {
    file: 'FinalCta.vue', tag: 'h2', text: '强大的 API', count: 1,
    lightClasses: ['text-[var(--gva-text-strong)]'], accents: [['更强大的 AI', 'text-[var(--gva-primary)]']]
  }
]

function walk(node, visit) {
  visit(node)
  for (const child of node.children ?? []) walk(child, visit)
}

function textContent(node) {
  if (node.type === 2) return node.content
  return (node.children ?? []).map(textContent).join('')
}

function classList(node) {
  const classAttribute = node.props?.find(
    (prop) => prop.type === 6 && prop.name === 'class'
  )
  return classAttribute?.value?.content.split(/\s+/).filter(Boolean) ?? []
}

async function parseTemplate(file) {
  const source = await readFile(new URL(file, sectionRoot), 'utf8')
  const { descriptor, errors } = parse(source, { filename: file })
  assert.deepEqual(errors, [], `${file} must parse without errors`)
  assert.ok(descriptor.template?.ast, `${file} must contain a template`)
  return descriptor.template.ast
}

test('requested home headings explicitly use the strong text token in dark mode', async () => {
  const templates = new Map()

  for (const headingCase of headingCases) {
    if (!templates.has(headingCase.file)) {
      templates.set(headingCase.file, await parseTemplate(headingCase.file))
    }

    const matches = []
    walk(templates.get(headingCase.file), (node) => {
      if (node.type !== 1 || node.tag !== headingCase.tag) return
      const normalizedText = textContent(node).replace(/\s+/g, ' ').trim()
      if (normalizedText.includes(headingCase.text)) matches.push(node)
    })

    assert.equal(
      matches.length,
      headingCase.count,
      `${headingCase.file} must contain ${headingCase.count} matching ${headingCase.tag} element(s) for "${headingCase.text}"`
    )

    for (const match of matches) {
      const classes = classList(match)
      assert.ok(
        classes.includes('dark:text-[var(--gva-text-strong)]') ||
          classes.includes('dark:!text-[var(--gva-text-strong)]'),
        `${headingCase.file} title "${headingCase.text}" is missing the explicit dark-mode strong-text class`
      )
    }

    for (const lightClass of headingCase.lightClasses) {
      assert.ok(
        matches.some((match) => classList(match).includes(lightClass)),
        `${headingCase.file} title "${headingCase.text}" must preserve light class ${lightClass}`
      )
    }

    for (const [accentText, accentClass] of headingCase.accents) {
      const accents = []
      for (const match of matches) {
        walk(match, (node) => {
          if (node.type !== 1 || node.tag !== 'span') return
          const normalizedText = textContent(node).replace(/\s+/g, ' ').trim()
          if (normalizedText.includes(accentText)) accents.push(node)
        })
      }
      assert.ok(
        accents.some((accent) => classList(accent).includes(accentClass)),
        `${headingCase.file} accent "${accentText}" must preserve class ${accentClass}`
      )
    }
  }
})
