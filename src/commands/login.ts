import {Command, flags} from '@oclif/command';
import { agent, api } from '../api';
import cli from 'cli-ux'

export default class Login extends Command {
  static description = 'Log in to manage the namespaces and resources associated to your user.'

  static flags = {
    help: flags.help({char: 'h'}),
    user: flags.string({char: 'u', description: `Username (email)`}),
    email: flags.string({char: 'e', description: `alias for --user`}),
    password: flags.string({char: 'p', description: `Password (if empty, we will prompt you for it)`}),
  }

  async run() {
    const {args, flags} = this.parse(Login);

    const email = flags.user || flags.email || (await cli.prompt('Email'));
    const password = flags.password || (await cli.prompt('Password', {type: 'hide'}));

    const response = await api.login(email, password);

    if (response.status === 200) { this.log('connected'); }
    else {
      this.error(`unable to connect`);
    }
  }
}
