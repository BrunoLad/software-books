// Your code here.
class Vec {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  
  get length() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }
  
  plus(vector) {
    return new Vec(this.x + vector.x, this.y + vector.y);
  }
  
  minus(vector) {
    return new Vec((this.x - vector.x), (this.y - vector.y));
  }
}

console.log(new Vec(1, 2).plus(new Vec(2, 3)));
// → Vec{x: 3, y: 5}
console.log(new Vec(1, 2).minus(new Vec(2, 3)));
// → Vec{x: -1, y: -1}
console.log(new Vec(3, 4).length);
// → 5

class Group {
  // Your code here.
  constructor() {
    // this.content = new Set();
    this.content = [];
  }
  
  add(val) {
    // this.content.add(val);
    if (!this.has(val)) {
      this.content.push(val);
    }
  }
  
  delete(val) {
    // this.content.delete(val);
    const index = this.content.indexOf(val);
    /*if (index !== -1) {
      this.content = this.content.splice(0, index)
        .concat(this.content.splice(index + 1, this.content.length));
    }*/
    // Forgot that filter had already been shown
    // solution
    this.content = this.content.filter(v => v !== value);
  }
  
  has(val) {
    // return this.content.has(val);
    return this.content.includes(val);
  }
  
  static from(iter) {
    const group = new Group();
    for (let el of iter) {
      group.add(el);
    }
    
    return group;
  }
}

let group = Group.from([10, 20]);
console.log(group.has(10));
// → true
console.log(group.has(30));
// → false
group.add(10);
group.delete(10);
console.log(group.has(10));
// → false

// Your code here (and the code from the previous exercise)
class Group {
  // Your code here.
  constructor() {
    // this.content = new Set();
    this.content = [];
  }
  
  add(val) {
    // this.content.add(val);
    if (!this.has(val)) this.content.push(val);
  }
  
  delete(val) {
    // this.content.delete(val);
    const index = this.content.indexOf(val);
    /* if (index !== -1) {
      this.content = this.content.splice(0, index)
        .concat(this.content.splice(index + 1, this.content.length));
    } */
    this.content = this.content.filter(v => v !== value);
  }
  
  has(val) {
    // return this.content.has(val);
    return this.content.includes(val);
  }
  
  static from(iter) {
    const group = new Group();
    for (let el of iter) {
      group.add(el);
    }
    
    return group;
  }
  
  [Symbol.iterator]() {
  	return new GroupIterator(this);
	};
	
	// iterator alternative
	/*Group.prototype[Symbol.iterator] = function*() {
		for (let i = 0; i < this.content.length; i++) {
		  yield this.content[i];
		}
	};*/
}

class GroupIterator {
  constructor(group) {
    this.index = 0;
    this.group = group;
  }

  next() {
    if (this.index === this.group.content.length) return { done: true };

    return { done: false, value: this.group.content[this.index++] };
  }
}

for (let value of Group.from(["a", "b", "c"])) {
  console.log(value);
}
// → a
// → b
// → c

let map = {one: true, two: true, hasOwnProperty: true};

// Fix this call
// console.log(map.hasOwnProperty("one"));
console.log(Object.hasOwnProperty.call(map, 'one'));
// solution
console.log(Object.prototype.hasOwnProperty.call(map, "one"));
// → true

