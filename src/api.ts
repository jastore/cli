import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import config from './config';
const axiosCookieJarSupport = require('axios-cookiejar-support').default;
const tough = require('tough-cookie');
import * as path from 'path';
var FileCookieStore = require("tough-cookie-filestore");
import * as fs from 'fs-extra';
import { IConfig } from '@oclif/config';
import { store } from './storage';

axiosCookieJarSupport(Axios);

let apiInstance: AxiosInstance;

export const init = async (cliConfig: IConfig) => {
  // console.log('ensure dir', cliConfig.dataDir);
  await fs.ensureDir(cliConfig.dataDir);
  // console.log('success');
  const filePath = path.join(cliConfig.dataDir, 'cookies.json');
  await fs.ensureFile(filePath);
  const cookieJar = new tough.CookieJar(new FileCookieStore(filePath));

  apiInstance = Axios.create({
    baseURL: `https://${config.apiDomain}`,
    jar: cookieJar,
    withCredentials: true,
  } as AxiosRequestConfig);
}

export const reset = async (cliConfig: IConfig) => {
  const filePath = path.join(cliConfig.dataDir, 'cookies.json');
  await fs.remove(filePath);
  await init(cliConfig);
}


export const agent = () => apiInstance;

export const api = {
  getCurrentNamespace () {
    return store.apiCurrentNamespace;
  },
  setCurrentNamespace (namespaceCode: string) {
    store.apiCurrentNamespace = namespaceCode;
    console.log(`${store.apiCurrentNamespace} set as the current namespace`);
  },

  async isLoggedIn (): Promise<boolean> { 
    return agent().get(`/auth/profile`).then(() => true).catch(() => false)
  },

  async getProfile (): Promise<any> {
    const { data : profile } = await agent().get(`/auth/profile`);

    return profile;
  },
  
  async createNamespace (): Promise<string> {
    const response  = await agent().post('/namespaces', {});
    const { key, namespace } = response.data;
    store.tmpNamespacesKeys = { ...store.tmpNamespacesKeys, [namespace] : key };

    return namespace;
  },

  async createResource (namespace?: string, resource?: Record<string, any>, createNamespace?: boolean): Promise<any> {
    let namespaceCode = namespace || this.getCurrentNamespace();
    const key = store.tmpNamespacesKeys?.[namespaceCode];

    if (!namespaceCode) {
      if (!createNamespace) {
        throw `No namespace selected. Please select a namespace with the "jastore namespace:current <namespace-code>" command.`;
      } else {
        namespaceCode = await this.createNamespace();
      }
    }

    const headers = key ? { authorization : key } : {};
    const { data } = await agent().post(`/namespaces/${namespaceCode}/resources`, resource || {}, { headers });

    return data;
  }
  
}