import {Command, flags} from '@oclif/command';
import { agent, api } from '../api';
import cli from 'cli-ux';
import chalk = require('chalk');

export default class Groups extends Command {
  static description = 'Manage user groups';
  static aliases = ['group'];

  async run() {
    this.log(`Manage user groups. For a list of all available commands, try this command:  ${chalk.green(`jastore help groups`)}`);
    this.log(`To list available user groups in this namespace, try this command:  ${chalk.green(`jastore groups:list`)}`);
  }
}
