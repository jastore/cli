import {Command, flags} from '@oclif/command';
import { agent, api } from '../../api';
import cli from 'cli-ux';
import * as fs from 'fs-extra';

export default class ResourceCreate extends Command {
  static description = 'describe the command here'

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
    console.log('args', args);
    const resourceName = args.resourceName;

    if (!resourceName) {
      this.error(`You must provide a name for this resource.`);
      this.error(`example: `);
      this.error(`    jastore resource:create --schema ./schema.json <name>`);
    }

    // const resourceName = await cli.prompt('Resource name');
    let schema = null as any;
    if (flags.schema) {
      schema = await fs.readJSON(flags.schema);
    }
    if (!schema) {
      const useEmpty = await cli.confirm(`No schema provided, create a resource with an empty json schema ? (you can still add it after) (y/n)`)
      if (!useEmpty) { return this.exit() }
      schema = {};
    }

    this.log(`We are about to create the following resource:`);
    this.log(`Name: ${resourceName}`);
    this.log(`Namespace: `, namespace);
    this.log(`JSON Schema: `, schema ? flags.schema : `(empty)`);
    
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
      if (e.response.data) {
        this.error(e.response.data);
      } else {
        this.error(e);
      }
    }


  }
}
