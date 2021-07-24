// @ts-check
'use strict';

const { checkIfReactRichedV17, makeConfig, dependencies } = require('./utils');

// eslint-disable-next-line no-extra-parens
const isFrontend = (
  dependencies.react
    ? true
    : !dependencies.typescript
      ? false
      : !dependencies['@types/node']
);
const isReactRichedV17 = checkIfReactRichedV17();

module.exports = makeConfig(isFrontend, isReactRichedV17);
