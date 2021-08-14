import {Command, flags} from '@oclif/command'
import { api } from '../../api';
import { ensureNamespace } from '../../helpers/namespaces/ensureNamespace';

export default class UserCreate extends Command {
  static aliases = ['users:create'];


  static flags = {
    help: flags.help({char: 'h'}),
    namespace: flags.string({char: 'n', description: `namespace code, (default to current namespace)`}),
    password: flags.string({char: 'p', description: `password`, required : true}),
  }

  static description = 'Create a new user in a namespace';

  static args = [{name: 'email', required : true }];

  static examples = [
    `npx jastore user:create user@email.com --password userpassword`,
  ];

  async run() {
    const {args, flags} = this.parse(UserCreate);
    const namespace = flags.namespace || api.getCurrentNamespace();
    await ensureNamespace(namespace);

    await api.createUser(namespace, args.email, flags.password);

    this.log('user created');
  }
}
