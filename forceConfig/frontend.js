// @ts-check
'use strict';

const { checkIfReactRichedV17, makeConfig } = require('../src/utils');

const isReactRichedV17 = checkIfReactRichedV17();

module.exports = makeConfig(true, isReactRichedV17);
