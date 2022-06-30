const path = require('path')
const fs = require('fs-extra')
const { sortBy } = require('lodash')
const chalk = require('chalk')

const log = (text) => console.log(`>>> ${text}`)

const PLUGIN_PATH = path.join(__dirname, '../docs/project/plugins.md')
const DATA_PATH = path.join(__dirname, '../docs/.vitepress/ranking.js')
const REG = /<PluginInfo(?:[\s\S]+?)owner=["']([\s\S]+?)["'](?:[\s\S]+?)\/>/gim
const analyzeRanking = async () => {
  log(`Start refresh ranking data...`)

  const content = fs.readFileSync(PLUGIN_PATH, 'utf-8')
  const matched = content.matchAll(REG)
  const result = Array.from(matched)
    .map((item) => {
      return item?.[1]
    })
    .filter(Boolean)
  const rankingObj = result.reduce((memo, current) => {
    if (memo[current] == null) {
      memo[current] = 1
    } else {
      memo[current]++
    }
    return memo
  }, {})
  const ranking = sortBy(Object.entries(rankingObj), (o) => -o[1]).map((i) => ({
    name: i[0],
    count: i[1],
  }))
  fs.writeFileSync(
    DATA_PATH,
    `
// @ts-nocheck
/* eslint-disable */
export const PLUGINS = ${JSON.stringify(ranking, null, 2)}\n`.trimStart(),
    'utf-8'
  )

  log(chalk.green(`Refresh ranking data successful`))
}

analyzeRanking()
