function countSteps(state, robot, memory) {
  for (let turn = 0;; turn++) {
    if (state.parcels.length == 0) return turn;
    let action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
  }
}

function compareRobots(robot1, memory1, robot2, memory2) {
  // Your code here
  let simulations = 100;
  let sumRobot1 = 0;
  let sumRobot2 = 0;
  
  for (let i = 0; i < simulations; i++) {
    const state = VillageState.random();
    
    sumRobot1 += countSteps(state, robot1, memory1);
    sumRobot2 += countSteps(state, robot2, memory2);
  }

  console.log(`Robot 1 took an average of ${sumRobot1/simulations} turns`);
  console.log(`Robot 2 took an average of ${sumRobot2/simulations} turns`);
  // console.log(`Robot 1 needed ${total1 / 100} steps per task`)
  // console.log(`Robot 2 needed ${total2 / 100}`)
}

compareRobots(routeRobot, [], goalOrientedRobot, []);

// Your code here
function yourRobot({place, parcels}, route) {
  if (route.length === 0) {
    let startRoute = parcels[0].place !== place ?
        findRoute(roadGraph, place, parcels[0].place) :
    	findRoute(roadGraph, place, parcels[0].address);
    route = parcels.reduce((acc, curr) => {
    	if (curr.place !== place) {
          const aux = findRoute(roadGraph, place, curr.place)
          return aux.length < acc.length ? aux : acc;
        } else {
          const aux = findRoute(roadGraph, place, curr.address);
          return aux.length < acc.length ? aux : acc;
        }
    }, startRoute);
    /*if (parcel.place !== place) {
      route = findRoute(roadGraph, place, parcel.place);
    } else {
      route = findRoute(roadGraph, place, parcel.address);
    }*/
  }
  return {direction: route[0], memory: route.slice(1)};
}

runRobotAnimation(VillageState.random(), yourRobot, []);

// SOLUTION (Similar, but way smarter)
// score acts as a heuristics during decision making, leveraging the route length and if its picking up the package first
// rather than delivering it
function lazyRobot({place, parcels}, route) {
  if (route.length == 0) {
    // Describe a route for every parcel
    let routes = parcels.map(parcel => {
      if (parcel.place != place) {
        return {route: findRoute(roadGraph, place, parcel.place),
                pickUp: true};
      } else {
        return {route: findRoute(roadGraph, place, parcel.address),
                pickUp: false};
      }
    });

    // This determines the precedence a route gets when choosing.
    // Route length counts negatively, routes that pick up a package
    // get a small bonus.
    function score({route, pickUp}) {
      return (pickUp ? 0.5 : 0) - route.length;
    }
    route = routes.reduce((a, b) => score(a) > score(b) ? a : b).route;
  }

  return {direction: route[0], memory: route.slice(1)};
}

class PGroup {
  // Your code here.
  constructor(content = []) {
    this.content = content;
  }
  
  static empty = new PGroup();
  
  add(val) {
    if (!this.has(val)) return new PGroup(this.content.concat([val]));
    return this;
  }
  
  delete(val) {
    return new PGroup(this.content.filter(v => v !== val));
  }
  
  has(val) {
    return this.content.includes(val);
  }
  
  static from(iter) {
    const group = new PGroup();
    for (let el of iter) {
      group.add(el);
    }
    
    return group;
  }
}

let a = PGroup.empty.add("a");
let ab = a.add("b");
let b = ab.delete("a");

console.log(b.has("b"));
// → true
console.log(a.has("b"));
// → false
console.log(b.has("a"));
// → false
