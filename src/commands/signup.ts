import {Command, flags} from '@oclif/command';
import { agent, api } from '../api';
import cli from 'cli-ux';

export default class Signup extends Command {
  static description = 'Sign up to jastore to create permanent stores and link the resources you create to your user'

  static flags = {
    help: flags.help({char: 'h'}),
  }

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
