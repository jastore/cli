import {Command, flags} from '@oclif/command';
import { agent, api } from '../api';
import cli from 'cli-ux';
import * as chalk from 'chalk';

export default class Access extends Command {
  static description = 'Manage access control';
  
  // static examples = [
  //   `jastore access`,
  // ];

  async run() {
    this.log(Access.description);
    this.log(`For more information about this command, type:`)
    this.log(chalk.green(`    ${this.config.name} access --help`))
  }
}
