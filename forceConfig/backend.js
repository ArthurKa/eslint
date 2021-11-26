// @ts-check
'use strict';

const { makeConfig, printInfoMessage } = require('../src/utils');

printInfoMessage('Force apply backend linter config.');
module.exports = makeConfig(false);
