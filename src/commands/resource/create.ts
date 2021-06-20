import {Command, flags} from '@oclif/command';
import { agent, api } from '../../api';
import cli from 'cli-ux';
import * as fs from 'fs-extra';
import chalk = require('chalk');

export default class ResourceCreate extends Command {
  static description = 'create a resource in a namespace';

  static flags = {
    // help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    // name: flags.string({char: 'n', description: 'name of the resource'}),
    // flag with no value (-f, --force)
    namespace: flags.string({char: 'n', description: `namespace code, (default to current namespace)`}),
    schema: flags.string({ char : 's', description: 'path to json schema file' })
  }

  static args = [{name: 'resourceName'}]

  async run() {
    const {args, flags} = this.parse(ResourceCreate);
    const namespace = flags.namespace || api.getCurrentNamespace();

    let schema = null as any;
    if (flags.schema) {
      schema = await fs.readJSON(flags.schema);
    }

    let resourceName = args.resourceName;
    if (!resourceName) {

      if (schema && flags.schema?.match(/^[a-zA-Z0-9_\-]+\.schema\.json$/)) {
        resourceName = flags.schema.split(`.schema.json`).unshift();
      } else {

        this.log(`You must provide a name for this resource.`);
        this.log(`example: `);
        this.log(`    ${chalk.green(`jastore resource:create --schema ./schema.json <resurce-name>`)}`);
  
        return this.exit(1);
      }
    }

    if (!schema) {
      const useEmpty = await cli.confirm(`No schema provided, create a resource with an empty json schema ? (you can still add it after) (y/n)`)
      if (!useEmpty) { return this.exit() }
      schema = {};
    }

    if (!namespace) {
      return this.error(`No namespace selected. Please select a namespace using the namespace:current command. Example: 
      ${chalk.green(`jastore namespace:current <namespace-code>`)}`);
    }

    this.log(`We are about to create the following resource:`);
    this.log(`Name: ${resourceName}`);
    this.log(`Namespace: `, namespace || chalk.yellow(`Not provided`));
    this.log(`JSON Schema: `, schema);
    
    await cli.anykey(`Press any key to continue...`);

    this.log('Creating resource...');
    try {
      await api.createResource(namespace, {
        name: resourceName,
        schema: schema,
        options: {},
      });

      this.log(`Resource created.`)
    } catch (e) {
      if (e.response?.data) {
        this.error(e.response.data);
      } else {
        this.error(e);
      }
    }


  }
}
