// textbook code
function talksAbout(node, string) {
  if (node.nodeType == Node.ELEMENT_NODE) {
    for (let child of node.childNodes) {
      if (talksAbout(child, string)) {
        return true;
      }
    }
    return false;
  } else if (node.nodeType == Node.TEXT_NODE) {
    return node.nodeValue.indexOf(string) > -1;
  }
}

console.log(talksAbout(document.body, "book"));
// → true

let link = document.body.getElementsByTagName("a")[0];
console.log(link.href);

let ostrich = document.getElementById("gertrude");
console.log(ostrich.src);

let paragraphs = document.body.getElementsByTagName("p");
document.body.insertBefore(paragraphs[2], paragraphs[0]);

/*
The loop that goes over the images starts at the end of the list. This is necessary because the node list returned by a method like getElementsByTagName (or a property like childNodes) is live. That is, it is updated as the document changes. If we started from the front, removing the first image would cause the list to lose its first element so that the second time the loop repeats, where i is 1, it would stop because the length of the collection is now also 1.
*/
function replaceImages() {
  let images = document.body.getElementsByTagName("img");
  for (let i = images.length - 1; i >= 0; i--) {
    let image = images[i];
    if (image.alt) {
      let text = document.createTextNode(image.alt);
      image.parentNode.replaceChild(text, image);
    }
  }
}

let arrayish = { 0: "one", 1: "two", length: 2 };
let array = Array.from(arrayish);
console.log(array.map((s) => s.toUpperCase()));
// → ["ONE", "TWO"]

function elt(type, ...children) {
  let node = document.createElement(type);
  for (let child of children) {
    if (typeof child != "string") node.appendChild(child);
    else node.appendChild(document.createTextNode(child));
  }
  return node;
}

document
  .getElementById("quote")
  .appendChild(
    elt(
      "footer",
      "—",
      elt("strong", "Karl Popper"),
      ", preface to the second edition of ",
      elt("em", "The Open Society and Its Enemies"),
      ", 1950"
    )
  );

let paras = document.body.getElementsByTagName("p");
for (let para of Array.from(paras)) {
  if (para.getAttribute("data-classified") == "secret") {
    para.remove();
  }
}

// let para = document.body.getElementsByTagName("p")[0];
// console.log("clientHeight:", para.clientHeight);
// console.log("offsetHeight:", para.offsetHeight);
// console.log("clientWidth:", para.clientWidth);
// console.log("offsetWidth:", para.offsetWidth);

/*
Laying out a document can be quite a lot of work. In the interest of speed, browser engines do not immediately re-layout a document every time you change it but wait as long as they can. When a JavaScript program that changed the document finishes running, the browser will have to compute a new layout to draw the changed document to the screen. When a program asks for the position or size of something by reading properties such as offsetHeight or calling getBoundingClientRect, providing correct information also requires computing a layout.

A program that repeatedly alternates between reading DOM layout information and changing the DOM forces a lot of layout computations to happen and will consequently run very slowly. The following code is an example of this. It contains two different programs that build up a line of X characters 2,000 pixels wide and measures the time each one takes.
*/
function time(name, action) {
  let start = Date.now(); // Current time in milliseconds
  action();
  console.log(name, "took", Date.now() - start, "ms");
}

time("naive", () => {
  let target = document.getElementById("one");
  while (target.offsetWidth < 2000) {
    target.appendChild(document.createTextNode("X"));
  }
  console.log(`${target.innerHTML}`.length);
});
// → naive took 32 ms

time("clever", function () {
  let target = document.getElementById("two");
  target.appendChild(document.createTextNode("XXXXX"));
  let total = Math.ceil(2000 / (target.offsetWidth / 5));
  console.log(total);
  target.firstChild.nodeValue = "X".repeat(total);
});
// → clever took 1 ms

/*
If we just updated the DOM in a loop, the page would freeze, and nothing would show up on the screen. Browsers do not update their display while a JavaScript program is running, nor do they allow any interaction with the page. This is why we need requestAnimationFrame—it lets the browser know that we are done for now, and it can go ahead and do the things that browsers do, such as updating the screen and responding to user actions.

The animation function is passed the current time as an argument. To ensure that the motion of the cat per millisecond is stable, it bases the speed at which the angle changes on the difference between the current time and the last time the function ran. If it just moved the angle by a fixed amount per step, the motion would stutter if, for example, another heavy task running on the same computer were to prevent the function from running for a fraction of a second.
*/
() => {
  let cat = document.querySelector("img");
  let angle = Math.PI / 2;
  function animate(time, lastTime) {
    if (lastTime != null) {
      angle += (time - lastTime) * 0.001;
    }
    cat.style.top = Math.sin(angle) * 20 + "px";
    cat.style.left = Math.cos(angle) * 200 + "px";
    requestAnimationFrame((newTime) => animate(newTime, time));
  }
  requestAnimationFrame(animate);
};

// EXERCISES
const MOUNTAINS = [
  { name: "Kilimanjaro", height: 5895, place: "Tanzania" },
  { name: "Everest", height: 8848, place: "Nepal" },
  { name: "Mount Fuji", height: 3776, place: "Japan" },
  { name: "Vaalserberg", height: 323, place: "Netherlands" },
  { name: "Denali", height: 6168, place: "United States" },
  { name: "Popocatepetl", height: 5465, place: "Mexico" },
  { name: "Mont Blanc", height: 4808, place: "Italy/France" },
];

// Your code here
const mountainsDiv = document.getElementById("mountains");
const table = mountainsDiv.appendChild(document.createElement("table"));
console.log(table);
// headers
const headerRow = table.appendChild(document.createElement("tr"));
const headers = Object.keys(MOUNTAINS[0]);
for (let i = 0; i < headers.length; i++) {
  const th = headerRow.appendChild(document.createElement("th"));
  th.appendChild(document.createTextNode(headers[i]));
}

for (let i = 0; i < MOUNTAINS.length; i++) {
  const dataRow = table.appendChild(document.createElement("tr"));
  for (let j = 0; j < headers.length; j++) {
    const td = dataRow.appendChild(document.createElement("th"));
    const data = MOUNTAINS[i][headers[j]];
    if (typeof data === "number") td.style.textAlign = "right";
    td.appendChild(document.createTextNode(data));
  }
}

// Book SOLUTION
() => {
  const MOUNTAINS = [
    { name: "Kilimanjaro", height: 5895, place: "Tanzania" },
    { name: "Everest", height: 8848, place: "Nepal" },
    { name: "Mount Fuji", height: 3776, place: "Japan" },
    { name: "Vaalserberg", height: 323, place: "Netherlands" },
    { name: "Denali", height: 6168, place: "United States" },
    { name: "Popocatepetl", height: 5465, place: "Mexico" },
    { name: "Mont Blanc", height: 4808, place: "Italy/France" },
  ];

  function buildTable(data) {
    let table = document.createElement("table");

    let fields = Object.keys(data[0]);
    let headRow = document.createElement("tr");
    fields.forEach(function (field) {
      let headCell = document.createElement("th");
      headCell.appendChild(document.createTextNode(field));
      headRow.appendChild(headCell);
    });
    table.appendChild(headRow);

    data.forEach(function (object) {
      let row = document.createElement("tr");
      fields.forEach(function (field) {
        let cell = document.createElement("td");
        cell.appendChild(document.createTextNode(object[field]));
        if (typeof object[field] == "number") {
          cell.style.textAlign = "right";
        }
        row.appendChild(cell);
      });
      table.appendChild(row);
    });

    return table;
  }

  document.querySelector("#mountains").appendChild(buildTable(MOUNTAINS));
};

function byTagName(node, tagName) {
  // Your code here.
  let arr = [];
  for (let child of node.children) {
    if (child.nodeName.toLowerCase() === tagName) arr.push(child);
    if (child.children !== null) arr = [...arr, ...byTagName(child, tagName)];
  }

  return arr;
}

console.log(byTagName(document.body, "h1").length);
// → 1
console.log(byTagName(document.body, "span").length);
// → 3
let para = document.querySelector("p");
console.log(byTagName(para, "span").length);
// → 2

// Book SOLUTION
() => {
  function byTagName(node, tagName) {
    let found = [];
    tagName = tagName.toUpperCase();

    function explore(node) {
      for (let i = 0; i < node.childNodes.length; i++) {
        let child = node.childNodes[i];
        if (child.nodeType == document.ELEMENT_NODE) {
          if (child.nodeName == tagName) found.push(child);
          explore(child);
        }
      }
    }

    explore(node);
    return found;
  }

  console.log(byTagName(document.body, "h1").length);
  // → 1
  console.log(byTagName(document.body, "span").length);
  // → 3
  let para = document.querySelector("p");
  console.log(byTagName(para, "span").length);
  // → 2
};

let cat = document.querySelector("#cat");
let hat = document.querySelector("#hat");

let angle = 0;
let lastTime = null;
// hat transitions together with the cat on top of its head, but not maintaining same level
hat.style.top = "-50px";
function animate(time) {
  if (lastTime != null) angle += (time - lastTime) * 0.001;
  lastTime = time;
  cat.style.top = Math.sin(angle) * 40 + 40 + "px";
  cat.style.left = Math.cos(angle) * 200 + 230 + "px";

  // Your extensions here.
  // hat.style.top = (Math.sin(angle + Math.PI) * 40 + 40) + 'px';
  hat.style.left = Math.cos(angle) * 200 + 230 + "px";

  // orbit around cat
  // it would probably be best to find a circle around the cat
  // maybe trying to get the cats position, but don't know if it
  // would be a very optimized solution
  // cat.style.top = (Math.sin(angle) * 40 + 40) + 'px';
  //v cat.style.left = (Math.cos(angle) * 200 + 230) + 'px';

  // hat.style.top = (Math.sin(angle) * 40 - 5 + (Math.sin(angle) * 100 + 100 )) + 'px';
  // hat.style.left = (Math.cos(angle) * 200 + 240 + (Math.cos(angle) * 100 - 10)) + 'px';
  // doesn't work because of the 'forced' recalculation by browser done
  // each time offset is requested
  // hat.style.top = (Math.sin(angle) * 40 + (25 - cat.offsetHeight)) + 'px';
  // hat.style.left = (Math.cos(angle) * 200 + (25 - cat.offsetWidth)) + 'px';

  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

// Book SOLUTION
() => {
  let cat = document.querySelector("#cat");
  let hat = document.querySelector("#hat");

  let angle = 0;
  let lastTime = null;
  function animate(time) {
    if (lastTime != null) angle += (time - lastTime) * 0.001;
    lastTime = time;
    cat.style.top = (Math.sin(angle) * 40 + 40) + "px";
    cat.style.left = (Math.cos(angle) * 200 + 230) + "px";
    hat.style.top = (Math.sin(angle + Math.PI) * 40 + 40) + "px";
    hat.style.left = (Math.cos(angle + Math.PI) * 200 + 230) + "px";

    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
};