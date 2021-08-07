import {Command, flags} from '@oclif/command';
import { agent, api } from '../../api';
import cli from 'cli-ux';
import config from '../../config';
import * as _ from 'lodash';
import { printNamespaceDetails } from '../../helpers/namespaces/printNamespaceDetails';
import chalk = require('chalk');


export default class NamespaceSet extends Command {
  static description = `Set options of a namespace`

  static flags = {
    namespace: flags.string({char: 'n', description: `namespace code, (default to current namespace)`}),
    name: flags.string({char: 't', description: `set namespace name (alias)`}),
    option: flags.string({ char: 'o', multiple: true, description: `set an option for this namespace` }),
    help: flags.help({char: 'h'}),
  } 

  static examples = [
    `$ jastore namespace:set -o key:value`,
    `$ jastore namespace:set -n newname`,
    `$ jastore namespace:set -n newname -o key1:value1 -o key2:value2`,
  ]

  async run() {
    const {args, flags} = this.parse(NamespaceSet);
    const namespaceCode = flags.namespace || api.getCurrentNamespace();
    const options = flags.option;

    const namespace = await api.fetchNamespace(namespaceCode);

    this.log(`Namespace: `, namespace.code);

    if (options?.length > 0) {
      if (!namespace.options) { namespace.options = {}; }
      options.forEach((opt: string) => {
        const [key, ...values] = opt.split(`:`);
        _.set(namespace.options, key, values.join(':'));
      })
    }

    namespace.name = flags.name || namespace.name || '';

    await api.updateNamespace(namespaceCode, namespace);

    this.log('updating namespace...');
    const updatedNamespace = await api.fetchNamespace(namespaceCode);

    this.log(chalk.green(`Namespace updated.`))
    this.log(`---`);
    printNamespaceDetails(updatedNamespace);

  }
}
