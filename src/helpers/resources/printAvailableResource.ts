import chalk = require("chalk");
import { api } from "../../api";


export async function printAvailableResources (namespace?: string | undefined) {
  const namespaceCode = namespace || api.getCurrentNamespace();
  const list = await api.listNamespaceResources(namespaceCode);

  if (!list || list.length === 0) {
    console.log(`No resource in this namespace. Use the "resource:create" command to create one.`);
    console.log(`Example to create a resource named "book":`);
    console.log(`    ${chalk.green(`jastore resource:create --schema ./book.schema.json book`)}`);
  } else {
    console.log(`Available resources:`);
    for (const resource of list) {
      console.log(`- ${resource.name}`);
    }
  }

}