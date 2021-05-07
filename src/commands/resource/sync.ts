import {Command, flags} from '@oclif/command';
import { agent, api } from '../../api';
import cli from 'cli-ux';
import * as fs from 'fs-extra';
import * as path from 'path';
import { guessSchemaNameFromFilePath } from '../../utils/schemaUtils';

export default class ResourceSync extends Command {
  static description = 'Sync a folder containing resources and schemas';
  static aliases = ['resources:sync', 'sync'];


  static flags = {
    namespace: flags.string({char: 'n', description: `namespace code, (default to current namespace)`}),
  }

  static args = [{name: 'folder'}]

  async run() {
    const {args, flags} = this.parse(ResourceSync);
    const namespace = flags.namespace || api.getCurrentNamespace();
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
          await api.createResource(namespace, {
            name,
            schema,
          });
        } else {
          await api.updateResource(namespace, name, {
            schema,
          })
        }

        this.log(`Done syncing ${name}`);

      } else {
        this.log(`Ignoring file: ${file}`);
      }
    }
  }
}
