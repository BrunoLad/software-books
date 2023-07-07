// Your code here.
const range = function(start, end, step = 1) {
  const arr = [];

  let i = start;
  while (i !== end) {
    arr.push(i);
    i += step;
  }
  arr.push(i);

  return arr;
};

function sum(numbers) {
  let sum = 0;
  for (let n of numbers) {
    sum += n;
  }
  
  return sum;
  // return numbers.reduce((acc, curr) => acc += curr, 0);
}

console.log(range(1, 10));
// → [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(range(5, 2, -1));
// → [5, 4, 3, 2]
console.log(sum(range(1, 10)));
// → 55

// Your code here.
const reverseArray = function(arr) {
  const newArr = [];

  for (let el of arr) {
    newArr.unshift(el);
  }

  return newArr;
};

const reverseArrayInPlace = (arr) => {
  for (let i = 0; i < Math.floor(arr.length / 2); i++) {
    // const aux = arr[i];
    const complementaryIndex = arr.length - (i + 1);
    
    // arr[i] = arr[complementaryIndex];
    // arr[complementaryIndex] = aux;
    swap(arr, i, complementaryIndex);
  }
};

function swap(arr, index1, index2) {
  const aux = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = aux;
}

console.log(reverseArray(["A", "B", "C"]));
// → ["C", "B", "A"];
let arrayValue = [1, 2, 3, 4, 5];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);
// → [5, 4, 3, 2, 1]

// Your code here.
function arrayToList(arr) {
  if (!arr.length) return null;
  const val = arr[0];
    
  return { value: val, rest: arrayToList(arr.slice(1, arr.length)) };
}

// SOLUTION
function arrayToList(array) {
  let list = null;
  for (let i = array.length - 1; i >= 0; i--) {
    list = {value: array[i], rest: list};
  }
  return list;
}

const listToArray = function(list) {
  if (!list) return [];
  
  return [list.value, ...listToArray(list.rest)];
};

// SOLUTION
function listToArray(list) {
  let array = [];
  for (let node = list; node; node = node.rest) {
    array.push(node.value);
  }
  return array;
}

const prepend = (el, list) => {
  return {value: el, rest: list};
};

const nth = function(list, index) {
  if (!list) return undefined;
  if (!index) return list.value;
  
  return nth(list.rest, index - 1);
};

// SOLUTION
function nth(list, n) {
  if (!list) return undefined;
  else if (n == 0) return list.value;
  else return nth(list.rest, n - 1);
}

const arr = [10, 20];
console.log(arrayToList(arr));
console.log(arr);
// → {value: 10, rest: {value: 20, rest: null}}
console.log(listToArray(arrayToList([10, 20, 30])));
// → [10, 20, 30]
console.log(prepend(10, prepend(20, null)));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(nth(arrayToList([10, 20, 30]), 1));
// → 20

// Your code here.
const deepEqual = (obj1, obj2) => {
  if (obj1 === null && obj2) return false;
  else if (obj2 === null && obj1) return false;
  if (obj1 === null && obj1 === obj2) return true;
  
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  
  for (let k of keys1) {
    if (!keys2.includes(k)) return false;
    if (typeof obj1[k] !== typeof obj2[k]) return false;
    if (typeof obj1[k] === 'object') return deepEqual(obj1[k], obj2[k]);
    if (obj1[k] !== obj2[k]) return false;
  }
  
  return true;
};

// SOLUTION (way more elegant)
function deepEqual(a, b) {
  if (a === b) return true;
  
  if (a == null || typeof a != "object" ||
      b == null || typeof b != "object") return false;

  let keysA = Object.keys(a), keysB = Object.keys(b);

  if (keysA.length != keysB.length) return false;

  for (let key of keysA) {
    if (!keysB.includes(key) || !deepEqual(a[key], b[key])) return false;
  }

  return true;
}

let obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, {here: 1, object: 2}));
// → false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// → true
