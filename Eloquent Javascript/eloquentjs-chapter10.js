// Robot module			randomRobot
// Village module	or	routeRobot
// Road module			goalOrientedRobot
//				village
//				roads or (roads and graph module and 'roadGraph' would disappear)
//
/*
Here’s what I would have done (but again, there is no single right way to design a given module):

The code used to build the road graph lives in the graph module. Because I’d rather use dijkstrajs from NPM than our own pathfinding code, we’ll make this build the kind of graph data that dijkstrajs expects. This module exports a single function, buildGraph. I’d have buildGraph accept an array of two-element arrays, rather than strings containing hyphens, to make the module less dependent on the input format.

The roads module contains the raw road data (the roads array) and the roadGraph binding. This module depends on ./graph and exports the road graph.

The VillageState class lives in the state module. It depends on the ./roads module because it needs to be able to verify that a given road exists. It also needs randomPick. Since that is a three-line function, we could just put it into the state module as an internal helper function. But randomRobot needs it too. So we’d have to either duplicate it or put it into its own module. Since this function happens to exist on NPM in the random-item package, a good solution is to just make both modules depend on that. We can add the runRobot function to this module as well, since it’s small and closely related to state management. The module exports both the VillageState class and the runRobot function.

Finally, the robots, along with the values they depend on such as mailRoute, could go into an example-robots module, which depends on ./roads and exports the robot functions. To make it possible for goalOrientedRobot to do route-finding, this module also depends on dijkstrajs.

By offloading some work to NPM modules, the code became a little smaller. Each individual module does something rather simple and can be read on its own. Dividing code into modules also often suggests further improvements to the program’s design. In this case, it seems a little odd that the VillageState and the robots depend on a specific road graph. It might be a better idea to make the graph an argument to the state’s constructor and make the robots read it from the state object—this reduces dependencies (which is always good) and makes it possible to run simulations on different maps (which is even better).

Is it a good idea to use NPM modules for things that we could have written ourselves? In principle, yes—for nontrivial things like the pathfinding function you are likely to make mistakes and waste time writing them yourself. For tiny functions like random-item, writing them yourself is easy enough. But adding them wherever you need them does tend to clutter your modules.

However, you should also not underestimate the work involved in finding an appropriate NPM package. And even if you find one, it might not work well or may be missing some feature you need. On top of that, depending on NPM packages means you have to make sure they are installed, you have to distribute them with your program, and you might have to periodically upgrade them.

So again, this is a trade-off, and you can decide either way depending on how much the packages help you.
*/

// Likely to be prewritten
// graph, would need to check expected structure and returned structure of graph module
// random modules
// (not far off)

// Add dependencies and exports
const {buildGraph} = require('./graph');

const roads = [
  "Alice's House-Bob's House",   "Alice's House-Cabin",
  "Alice's House-Post Office",   "Bob's House-Town Hall",
  "Daria's House-Ernie's House", "Daria's House-Town Hall",
  "Ernie's House-Grete's House", "Grete's House-Farm",
  "Grete's House-Shop",          "Marketplace-Farm",
  "Marketplace-Post Office",     "Marketplace-Shop",
  "Marketplace-Town Hall",       "Shop-Town Hall"
];

exports.roadGraph = buildGraph(roads.map(x => x.split('-')))

/*
The trick is that require adds modules to its cache before it starts loading the module. That way, if any require call made while it is running tries to load it, it is already known, and the current interface will be returned, rather than starting to load the module once more (which would eventually overflow the stack).

If a module overwrites its module.exports value, any other module that has received its interface value before it finished loading will have gotten hold of the default interface object (which is likely empty), rather than the intended interface value.
*/

