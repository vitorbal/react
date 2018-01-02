/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails react-core
 */

'use strict';

module.exports = function(context) {
  function checkPath(path, node) {
    if (path.match(/^react.*\/src/)) {
      context.report(node, 'Do not import project internals.');
    }
  }

  return {
    CallExpression(node) {
      if (node.callee.type !== 'Identifier' || node.callee.name !== 'require') {
        return;
      }

      const argument = node.arguments[0];
      if (argument.type !== 'Literal') {
        return;
      }

      checkPath(argument.value, node);
    },

    ImportDeclaration(node) {
      checkPath(node.source.value, node);
    },
  };
};
