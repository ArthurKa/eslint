// @ts-check
'use strict';

const { checkIfReactRichedV17, makeConfig, allDependencies, pkgName } = require('./utils');

// eslint-disable-next-line no-extra-parens
const isFrontend = (
  allDependencies.react
    ? true
    : !allDependencies.typescript
      ? false
      : !allDependencies['@types/node']
);
const isReactRichedV17 = checkIfReactRichedV17();

const workspace = isFrontend ? 'frontend' : 'backend';
console.info(`${pkgName}: detect ${workspace} workspace. Apply ${workspace} linter config.`);

module.exports = makeConfig(isFrontend, isReactRichedV17);
