import assert from 'assert';
import * as day1 from '../src/day1.js';

describe("Day 1", function(){
  it("expect decode 1 = 1", function(){
    assert.equal(day1.decode("1"), 1);
  });
  it("expect decode 2 = 2", function(){
    assert.equal(day1.decode("2"), 2);
  });
  it("expect decode p = 3", function(){
    assert.equal(day1.decode("p"), 3);
  });
  it("expect decode x = 8", function(){
    assert.equal(day1.decode("x"), 8);
  });
  it("expect decode a = 1", function(){
      assert.equal(day1.decode("a"), 1);
  });
  it("expect decode f = 5", function(){
    assert.equal(day1.decode("f"), 5);
  });
  it("expect decode t = 7", function(){
    assert.equal(day1.decode("t"), 7);
  });
});
