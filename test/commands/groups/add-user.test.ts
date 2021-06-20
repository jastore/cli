import {expect, test} from '@oclif/test'

describe('groups:add-user', () => {
  test
  .stdout()
  .command(['groups:add-user'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['groups:add-user', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
