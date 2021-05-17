const cypress = require('cypress')

cypress
  .run({
    // the path is relative to the current working directory
    spec: './cypress/integration/vrt-paleta-colores.js',
  })
  .then((results) => {
    console.log(results)
  })
  .catch((err) => {
    console.error(err)
  })