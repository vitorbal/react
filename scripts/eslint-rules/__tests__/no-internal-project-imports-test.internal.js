/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails react-core
 */

'use strict';

const rule = require('../no-internal-project-imports');
const RuleTester = require('eslint').RuleTester;
const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 2015, sourceType: 'module' },
});

const errors = [
  {
    message: 'Do not import project internals.',
  },
];

ruleTester.run('eslint-rules/no-internal-project-imports', rule, {
  valid: [
    "import * as ReactFiberTreeReflection from 'react-reconciler/reflection'",
    "import ReactDOM from 'react-dom'",
    "require('react-reconciler/reflection')",
    "require('react-dom')",
  ],
  invalid: [
    {
      code:
        "import {createFiberFromPortal} from 'react-reconciler/src/ReactDebugCurrentFiber'",
      errors,
    },
    {
      code:
        "import ReactDebugCurrentFiber from 'react-reconciler/src/ReactDebugCurrentFiber'",
      errors,
    },
    {
      code: "require('react-reconciler/src/ReactDebugCurrentFiber')",
      errors,
    },
  ],
});
