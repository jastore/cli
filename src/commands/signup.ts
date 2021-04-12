import {Command, flags} from '@oclif/command';
import { agent, api } from '../api';
import cli from 'cli-ux';

export default class Signup extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({char: 'n', description: 'name to print'}),
    // flag with no value (-f, --force)
    force: flags.boolean({char: 'f'}),
  }

  static args = [{name: 'file'}]

  async run() {
    const email = await cli.prompt('Email');
    const password = await cli.prompt('Password');

    const response = await agent().post(`/auth/signup`, { email, password });

    if (response.status === 200) { this.log('signed up'); }
    else {
      this.error(`unable to connect`);
    }
  }
}
