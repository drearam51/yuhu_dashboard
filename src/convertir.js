const fs = require('fs');
const path = require('path');

// Nombres de los meses en español para la conversión
const meses = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
];

function convertirInteracciones(archivoEntrada, archivoSalida) {
  try {
    const rutaEntrada = path.join(__dirname, archivoEntrada);
    const contenidoCSV = fs.readFileSync(rutaEntrada, 'utf8');

    // Separa el CSV por líneas y omite la primera (la cabecera)
    const lineas = contenidoCSV.split('\n').slice(1);

    const conteo = {}; // Objeto para agrupar y contar

    for (const linea of lineas) {
      if (linea.trim() === '') continue; // Ignora líneas vacías

      // Separa cada línea por el punto y coma (;)
      const columnas = linea.split(';');
      const fechaStr = columnas[0]; // ej: "5/8/2023"
      const autor = columnas[2] ? columnas[2].trim() : ''; // Tomamos el autor de la 3ra columna

      // Si no hay autor o fecha, saltamos la línea
      if (!fechaStr || !autor) continue;

      // Extrae el mes del string de fecha
      const mesIndex = parseInt(fechaStr.split('/')[1], 10) - 1;
      const nombreMes = meses[mesIndex];

      // Creamos una clave única para agrupar (ej: "agosto-Laura Plazasá")
      const clave = `${nombreMes}-${autor}`;

      if (conteo[clave]) {
        // Si ya existe, solo incrementamos el contador
        conteo[clave].interacciones += 1;
      } else {
        // Si no existe, creamos el objeto por primera vez
        conteo[clave] = {
          mes: nombreMes,
          usuario: autor,
          interacciones: 1
        };
      }
    }

    // Convertimos el objeto de conteo a un arreglo
    const resultadoFinal = Object.values(conteo).sort((a, b) => {
        // Ordenamos por mes y luego por interacciones de mayor a menor
        if (a.mes < b.mes) return -1;
        if (a.mes > b.mes) return 1;
        return b.interacciones - a.interacciones;
    });

    // Creamos el contenido del archivo de salida
    const contenidoSalida = `export const interaccionesData = ${JSON.stringify(resultadoFinal, null, 2)};`;
    
    // Escribimos el nuevo archivo
    const rutaSalida = path.join(__dirname, archivoSalida);
    fs.writeFileSync(rutaSalida, contenidoSalida, 'utf8');

    console.log(`✅ ¡Archivo "${archivoSalida}" generado con éxito!`);

  } catch (error) {
    console.error('❌ Error al procesar el archivo:', error);
  }
}

// Llama a la función con los nombres de tus archivos
convertirInteracciones('../public/data/chat_interacciones.csv', 'interacciones.js');