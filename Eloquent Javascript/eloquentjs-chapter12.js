// Modify these definitions...

topScope.array = (...args) => args;

topScope.length = (arr) => arr.length;

topScope.element = (arr, n) => arr[n];

run(`
do(define(sum, fun(array,
     do(define(i, 0),
        define(sum, 0),
        while(<(i, length(array)),
          do(define(sum, +(sum, element(array, i))),
             define(i, +(i, 1)))),
        sum))),
   print(sum(array(1, 2, 3))))
`);
// → 6

/*
Again, we are riding along on a JavaScript mechanism to get the equivalent feature in Egg. Special forms are passed the local scope in which they are evaluated so that they can evaluate their subforms in that scope. The function returned by fun has access to the scope argument given to its enclosing function and uses that to create the function’s local scope when it is called.

This means that the prototype of the local scope will be the scope in which the function was created, which makes it possible to access bindings in that scope from the function. This is all there is to implementing closure (though to compile it in a way that is actually efficient, you’d need to do some more work).
*/

// This is the old skipSpace. Modify it...
function skipSpace(string) {
  string = string.replace(/#.*/g, '');
  let first = string.search(/\S/);
  if (first == -1) return "";
  return string.slice(first);
}

//solution
function skipSpace(string) {
  let skippable = string.match(/^(\s|#.*)*/);
  return string.slice(skippable[0].length);
}

console.log(parse("# hello\nx"));
// → {type: "word", name: "x"}

console.log(parse("a # one\n   # two\n()"));
// → {type: "apply",
//    operator: {type: "word", name: "a"},
//    args: []}

/*specialForms.define = (args, scope) => {
  if (args.length != 2 || args[0].type != "word") {
    throw new SyntaxError("Incorrect use of define");
  }
  let value = evaluate(args[1], scope);
  scope[args[0].name] = value;
  return value;
};*/


// My code is incomplete because it only looks up the immediate parent scope, not other higher scopes
specialForms.set = (args, scope) => {
  // Your code here.
  if (args.length != 2 || args[0].type !== 'word') {
    throw new SyntaxError('Incorrect use of define');
  }
  let value = evaluate(args[1], scope);
  
  const prototype = Object.getPrototypeOf(scope);
  
  if (!scope[args[0].name] ||
      !Object.prototype.hasOwnProperty.call(prototype, args[0].name)) throw new ReferenceError(`Undefined variable ${args[0].name}`);
  
  if (Object.prototype.hasOwnProperty.call(prototype, args[0].name)) {
    prototype[args[0].name] = value;
  } else if (scope[args[0].name]) {
    scope[args[0].name] = value;
  }
  return value;
};

// solution
specialForms.set = (args, env) => {
  if (args.length != 2 || args[0].type != "word") {
    throw new SyntaxError("Bad use of set");
  }
  let varName = args[0].name;
  let value = evaluate(args[1], env);

  for (let scope = env; scope; scope = Object.getPrototypeOf(scope)) {
    if (Object.prototype.hasOwnProperty.call(scope, varName)) {
      scope[varName] = value;
      return value;
    }
  }
  throw new ReferenceError(`Setting undefined variable ${varName}`);
};

run(`
do(define(x, 4),
   define(setx, fun(val, set(x, val))),
   setx(50),
   print(x))
`);
// → 50
run(`set(quux, true)`);
// → Some kind of ReferenceError
