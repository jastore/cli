

import chalk = require("chalk");
import * as _ from 'lodash';
import { api } from "../../api";
import { info } from "../logs/info";


export function printNamespaceDetails (namespace: any) {
  info(chalk.green(`Type:`), namespace.type);

  const knownOptions: Record<string, string> = {
    pagesRedirect: 'Pages redirect',
    pageslogo: 'Pages logo',
    authValidateEmail: 'Email validation',
    allowOrigin: 'Allow origin (CORS)',
  }

  const options = namespace.options || {};

  info(chalk.green('Options: '))
  for (const opt in knownOptions) {
    const hasOption = Object.prototype.hasOwnProperty.call(options, opt);
    info(`  - ${knownOptions[opt]}: ${hasOption ? options[opt] : '[not set]'}`);
  }

  const remainingOptions = _.omit(options, Object.keys(knownOptions));

  for (const opt in remainingOptions) {
    info(`  - ${opt}: ${options[opt] || '[not set]'}`);
  }

}