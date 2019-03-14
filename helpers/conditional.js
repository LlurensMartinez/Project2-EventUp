'use strict';
const hbs = require('hbs');

module.exports = hbs.registerHelper('ifCond', function (v1, operator, v2, options) {
  return checkCondition(v1, operator, v2)
    ? options.fn(this)
    : options.inverse(this);
});

function checkCondition (v1, operator, v2) {
  switch (operator) {
  case '==':
    return (v1.toString() == v2);
  case '===':
    return (v1 === v2);
  case '!==':
    return (v1 !== v2);
  case '<':
    return (v1 < v2);
  case '<=':
    return (v1 <= v2);
  case '>':
    return (v1 > v2);
  case '>=':
    return (v1 >= v2);
  case '&&':
    return (v1 && v2);
  case '||':
    return (v1 || v2);
  default:
    return false;
  }
}
