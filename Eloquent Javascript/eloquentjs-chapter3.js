// Your code here.

const min = function(a, b) {
  return a < b ? a : b;
};

console.log(min(0, 10));
// → 0
console.log(min(0, -10));
// → -10

// Your code here.
function isEven(n) {
  if (!n) return true;
  if (n == 1) return false;
  if (n < 0) return isEven(-n);
  return isEven(n - 2);
}

console.log(isEven(50));
// → true
console.log(isEven(75));
// → false
console.log(isEven(-1));
// → ??

// Your code here.
const countBs = (str) => countChar(str, 'B');

const countChar = (str, c) => {
  let count = 0;
  
  for (let i = 0; i < str.length; i++)
    if (str[i] === c) count++;
  
  return count;
};

console.log(countBs("BBC"));
// → 2
console.log(countChar("kakkerlak", "k"));
// → 4
