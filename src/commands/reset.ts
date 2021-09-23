import {Command, flags} from '@oclif/command';
import cli from 'cli-ux';
import { store, reset as storeReset } from '../storage';
import { reset as apiReset } from '../api';


export default class Reset extends Command {
  static description = 'Reset all local data'

  static flags = {
    help: flags.help({char: 'h'}),
  }

  async run() {
    const {args, flags} = this.parse(Reset)

    await cli.confirm(`This will reset all local data and delete all temporary namespaces keys... continue ? (y/n)`);

    await storeReset(this.config);
    await apiReset(this.config);

    this.log(`All configs have been reset`)
  }
}
