import {expect, test} from '@oclif/test'

describe('namespaces:list', () => {
  test
  .stdout()
  .command(['namespaces:list'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['namespaces:list', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
