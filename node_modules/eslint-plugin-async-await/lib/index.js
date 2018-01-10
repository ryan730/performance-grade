'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function checkSpace(context, node, message) {
  var sourceCode = context.getSourceCode(node);

  var _sourceCode$getFirstT = sourceCode.getFirstTokens(node, 2);

  var _sourceCode$getFirstT2 = _slicedToArray(_sourceCode$getFirstT, 2);

  var identifier = _sourceCode$getFirstT2[0];
  var punctuator = _sourceCode$getFirstT2[1];

  var hasntSpace = identifier.range[1] === punctuator.range[0];
  if (hasntSpace) {
    context.report({
      node: node,
      message: message,
      // @see http://eslint.org/docs/developer-guide/working-with-rules#applying-fixes
      fix: function fix(fixer) {
        return fixer.insertTextAfter(identifier, ' ');
      }
    });
  }
}

// @see http://eslint.org/docs/developer-guide/working-with-rules#the-context-object
exports.default = {
  rules: {
    'space-after-async': function spaceAfterAsync(context) {
      return {
        ArrowFunctionExpression: function ArrowFunctionExpression(node) {
          if (node.async) {
            checkSpace(context, node, 'Missing space after async');
          }
        },
        CallExpression: function CallExpression(node) {
          if (node.callee.name === 'async') {
            checkSpace(context, node, 'Missing space after async');
          }
        }
      };
    },
    'space-after-await': function spaceAfterAwait(context) {
      return {
        YieldExpression: function YieldExpression(node) {
          var sourceCode = context.getSourceCode(node);
          var identifier = sourceCode.getFirstToken(node);
          if (identifier.value === 'await') {
            checkSpace(context, node, 'Missing space after await');
          }
        }
      };
    }
  },
  rulesConfig: {
    'space-after-async': 0,
    'space-after-await': 0
  }
};
module.exports = exports['default'];
//# sourceMappingURL=index.js.map