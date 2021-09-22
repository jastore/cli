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
  static description = `Modify a resource's schema`;
  static aliases = ['resources:set', 'rs:set'];


  static flags = {
    help: flags.help({char: 'h'}),
    namespace: flags.string({char: 'n', description: `namespace code, (default to current namespace)`}),
    schema: flags.string({char: 's', description: `json chema or path of the json schema file to use as the json schema for that resource`}),
  }

  static args = [{name: 'resource', required : true }]

  static examples = [
    `# Update a resource's schema (with an inline schema):
${chalk.green(`npx jastore resource:set [resource_name] --schema '{ "properties": { "title" : { "type" : "string" } }}'`)}
`,
    `# Update a resource's schema (from a json file):
${chalk.green(`npx jastore resource:set [resource_name] --schema ./schemas/my.schema.json`)}
`,
    `# Update a resource in another namespace
${chalk.green(`npx jastore resource:set [resource_name] --namespace [namespace_code] --schema ./schemas/my.schema.json`)}
`,
    `# Short command:
${chalk.green(`npx jastore rs:set [resource_name] -n [namespace_code] -s ./schemas/my.schema.json`)}
`,
  ]


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
      if (!schema || typeof schema !== 'object') {
        schema = await fs.readJSON(schemaPath);
      }
      resource.schema = schema;
    }

    await api.updateResource(namespace, resourceName, resource);

    this.log(chalk.green(`Resource modified`));

  }
}
