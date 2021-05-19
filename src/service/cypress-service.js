const cypress = require('cypress');
const fs = require('fs');
const compareImages = require("resemblejs/compareImages");
const path = require('path');
const config = require("../resemblejs/conf.json");

const { options } = config;

class CypressService {

    constructor() {}
    
    static async takeScreenshot() {
      let datetime = new Date().toISOString().replace(/:/g,".");
      await cypress.run({
        reporter: 'junit',
        browser: 'chrome',
        config: {
          video: true,
        },
        env: {
          app_name: 'Palette Color',
          scrennshot_before: `${datetime}/before-chrome`,
          screenshot_after: `${datetime}/after-chrome`
        },
        headless: true,
        spec: ".//cypress/integration/palette-colors.spec.js"
      })
      .then((results) => {
        console.log(results)
      })
      .catch((err) => {
        console.error(err)
      });
      console.log('Quiero comprobar esto');
      let resultInfo = await compareUsingResembleJs(datetime);
      console.log('Termino de comparar');

      console.log('Copiando imagenes');
      let beforeImageName = `${datetime}-before-chrome.png`;
      let afterImageName = `${datetime}-after-chrome.png`;
      let compareImageName = `${datetime}-compare-chrome.png`;
      await copyImages(datetime, beforeImageName, afterImageName, compareImageName );

      let data = new Map();
      data.set('resultInfo', resultInfo);
      data.set('datetime', datetime);
      data.set('before-img', beforeImageName);
      data.set('after-img', afterImageName);
      data.set('compare-img', compareImageName);

      let dataSet = [];
      dataSet.push(data);
      return dataSet;
    }

}

async function compareUsingResembleJs(datetime) {
  let resultInfo = {}
  const data = await compareImages(
    fs.readFileSync(path.join(__dirname + `../../../cypress/screenshots/palette-colors.spec.js/${datetime}/before-chrome.png`)),
    fs.readFileSync(path.join(__dirname + `../../../cypress/screenshots/palette-colors.spec.js/${datetime}/after-chrome.png`)),
    options
  );
  resultInfo = {
    isSameDimensions: data.isSameDimensions,
    dimensionDifference: data.dimensionDifference,
    rawMisMatchPercentage: data.rawMisMatchPercentage,
    misMatchPercentage: data.misMatchPercentage,
    diffBounds: data.diffBounds,
    analysisTime: data.analysisTime
  }
  fs.writeFileSync(path.join(__dirname + `../../../cypress/screenshots/palette-colors.spec.js/${datetime}/compare-chrome.png`), data.getBuffer());

  return resultInfo;
}

async function copyImages(datetime, beforeImageName, afterImageName, compareImageName) {
  fs.copyFileSync(path.join(__dirname + `../../../cypress/screenshots/palette-colors.spec.js/${datetime}/before-chrome.png`), path.join(__dirname + `../../public/img/${beforeImageName}`));
  fs.copyFileSync(path.join(__dirname + `../../../cypress/screenshots/palette-colors.spec.js/${datetime}/after-chrome.png`), path.join(__dirname + `../../public/img/${afterImageName}`));
  fs.copyFileSync(path.join(__dirname + `../../../cypress/screenshots/palette-colors.spec.js/${datetime}/compare-chrome.png`), path.join(__dirname + `../../public/img/${compareImageName}`));
}

module.exports = CypressService;