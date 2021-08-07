import {Command, flags} from '@oclif/command'
import chalk = require('chalk');
import { printCurrentNamespace } from '../helpers/namespaces/printCurrentNamespace';
import { printAvailableResources } from '../helpers/resources/printAvailableResource';

export default class Resource extends Command {
  static description = 'Manage resources';
  static aliases = ['resources'];


  async run() {
    await printCurrentNamespace();
    await printAvailableResources();
    this.log(`---`)
    this.log(`To check all endpoint for those resources, try this command:`, chalk.green(`jastore endpoints`))
  }
}
