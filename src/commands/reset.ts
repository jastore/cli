import {Command, flags} from '@oclif/command';
import cli from 'cli-ux';
import { store, reset as storeReset } from '../storage';
import { reset as apiReset } from '../api';


export default class Reset extends Command {
  static description = 'Reset all local data'

  static flags = {
    // help: flags.help({char: 'h'}),
    // // flag with a value (-n, --name=VALUE)
    // name: flags.string({char: 'n', description: 'name to print'}),
    // // flag with no value (-f, --force)
    // force: flags.boolean({char: 'f'}),
  }

  static args = [{name: 'file'}]

  async run() {
    const {args, flags} = this.parse(Reset)

    await cli.confirm(`This will reset all local data and delete all temporary namespaces keys... continue ? (y/n)`);

    await storeReset(this.config);
    await apiReset(this.config);

    this.log(`All configs have been reset`)
  }
}
