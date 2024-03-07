import test from 'tape'
import { get } from 'tiny-json-http'
import { start, end } from '@architect/sandbox'

const host = 'http://localhost:3333'
const endpoints = [
  '/',
  '/enhance-styles.css',
  '/_styleguide/cribsheet',
  '/_public/favicon.svg',
]

process.chdir('./myproject')
console.log(process.cwd())

test('startup sandbox', async (t) => {
    t.pass(await start({ quiet: true, cwd: process.cwd() }))
})

test('check key paths', async (t) => {
  for (const endpoint of endpoints) {
    const docs = await get({ url: `${host}${endpoint}` })
    t.ok(docs.body, `${endpoint} is reachable`)
  }
  t.end()
})

test('shutdown sandbox', async (t) => {
    t.pass(await end())
})

process.chdir('..');
