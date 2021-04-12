import {Command, flags} from '@oclif/command'
import { agent, api } from '../api';


export default class Profile extends Command {
  static description = 'describe the command here'

  static flags = {
    // help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    // name: flags.string({char: 'n', description: 'name to print'}),
    // flag with no value (-f, --force)
    // force: flags.boolean({char: 'f'}),
  }

  static args = [{name: 'file'}]

  async run() {
    const {args, flags} = this.parse(Profile)

    try {
      const profile = await api.getProfile();
      this.log(profile)
    } catch (e) {
      // console.log(e.response.headers)
      if (e.response?.status === 401) {
        this.log(`Not connected`);
      } else {
        this.error('Error fetching profile');
      }
    }

  }
}
