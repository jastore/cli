import chalk = require("chalk");
import { info } from "../logs/info";


export function printAccessControls (accessControls: any[]) {

  const labels: Record<string, string> = {
    C: 'create',
    R: 'read',
    U: 'update',
    D: 'delete',
  }

  if (!accessControls || accessControls.length === 0) {
    info(`No access control in that namespace`);
    info(`For more information on how to create access controls, try this command:`)
    info(chalk.green(`    jastore access:create --help`))
  } else {
    info('Access controls:')
    accessControls.forEach((ac: any) => {
      const group = chalk.green(ac.group);
      const rights = chalk.green(ac.rights.split('').map((x: string) => labels[x]).join(','))
      const resource = chalk.green(ac.resource);
      const restrictions = ac.restrictions && ac.restrictions.length > 0 ? `    --> restrictions: ${ac.restrictions.join(', ')}` : null;
      info(`- Group ${group} can ${rights} on resource ${resource} [access-control uuid: ${ac.uuid}]`)
      if (restrictions) {
        info(restrictions);
      }
    })
  }
}