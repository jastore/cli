import { api } from "../../api";
import { store } from "../../storage";


export async function checkNamespaces () {
  const tmpNamespaces = Object.keys(store.tmpNamespacesKeys || {});

  for (const code of tmpNamespaces) {
    try {
      const namespace = await api.fetchNamespace(code);
    } catch (e) {
      
    }
  }
}