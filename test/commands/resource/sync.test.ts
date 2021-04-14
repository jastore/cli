import {expect, test} from '@oclif/test'

describe('resource:sync', () => {
  test
  .stdout()
  .command(['resource:sync'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['resource:sync', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
