import {Command, flags} from '@oclif/command';
import { agent, api } from '../api';
import cli from 'cli-ux';
import * as fs from 'fs-extra';


export default class Status extends Command {
  static description = 'Print the current status of jastore'

  static flags = {
    help: flags.help({char: 'h'}),
  }

  async run() {
    const {args, flags} = this.parse(Status)

    const currentNamespace = api.getCurrentNamespace();
    
  }
}
