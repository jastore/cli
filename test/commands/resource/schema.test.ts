import {expect, test} from '@oclif/test'

describe('resource:schema', () => {
  test
  .stdout()
  .command(['resource:schema'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['resource:schema', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
