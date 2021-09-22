import {Hook} from '@oclif/config';
import { init as localStorageInit } from '../../storage';
import { init as apiInit } from '../../api';

const hook: Hook<'init'> = async function (options) {
  // process.stdout.write(`example hook running ${opts.id}\n`)
  // info(args);
  localStorageInit(options.config);
  await apiInit(options.config);
}

export default hook
