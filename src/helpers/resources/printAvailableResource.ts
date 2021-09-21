import chalk = require("chalk");
import { api } from "../../api";
import { hint } from "../hint";


export async function printAvailableResources (namespace?: string | undefined) {
  const namespaceCode = namespace || api.getCurrentNamespace();
  const list = await api.listNamespaceResources(namespaceCode);

  if (!list || list.length === 0) {
    console.error(`No resource in this namespace.`);
    hint(`Use the "resource:create" command to create a resource.`)
    hint(`Example to create a resource named "book":`);
    hint(`    ${chalk.green(`jastore resource:create --schema ./book.schema.json book`)}`);
  } else {
    console.log(chalk.green('Available resources:'));
    for (const resource of list) {
      console.log(`- ${resource.name}`);
    }
  }

}