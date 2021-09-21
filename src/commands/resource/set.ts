import {Command, flags} from '@oclif/command';
import { agent, api } from '../../api';
import cli from 'cli-ux';
import * as fs from 'fs-extra';
import * as path from 'path';
import { guessSchemaNameFromFilePath } from '../../utils/schemaUtils';
import chalk = require('chalk');
import * as _ from 'lodash';
import { printCurrentNamespace } from '../../helpers/namespaces/printCurrentNamespace';

export default class ResourceSet extends Command {
  static description = 'modify a resource'

  static flags = {
    help: flags.help({char: 'h'}),
    namespace: flags.string({char: 'n', description: `namespace code, (default to current namespace)`}),
    schema: flags.string({char: 's', description: `json chema or path of the json schema file to use as the json schema for that resource`}),
  }

  static args = [{name: 'resource', required : true }]


  async run() {
    const {args, flags} = this.parse(ResourceSet)
    const namespace = flags.namespace || api.getCurrentNamespace();
    const resourceName = args.resource;
    const schemaPath = flags.schema;
    let schema = null;

    

    await printCurrentNamespace(namespace);

    if (!namespace) {
      this.exit();
    }

    const resource = await api.fetchResource(namespace, resourceName);

    if (!resource) {
      return this.error(chalk.yellow(`Resource does not exist`));
    }

    if (schemaPath) {
      try {
        schema = JSON.parse(schemaPath);
      } catch (e) {

      }
      if (!schema) {
        schema = await fs.readJSON(schemaPath);
      }
      resource.schema = schema;
    }

    await api.updateResource(namespace, resourceName, resource);

    this.log(chalk.green(`Resource modified`));

  }
}
