import {Command, flags} from '@oclif/command'
import chalk = require('chalk');
import { ensureNamespace } from '../helpers/namespaces/ensureNamespace';
import { printCurrentNamespace } from '../helpers/namespaces/printCurrentNamespace'

export default class Namespace extends Command {
  static description = 'Manage namespaces'
  static aliases = ['namespaces']


  async run() {
    printCurrentNamespace();
    await ensureNamespace();
    this.log(`To see more details about this namespace, try this command:`, chalk.green(`jastore namespace:get`));
    this.log(`To list available namespaces, try this command:`, chalk.green(`jastore namespaces:list`));
  }
}
