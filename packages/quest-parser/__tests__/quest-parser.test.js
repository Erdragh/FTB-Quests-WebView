'use strict';

const questParser = require('..');
const assert = require('assert').strict;

assert.strictEqual(questParser(), 'Hello from questParser');
console.info('questParser tests passed');
