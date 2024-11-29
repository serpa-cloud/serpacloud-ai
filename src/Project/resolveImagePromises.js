/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */

export default async function resolveImagePromises(obj) {
  // Función recursiva para recorrer y resolver promesas
  async function traverse(node) {
    if (Array.isArray(node)) {
      // Si el nodo es un array, recorre cada elemento
      for (let i = 0; i < node.length; i++) {
        node[i] = await traverse(node[i]);
      }
    } else if (node && typeof node === 'object') {
      // Si el nodo es un objeto, verifica sus propiedades
      for (const key in node) {
        if (key === 'id' && node.type === 'image' && node[key] instanceof Promise) {
          // Si es un nodo de tipo imagen y su id es una promesa, resuelve la promesa
          node[key] = await node[key];
        } else {
          // De lo contrario, sigue recorriendo el objeto
          node[key] = await traverse(node[key]);
        }
      }
    }
    return node;
  }

  // Inicia el recorrido desde el nodo raíz
  const r = await traverse(obj);

  return r;
}
