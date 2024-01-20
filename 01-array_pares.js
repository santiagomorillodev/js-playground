/**
 * Crear algoritmo que tome un array de objetos y devuelva un array de pares
 */

const array = [
  {
    id: 1,
    name: 'Ronald',
  },
  {
    id: 2,
    name: 'Santiago',
  },
  {
    id: 3,
    name: 'Jesús',
  },
];

function toPairs(array) {
  const properties1 = [];
  const properties2 = [];

  // Extraemon un objeto desde el array de objetos
  const object = array[0];

  // Los indices en los objetos son sus llaves en este caso serían: id y name
  for (idx in object) {
    properties1.push(idx);
  }

  // Los indices en los arrays son sus posiciones, en este caso: 0, 1, 2
  for (idx in array) {
    properties2.push(idx);
  }

  // Ahora resolvemos el ejercicio
  const pairs = [];

  for (idx in array) {
    // Obtenemos el objeto desde el array de objetos
    const object = array[idx];

    // Agregamos el par de valores al array de pares
    pairs.push([++idx, object]);
  }

  // Retornamos el array de pares
  return pairs;
}

// Imprimimos el resultado
console.log(toPairs(array));
