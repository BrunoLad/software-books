// Your code here.
let pattern = '#';

while (pattern.length < 8) {
  console.log(pattern);
  pattern += '#';
}

// Your code here.
let printableValue;
for (let i = 1; i <= 100; i++) {
  printableValue = i;
  if (!(i % 3)) {
    printableValue = 'Fizz';
  }
  
  if (!(i % 5)) {
    typeof printableValue === 'number' ?
      printableValue = 'Buzz' : printableValue += 'Buzz';
  }
  
  console.log(printableValue);
}

// SOLUTION (way better than my approach, forgot about the short-circuiting)
for (let n = 1; n <= 100; n++) {
  let output = "";
  if (n % 3 == 0) output += "Fizz";
  if (n % 5 == 0) output += "Buzz";
  console.log(output || n);
}


// Could've also been done using memoization
// Since the first two lines are repeated throughout the board
// Both lines could be generated and assigned to the final string
// based on row index
function printBoard(length = 8) {
  let str = '';
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      str += !((i + j) % 2) ? ' ' : '#';
    }
    str += '\n';
  }
  
  return str;
}

console.log(printBoard(20));
// Your code here.
