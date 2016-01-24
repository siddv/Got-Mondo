'use strict';

describe('Service: mondo', function () {

  // load the service's module
  beforeEach(module('mondularApp'));

  // instantiate service
  var mondo;
  beforeEach(inject(function (_mondo_) {
    mondo = _mondo_;
  }));

  it('should do something', function () {
    expect(!!mondo).toBe(true);
  });

});
