import {expect, test} from '@oclif/test'

describe('namespace:current', () => {
  test
  .stdout()
  .command(['namespace:current'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['namespace:current', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
