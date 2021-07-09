import {Command, flags} from '@oclif/command';
import { agent, api } from '../../api';
import cli from 'cli-ux';
import * as fs from 'fs-extra';
import * as path from 'path';
import { guessSchemaNameFromFilePath } from '../../utils/schemaUtils';
import chalk = require('chalk');
import { printCurrentNamespace } from '../../helpers/namespaces/printCurrentNamespace';

export default class ResourceSync extends Command {
  static description = 'Sync a folder containing resources and schemas';
  static aliases = ['resources:sync', 'sync'];


  static flags = {
    namespace: flags.string({char: 'n', description: `namespace code, (default to current namespace)`}),
    'dry-run' : flags.boolean({ description : `output the operation that are going to be performed, without actualy performing them` }),
  }

  static args = [{name: 'folder'}]

  async run() {
    const {args, flags} = this.parse(ResourceSync);
    const namespace = flags.namespace || api.getCurrentNamespace();
    const dryRun = flags['dry-run'];

    if (!args.folder) {
      this.log(`You must provide a folder containing the schemas you want to sync`);
      this.log(`For example:`);
      this.log(`    ${chalk.green(`jastore resource:sync ./schemas`)}`);
      this.log(`The folder must contain files named like this: ${chalk.blue(`<resource-name>.schema.json`)}`);
      return;
    }

    await printCurrentNamespace(namespace);

    if (!namespace) {
      this.exit();
    }


    if (dryRun) {
      this.log(chalk.green(`Performing a dry run`));
    }

    const folderStats = await fs.lstat(args.folder);
    let files: string[] = [];

    if (folderStats.isDirectory()) {
      files = await fs.readdir(args.folder);
    } else {
      files = [''];
    }


    for (const file of files) {
      const filePath = path.join(args.folder, file);
      const name = await guessSchemaNameFromFilePath(filePath);
      if (name) {
        this.log(`Syncing ${name}...`);
        const schema = await fs.readJSON(filePath);
        let resource = null;

        try {
          resource = await api.fetchResource(namespace, name);
        } catch (e) {
          if (e.response?.status === 404) {
            this.log(`Resource does not exists and will be created`);
          } else {
            this.log(`Error: can't sync ${name}. Skipping`);
            continue;
          }
        }

        if (!resource) {
          if (dryRun) {
            this.log(`[dry run] resource would be created`)
          } else {
            await api.createResource(namespace, {
              name,
              schema,
            });
          }
        } else {
          if (dryRun) {
            this.log(`[dry run] resource would be updated`);
          } else {
            await api.updateResource(namespace, name, {
              schema,
            })
          }
        }

        this.log(`Done syncing ${name}`);

      } else {
        this.log(`Ignoring file: ${file}`);
      }
    }
  }
}
