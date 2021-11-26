// @ts-check
'use strict';

const { checkIfReactRichedV17, makeConfig, allDependencies } = require('./utils');

// eslint-disable-next-line no-extra-parens
const isFrontend = (
  allDependencies.react
    ? true
    : !allDependencies.typescript
      ? false
      : !allDependencies['@types/node']
);
const isReactRichedV17 = checkIfReactRichedV17();

module.exports = makeConfig(isFrontend, isReactRichedV17);
