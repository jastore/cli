

import chalk = require("chalk");
import { api } from "../../api";


export function printNamespaceDetails (namespace: any) {
  console.log(`Namespace:`, namespace.code, namespace.name ? `(${namespace.name})` : ``);
  console.log(`Type:`, namespace.type);

  if (Object.keys(namespace.options || {}).length > 0) {
    console.log(`Options: `)
    Object.keys(namespace.options).forEach(prop => {
      console.log(`  - ${prop}: ${namespace.options[prop]}`);
    })
  } else {
    console.log(`Options: (no options)`);
  }
}