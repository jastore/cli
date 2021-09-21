import {Command, flags} from '@oclif/command'
import chalk = require('chalk');
import { api } from '../../api';
import { printAvailableNamespaces } from '../../helpers/namespaces/printAvalableNamespaces';

export default class NamespaceClean extends Command {
  static description = 'Clean available namespace list';
  static aliases = ['namespaces:clean', 'clean']


  static flags = {
    help: flags.help({char: 'h'}),
    force: flags.boolean({char: 'f', description: `Remove all unused namespaces, even the current one`})
  }

  static args = []

  async run() {
    const {args, flags} = this.parse(NamespaceClean);
    const force = flags.force;

    await api.cleanNamespaceList(force);
    this.log(chalk.green(`Namespace list cleaned.`));
    this.log(chalk.green('Available Namespaces: '))
    await printAvailableNamespaces();
  }
}
