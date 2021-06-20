import {Command, flags} from '@oclif/command'
import { printCurrentNamespace } from '../helpers/namespaces/printCurrentNamespace'

export default class Namespace extends Command {
  static description = 'Manage namespaces'
  static aliases = ['namespaces']


  async run() {
    printCurrentNamespace();
  }
}
