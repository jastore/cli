import {Command, flags} from '@oclif/command'
import { agent, api } from '../api';
import cli from 'cli-ux';
import * as chalk from 'chalk';

export default class User extends Command {
  static description = 'Manage namespace users'

  async run() {
  }
}
