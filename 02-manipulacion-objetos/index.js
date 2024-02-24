const obtenerInformacion = (parametro) => {
  materia = {
    fisica: ['profesor Luis', 'Pedro', 'Pepito', 'Maria', 'Gustavo'],
    calculo: ['profesor', 'Pedro', 'Pepito', 'Cofla', 'Maria', 'Gustavo'],
    quimica: ['profesor', 'Pedro', 'Pepito', 'Cofla', 'Maria', 'Gustavo'],
    programacion: ['profesor', 'Pedro', 'Pepito', 'Cofla', 'Maria', 'Gustavo'],
  };

  if (materia[parametro]) {
    return [materia[parametro], parametro, materia];
  }

  return materia;
};

function numeroDeClases(alumno) {
  let informacion = obtenerInformacion();
  let cantidadTotal = 0;

  for (info in informacion) {
    if (informacion[info].includes(alumno)) {
      cantidadTotal++;
    }
  }
  return cantidadTotal;
}

const mostrarInformacion = (materia) => {
  let informacion = obtenerInformacion(materia);
  let profesor = informacion[0].shift();

  document.write(`la materia es ${informacion[1]} y el profesor asignado es el ${profesor} y los alumnos son :<br>
    |<b id = "infoAlumnos"> ${informacion[0].join(
      ', '
    )} </b>|<br> el estudiante ${'sin rellenar'} esta en ${'sin rellenar'} clases <br><br>`);
};

let mostrarInfo = obtenerInformacion();

document.write(mostrarInfo);
document.write('<br><br>');
mostrarInformacion('fisica');

document.write(`El estudiante esta en ${numeroDeClases('Cofla')} clases`);
