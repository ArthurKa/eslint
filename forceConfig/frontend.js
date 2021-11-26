// @ts-check
'use strict';

const { checkIfReactRichedV17, makeConfig, printInfoMessage } = require('../src/utils');

const isReactRichedV17 = checkIfReactRichedV17();

printInfoMessage('Force apply frontend linter config.');
module.exports = makeConfig(true, isReactRichedV17);
