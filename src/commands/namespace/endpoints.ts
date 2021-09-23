import {Command, flags} from '@oclif/command';
import { agent, api } from '../../api';
import cli from 'cli-ux';
import config from '../../config';


export default class NamespaceEndpoints extends Command {
  static description = 'List endpoints for a namespace';
  static aliases = ['namespaces:endpoints', 'endpoints'];

  static flags = {
    namespace: flags.string({char: 'n', description: `namespace code, (default to current namespace)`}),
  }

  async run() {
    const {args, flags} = this.parse(NamespaceEndpoints);
    const namespace = flags.namespace || api.getCurrentNamespace();

    // const builtIns = [
    //   [`POST`, `/auth/login`],
    //   [`POST`, `/auth/logout`],
    //   [`POST`, `/auth/signup`],
    //   [`GET`, `/auth/profile`],
    // ];
    const resources = await api.listNamespaceResources(namespace);

    this.log(`## Namespace: ${namespace}`);
    this.log(``)
    if (!resources || resources.length === 0) {
      this.log(`No resources in this namespace. Create one by using the "resource:create" command`);
    }
    for (const resource of resources) {
      this.log(`## Resource: ${resource.name}`);
      this.log(`GET    https://${namespace}.${config.namespacesDomain}/${resource.name}`);
      this.log(`POST   https://${namespace}.${config.namespacesDomain}/${resource.name}`);
      this.log(`GET    https://${namespace}.${config.namespacesDomain}/${resource.name}/:uuid`);
      this.log(`DELETE https://${namespace}.${config.namespacesDomain}/${resource.name}/:uuid`);
      this.log(`PUT    https://${namespace}.${config.namespacesDomain}/${resource.name}/:uuid`);
      this.log(` `);
    }
  }
}
