import { IConfig } from "@oclif/config";
import { LocalStorage } from "node-localstorage";
import * as path from 'path';
import * as _ from 'lodash';
import * as fs from 'fs-extra';


let localStorage: LocalStorage; 

export const storage = () => localStorage;

export const init = (config: IConfig) => {
  localStorage = new LocalStorage(path.join(config.dataDir, `jastore.data.json`));
}

export const reset = async (config: IConfig) => {
  await fs.remove(path.join(config.dataDir, `jastore.data.json`));
}

export const store = new Proxy({} as any, {
  deleteProperty: function(target, prop) {
    localStorage.removeItem(prop as string);

    console.log(localStorage.getItem(prop as string))

    return true;
  },
  get: function(target, prop, receiver) {
    // console.log('accessing', prop);
    const itemName = _.camelCase(prop as string);
    const item = localStorage?.getItem(itemName) || '';

    // console.log('item', item);
    if (!item) { return null }

    return JSON.parse(item);
  },
  set: function(obj, prop, value) {
    if (!localStorage) return false;
    const itemName = _.camelCase(prop as string);
    const item = JSON.stringify(value || '');

    localStorage.setItem(itemName, item);

    return true;
  }
})