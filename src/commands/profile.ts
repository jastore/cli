import {Command, flags} from '@oclif/command'
import { agent, api } from '../api';


export default class Profile extends Command {
  static description = `Print your user profile`;
  static flags = {
  }

  async run() {
    const {args, flags} = this.parse(Profile)

    try {
      const profile = await api.getProfile();
      this.log(profile)
    } catch (e: any) {
      // info(e.response.headers)
      if (e.response?.status === 401) {
        this.log(`Not connected`);
      } else {
        this.error('Error fetching profile');
      }
    }

  }
}
