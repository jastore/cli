import {Command, flags} from '@oclif/command'
import { api } from '../../api';
import { ensureNamespace } from '../../helpers/namespaces/ensureNamespace';
import { printCurrentNamespace } from '../../helpers/namespaces/printCurrentNamespace';

export default class UserList extends Command {
  static aliases = ['users:list'];

  static flags = {
    help: flags.help({char: 'h'}),
    namespace: flags.string({char: 'n', description: `namespace code, (default to current namespace)`}),
    limit: flags.integer({char: 'l', description: `max number of resuts to return`}),
    offset: flags.integer({char: 'n', description: `results offset`}),
    sort: flags.string({char: 'n', description: `column to sort the results by`}),
  }

  static description = 'list users in a namespace';

  static examples = [
    `npx jastore user:list`,
    `npx jastore user:list --limit 10 --offset 20`,
    `npx jastore user:list --limit 10 --offset 20 --sort email,desc`,
  ];

  async run() {
    const {args, flags} = this.parse(UserList);
    const namespace = flags.namespace || api.getCurrentNamespace();
    const { limit, offset, sort} = flags;
    await ensureNamespace(namespace);

    const users = await api.fetchUsers(namespace, { limit, offset, sort });
    const { count } = await api.countUsers(namespace);

    await printCurrentNamespace(namespace);
    this.log(`${users.length}/${count} users retrieved:`)

    users.forEach((user: any, i: number) => {
      this.log(`- ${user.email}`);
    })

  }
}
