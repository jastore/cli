import chalk = require("chalk");
import { api } from "../../api";
import { store } from "../../storage";
import { tips } from "../../tips";

const help = `
---
${tips.namespaces.setCurrent}
${tips.namespaces.listAvailable}`;


export async function ensureNamespace (namespaceCode?: string): Promise<void> {
  const code = namespaceCode || api.getCurrentNamespace();

  const exists = await api.checkNamespaceExists(code);

  if (!exists) {
    if (store.tmpNamespacesKeys?.[code]) {
      throw new Error(`This namespace does not exists anymore, or you lost access to it ${help}`);
    } else {
      throw new Error(`This namespace does not exists, or you don't have access to it ${help}`);
    }
  }
}