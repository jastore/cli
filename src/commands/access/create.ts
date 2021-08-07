import {Command, flags} from '@oclif/command';
import { agent, api } from '../../api';
import cli from 'cli-ux';
import chalk = require('chalk');
import { printAccessControls } from '../../helpers/access/printAccessControls';

export default class AccessCreate extends Command {
  static description = 
    `Give a group of user access to a resource.
    Before you using this command, you must have configured some user groups for this namespace.
To list available user groups and create new ones, try this command:
    ${chalk.green(`jastore groups:list`)}
    `

  static flags = {
    namespace: flags.string({char: 'n', description: `namespace code, (default to current namespace)`}),
    resource: flags.string({char: 'r', description: `resource name`, required: true }),
    group: flags.string({char: 'g', description: `user group name`, required: true }),
    allow: flags.string({char: 'a', description: `rights to give to this user group for that resource. Allowed values: a mix of the letters C (create), R (read), U (updated), D (delete)`, required: true }),
  }

  static examples = [
    `# Allow everybody to read access on the "books" resource:
${chalk.green(`jastore access:create -r books -g public -a C`)}
`,
    `# Allow everybody the group named "admin" all access (Create, Read, Update, Delete) to the resource named "books"
${chalk.green(`jastore access:create -g admin -r books -a CRUD`)}
`,
  ]

  async run() {
    const {args, flags} = this.parse(AccessCreate)
    const namespaceCode = flags.namespace || api.getCurrentNamespace();

    console.log('namespace code', namespaceCode);

    try {
      const namespace = await api.fetchNamespace(namespaceCode);
    } catch (e) {
      if ([404, 401].includes(e?.response?.status)) {
        return this.error(`This namespace does not exist or you dont have access to it.`);
      }
      return this.error(e);
    }

    try {
      const resource = await api.fetchResource(namespaceCode, flags.resource);
    } catch (e) {
      if ([404, 401].includes(e?.response?.status)) {
        return this.error(`This resource does not exist or you dont have access to it.`);
      }
      return this.error(e);
    }

    try {
      const groups = await api.listNamespaceGroups(namespaceCode);
      const group = groups.find((g: any) => g.name === flags.group);
      if (!group) {
        return this.error(`This group does not exist. To see existing groups, try this command: ${chalk.green(`jastore groups:list`)}`)
      }
    } catch (e) {
      return this.error(e);
    }

    try {
      await api.createAccessControl(namespaceCode, flags.resource, {
        group: flags.group,
        rights: flags.allow,
      });
    } catch (e) {
      if (e?.response?.status === 409) {
        this.error(`An access control rule already exist for that resource and group name. 
To list existing access control rules, try the following command: 
    ${chalk.green(`jastore access:list`)}`)
      } else throw e;
    }

    this.log(chalk.green('Access control created'));
    this.log(`---`)

    const accessControls = await api.listAccessControls(namespaceCode);

    printAccessControls(accessControls);


  }
}
