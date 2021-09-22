import chalk = require("chalk");
import { api } from "../../api";
import { hint } from "../logs/hint";
import { info } from "../logs/info";


export async function printResourceDetails (resourceCode: string, namespace?: string) {
  const namespaceCode = namespace || api.getCurrentNamespace();
  const resource = await api.fetchResource(namespaceCode, resourceCode);

  info(`${chalk.green(`Resource:`)} ${resource.name}`);
  info(chalk.green(`Schema properties:`));
  if (resource.schema?.properties) {
    for (const propName of (Object.keys(resource.schema.properties))) {
      const props = resource.schema.properties[propName];
      info(`- ${propName} (${props.type})`)
    }
  } else {
    info(`(empty)`);
  }

}