import {Command, flags} from '@oclif/command';
import { agent, api } from '../api';
import cli from 'cli-ux';
import * as fs from 'fs-extra';


export default class Status extends Command {
  static description = 'describe the command here'

  static flags = {
    // help: flags.help({char: 'h'}),
    // // flag with a value (-n, --name=VALUE)
    // name: flags.string({char: 'n', description: 'name to print'}),
    // // flag with no value (-f, --force)
    // force: flags.boolean({char: 'f'}),
  }

  static args = [{name: 'file'}]

  async run() {
    const {args, flags} = this.parse(Status)

    const currentNamespace = api.getCurrentNamespace();
    
  }
}
