import {expect, test} from '@oclif/test'

describe('namespace:clean', () => {
  test
  .stdout()
  .command(['namespace:clean'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['namespace:clean', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
