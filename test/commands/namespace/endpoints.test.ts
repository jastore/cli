import {expect, test} from '@oclif/test'

describe('namespace:endpoints', () => {
  test
  .stdout()
  .command(['namespace:endpoints'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['namespace:endpoints', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
