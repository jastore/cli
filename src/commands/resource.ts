import {Command, flags} from '@oclif/command'
import { printCurrentNamespace } from '../helpers/namespaces/printCurrentNamespace';
import { printAvailableResources } from '../helpers/resources/printAvailableResource';

export default class Resource extends Command {
  static description = 'Manage resources';
  static aliases = ['resources'];


  async run() {
    printCurrentNamespace();
    printAvailableResources();
  }
}
