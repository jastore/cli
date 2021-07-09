import {Command, flags} from '@oclif/command'
import { agent, api } from '../api';
import cli from 'cli-ux';
import * as chalk from 'chalk';
import { printCurrentNamespace } from '../helpers/namespaces/printCurrentNamespace';
import config from '../config';
import { ensureNamespace } from '../helpers/namespaces/ensureNamespace';



export default class Pages extends Command {
  static description = 'List available auto-generated pages for a namespace';
  static aliases = ['page'];

  static flags = {
    help: flags.help({char: 'h'}),
    namespace: flags.string({char: 'n', description: `namespace code, (default to current namespace)`}),
  }

  async run() {
    const {args, flags} = this.parse(Pages);
    const namespace = flags.namespace || api.getCurrentNamespace();

    await ensureNamespace(namespace);

    await printCurrentNamespace();
    this.log(`Available pages:`);
    this.log(`- https://${namespace}.${config.namespacesDomain}/pages/login`);
    this.log(`- https://${namespace}.${config.namespacesDomain}/pages/signup`);
    this.log(`- https://${namespace}.${config.namespacesDomain}/pages/welcome`);
  }
}
