const ghpages = require('gh-pages');
const path = require('path');

const buildPath = path.join(__dirname, 'dist');

console.log('🚀 Publicando la carpeta "dist" en GitHub Pages...');

ghpages.publish(buildPath, (err) => {
  if (err) {
    console.error('❌ Error durante la publicación:', err);
  } else {
    console.log('✅ ¡Despliegue completado con éxito!');
  }
});