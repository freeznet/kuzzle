var
  should = require('should'),
  operators = require.main.require('lib/api/dsl/operators');

describe('Test gte operator', () => {

  var document = {
    age: 10
  };

  it('should return false when the document field value is lower', () => {
    var result = operators.gte('age', 15, document);
    should(result).be.false();
  });

  it('should return true when the document field value is greater', () => {
    var result = operators.gte('age', 5, document);
    should(result).be.true();
  });

  it('should return true on equality', () => {
    var result = operators.gte('age', 10, document);
    should(result).be.true();
  });

  it('should return false if there is no document value', () => {
    should(operators.gte('foo', 10, document)).be.false();
  });
});