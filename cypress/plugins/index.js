/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
const fs = require('fs')
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on('task', {
    existsSync(filename) {
      return fs.existsSync(filename);
    },
    mkdirSync(path) {
      return fs.mkdirSync(path, { recursive: true });
    },
    readFileSync(file) {
      return fs.readFileSync(file);
    },
    writeFileSync({file, buffer}) {
      return fs.writeFileSync(file, buffer);
    },
    copyFileSync({originFile, destFile}) {
      return fs.copyFileSync(originFile, destFile);
    },
  })
}
