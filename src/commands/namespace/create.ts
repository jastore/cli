import {Command, flags} from '@oclif/command'
import { agent, api } from '../../api';
import { getDb } from '../../knex';


export default class NamespaceCreate extends Command {
  static description = 'Create a new namespace'
  static aliases = ['namespaces:create']


  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    // name: flags.string({char: 'n', description: 'name to print'}),
    // flag with no value (-f, --force)
    // force: flags.boolean({char: 'f'}),
  }

  static args = [{name: 'alias'}]

  async run() {
    const {args, flags} = this.parse(NamespaceCreate)
    const isLoggedIn = await api.isLoggedIn();

    try {
      const namespaceCode = await api.createNamespace(args.name);
      this.log('Namespace created !');
      this.log('Namespace code:', namespaceCode);
      if (!isLoggedIn) {
        this.log(`You are not logged in, so this temporary namespace's access key as been saved locally.`)
        this.log(`Log in to claim this namespace and associate it to your account.`)
      }
      api.setCurrentNamespace(namespaceCode);
    } catch (e: any) {
      this.error(e);
    }
  }
}
