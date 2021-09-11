import chalk = require("chalk");


export function printAccessControls (accessControls: any[]) {

  const labels: Record<string, string> = {
    C: 'create',
    R: 'read',
    U: 'update',
    D: 'delete',
  }

  if (!accessControls || accessControls.length === 0) {
    console.log(`No access control in that namespace`);
    console.log(`For more information on how to create access controls, try this command:`)
    console.log(chalk.green(`    jastore access:create --help`))
  } else {
    console.log('Access controls:')
    accessControls.forEach((ac: any) => {
      const group = chalk.green(ac.group);
      const rights = chalk.green(ac.rights.split('').map((x: string) => labels[x]).join(','))
      const resource = chalk.green(ac.resource);
      const restrictions = ac.restrictions && ac.restrictions.length > 0 ? `    --> restrictions: ${ac.restrictions.join(', ')}` : null;
      console.log(`- Group ${group} can ${rights} on resource ${resource} [access-control uuid: ${ac.uuid}]`)
      if (restrictions) {
        console.log(restrictions);
      }
    })
  }
}