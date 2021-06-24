import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import config from './config';
const axiosCookieJarSupport = require('axios-cookiejar-support').default;
const tough = require('tough-cookie');
import * as path from 'path';
var FileCookieStore = require("tough-cookie-filestore");
import * as fs from 'fs-extra';
import { IConfig } from '@oclif/config';
import { store } from './storage';
import chalk = require('chalk');

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

  getCurrentNamespace (): string {
    return store.apiCurrentNamespace;
  },
  setCurrentNamespace (namespaceCode: string) {
    store.apiCurrentNamespace = namespaceCode;
    console.log(`${store.apiCurrentNamespace} set as the current namespace`);
  },
  async cleanNamespaceList (force = false) {
    const current = this.getCurrentNamespace();
    const tmpNamespacesKeys = store.tmpNamespacesKeys || {};
    const tmpNamespaces = Object.keys(tmpNamespacesKeys);

    for (const tmpNamespace of tmpNamespaces) {
      const exists = await this.checkNamespaceExists(tmpNamespace);
      const isCurrent = tmpNamespace === current;
      if (!exists && (!isCurrent || force)) {
        delete tmpNamespacesKeys[tmpNamespace];
        store.tmpNamespacesKeys = tmpNamespacesKeys;
      }
    }
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
  
  async listNamespaceResources (namespace: string): Promise<any[]> {
    const key = store.tmpNamespacesKeys?.[namespace];
    const headers = key ? { authorization : key } : {};

    const { data } = await agent().get(`/namespaces/${namespace}/resources`, { headers });

    return data;
  },
  
  async fetchNamespace (namespace: string): Promise<any> {
    const key = store.tmpNamespacesKeys?.[namespace];
    const headers = key ? { authorization : key } : {};

    const { data } = await agent().get(`/namespaces/${namespace}`, { headers });

    return data;
  },

  async checkNamespaceExists (namespace: string): Promise<boolean> {
    try {
      await this.fetchNamespace(namespace);
    } catch (e) {
      if ([404, 403].includes(e?.response?.status)) {
        return false;
      }

      throw e;
    }

    return true;
  },
  
  async updateNamespace (namespaceCode: string, namespace: any): Promise<any> {
    const key = store.tmpNamespacesKeys?.[namespaceCode];
    const headers = key ? { authorization : key } : {};

    return agent().put(`/namespaces/${namespaceCode}`, namespace, { headers });
  },

  async fetchResource (namespace: string, resource: string): Promise<any> { // TODO why no key, does that work ?
    const key = store.tmpNamespacesKeys?.[namespace];
    const headers = key ? { authorization : key } : {};

    const response = await agent().get(`/namespaces/${namespace}/resources/${resource}`, { headers });
    // console.log(response)

    return response.data;
  },

  async createResource (namespace?: string, resource?: Record<string, any>, createNamespace?: boolean): Promise<any> {
    let namespaceCode = namespace || this.getCurrentNamespace();
    const key = store.tmpNamespacesKeys?.[namespaceCode];

    if (!namespaceCode) {
      if (!createNamespace) {
        throw new Error(`No namespace selected`);
      } else {
        namespaceCode = await this.createNamespace();
      }
    }

    const headers = key ? { authorization : key } : {};
    const { data } = await agent().post(`/namespaces/${namespaceCode}/resources`, resource || {}, { headers });

    return data;
  },

  async updateResource (namespace: string, resourceName: string, resource: Record<string,any>) {
    let namespaceCode = namespace || this.getCurrentNamespace();
    const key = store.tmpNamespacesKeys?.[namespaceCode];

    const headers = key ? { authorization : key } : {};
    const { data } = await agent().put(`/namespaces/${namespaceCode}/resources/${resourceName}`, {
      ...resource,
      name: resourceName,
    }, { headers });

    return data;
  },



  async listNamespaceGroups (namespace: string) {
    const key = store.tmpNamespacesKeys?.[namespace];

    const headers = key ? { authorization : key } : {};
    const { data } = await agent().get(`/namespaces/${namespace}/groups`, { headers });

    return data;
  },

  async createGroup (namespace: string, name: string) {
    const key = store.tmpNamespacesKeys?.[namespace];

    const headers = key ? { authorization : key } : {};
    const { data } = await agent().post(
      `/namespaces/${namespace}/groups`, 
      { name },
      { headers }
    );

    return data;
  },

  async listGroupsForUser (namespace: string, user: string) {
    const key = store.tmpNamespacesKeys?.[namespace];

    const headers = key ? { authorization : key } : {};
    const { data } = await agent().get(
      `/namespaces/${namespace}/users-groups`, 
      { headers, params : { user } }
    );

    return data;
  },


  async addUserToGroup (namespace: string, group: string, user: string) {
    const key = store.tmpNamespacesKeys?.[namespace];

    const headers = key ? { authorization : key } : {};
    const { data } = await agent().post(
      `/namespaces/${namespace}/users-groups`, 
      { user, group },
      { headers }
    );

    return data;
  },

  async fetchUser (namespace: string, user: string) {
    const key = store.tmpNamespacesKeys?.[namespace];

    const headers = key ? { authorization : key } : {};
    const { data } = await agent().get(
      `/namespaces/${namespace}/users`, 
      { headers }
    );

    return data;
  },





  async listAccessControls (namespace: string) {
    const key = store.tmpNamespacesKeys?.[namespace];

    const headers = key ? { authorization : key } : {};
    const { data } = await agent().get(`/namespaces/${namespace}/access-controls`, { headers });

    return data;
  },

  async createAccessControl (namespace: string, resource: string, accessControl: any) {
    const key = store.tmpNamespacesKeys?.[namespace];

    const headers = key ? { authorization : key } : {};
    const { data } = await agent().post(
      `/namespaces/${namespace}/resources/${resource}/access-controls`, 
      accessControl,
      { headers }
    );

    return data;
  },

  async deleteAccessControl (namespace: string, resource: string, accessControl: string) {
    const key = store.tmpNamespacesKeys?.[namespace];

    const headers = key ? { authorization : key } : {};
    const { data } = await agent().delete(
      `/namespaces/${namespace}/resources/${resource}/access-controls/${accessControl}`, 
      { headers }
    );

    return data;
  },

  
}