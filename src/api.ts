import Axios, { AxiosRequestConfig } from 'axios';
import config from './config';
const axiosCookieJarSupport = require('axios-cookiejar-support').default;
const tough = require('tough-cookie');
import * as path from 'path';
var FileCookieStore = require("tough-cookie-filestore");
// const fs = require('fs-extra')
import * as fs from 'fs-extra';

axiosCookieJarSupport(Axios);


export const getApi = async (cliConfig: any) => {
  // const cookieJar = new tough.CookieJar(new DBCookieStore(null, null, null, {
  //   dialect : 'sqlite',
  //   storage: path.join(cliConfig.dataDir, `jastore_a.data`),
  // }));
  console.log('ensure dir', cliConfig.dataDir);
  await fs.ensureDir(cliConfig.dataDir);
  console.log('success');
  const filePath = path.join(cliConfig.dataDir, 'cookies.json');
  await fs.ensureFile(filePath);
  const cookieJar = new tough.CookieJar(new FileCookieStore(filePath));

  return Axios.create({
    baseURL: `https://${config.apiDomain}`,
    jar: cookieJar,
    withCredentials: true,
  } as AxiosRequestConfig);
}