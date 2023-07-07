const { reverse } = require("./reverse");

// Index 2 holds the first actual command line argument
let argument = process.argv[2];

console.log(reverse(argument));

let { readFile } = require("fs");
readFile("file.txt", "utf8", (error, text) => {
  if (error) throw error;
  console.log("The file contains:", text);
});

readFile("file.txt", (error, buffer) => {
  if (error) throw error;
  console.log(
    "The file contained",
    buffer.length,
    "bytes.",
    "The first byte is:",
    buffer[0]
  );
});

const { writeFile } = require("fs");
writeFile("graffiti.txt", "Node was here", (err) => {
  if (err) console.log(`Failed to write file: ${err}`);
  else console.log("File written.");
});

const fsPromises = require("fs").promises;
fsPromises
  .readFile("file.txt", "utf8")
  .then((text) => console.log("The file contains:", text));

const { readFileSync } = require("fs");
console.log("The file contains:", readFileSync("file.txt", "utf8"));

const { request } = require("http");
let requestStream = request(
  {
    hostname: "eloquentjavascript.net",
    path: "/20_node.html",
    method: "GET",
    headers: { Accept: "text/html" },
  },
  (response) => {
    console.log("Server responded with status code", response.statusCode);
  }
);
requestStream.end();

const { createServer } = require("http");
// let server = createServer((request, response) => {
//   response.writeHead(200, { "Content-Type": "text/html" });
//   response.write(`
//     <h1>Hello!</h1>
//     <p>You asked for <code>${request.url}</code></p>`);
//   response.end();
// });
// server.listen(8000);
// console.log("Listening! (port 8000)");

// createServer((request, response) => {
//   response.writeHead(200, { "Content-Type": "text/plain" });
//   request.on("data", (chunk) => response.write(chunk.toString().toUpperCase()));
//   request.on("end", () => response.end());
// }).listen(8000);

request(
  {
    hostname: "localhost",
    port: 8000,
    method: "POST",
  },
  (response) => {
    response.on("data", (chunk) => process.stdout.write(chunk.toString()));
  }
).end("Hello server");
// → HELLO SERVER

const methods = Object.create(null);

createServer((request, response) => {
  let handler = methods[request.method] || notAllowed;
  handler(request)
    .catch((error) => {
      if (error.status != null) return error;
      return { body: String(error), status: 500 };
    })
    .then(({ body, status = 200, type = "text/plain" }) => {
      response.writeHead(status, { "Content-Type": type });
      if (body && body.pipe) body.pipe(response);
      else response.end(body);
    });
}).listen(8000);

async function notAllowed(request) {
  return {
    status: 405,
    body: `Method ${request.method} not allowed.`,
  };
}

const { parse } = require("url");
const { resolve, sep } = require("path");

const baseDirectory = process.cwd();

function urlPath(url) {
  let { pathname } = parse(url, '');
  let path = resolve(decodeURIComponent(pathname).slice(1));
  if (path != baseDirectory && !path.startsWith(baseDirectory + sep)) {
    throw { status: 403, body: "Forbidden" };
  }
  return path;
}

const { createReadStream } = require("fs");
const { stat, readdir } = require("fs").promises;
const mime = require("mime");

methods.GET = async function (request) {
  let path = urlPath(request.url);
  let stats;
  try {
    stats = await stat(path);
  } catch (error) {
    if (error.code != "ENOENT") throw error;
    else return { status: 404, body: "File not found" };
  }
  if (stats.isDirectory()) {
    return { body: (await readdir(path)).join("\n") };
  } else {
    return { body: createReadStream(path), type: mime.getType(path) };
  }
};

const { rmdir, unlink, mkdir } = require("fs").promises;

methods.DELETE = async function (request) {
  let path = urlPath(request.url);
  let stats;
  try {
    stats = await stat(path);
  } catch (error) {
    if (error.code != "ENOENT") throw error;
    else return { status: 204 };
  }
  if (stats.isDirectory()) await rmdir(path);
  else await unlink(path);
  return { status: 204 };
};

const { createWriteStream } = require("fs");

function pipeStream(from, to) {
  return new Promise((resolve, reject) => {
    from.on("error", reject);
    to.on("error", reject);
    to.on("finish", resolve);
    from.pipe(to);
  });
}

methods.PUT = async function (request) {
  let path = urlPath(request.url);
  await pipeStream(request, createWriteStream(path));
  return { status: 204 };
};

methods.MKCOL = async function (request) {
  let path = urlPath(request.url);
  let stats;
  try {
    stats = await stat(path);
  } catch (error) {
    if (error.code != 'ENOENT') throw error;
    await mkdir(path, { recursive: true });
    return { status: 201, body: `Directory ${request.url} created successfully` };
  }
  if (!stats.isDirectory()) return { status: 400, body: 'Not a directory' };
  return { status: 204 };
}

// IDEAS:
// So what I'm thinking is to create something similar to an Apache Server directory listing. Where the initial file and
// directory list is shown, in case it's a folder, a click event will trigger folder expansion and show its internal listing
// Once a file is clicked, the textarea will display its content for modification. Can tie in the grep.js for search features
// Add a button up top, or below to create a new file, making it possible to create it with content already present in
// textarea. Plus the MKCOL option. A delete button besides the directory listing.
// How would non easily editable files be dealt with? For instance a "".docx" or a .odt, can it's value easily be displayed?
// Or can I trigger a default application to open them and get edited data after closed? What if it's password protected?
// Is it possible to open a prompt asking for the passcode?

// A public space on the web
// Since the file server serves up any kind of file and even includes the right Content-Type header, you can use it to serve a website. Since it allows everybody to delete and replace files, it would be an interesting kind of website: one that can be modified, improved, and vandalized by everybody who takes the time to create the right HTTP request.

// Write a basic HTML page that includes a simple JavaScript file. Put the files in a directory served by the file server and open them in your browser.

// Next, as an advanced exercise or even a weekend project, combine all the knowledge you gained from this book to build a more user-friendly interface for modifying the website—from inside the website.

// Use an HTML form to edit the content of the files that make up the website, allowing the user to update them on the server by using HTTP requests, as described in Chapter 18.

// Start by making only a single file editable. Then make it so that the user can select which file to edit. Use the fact that our file server returns lists of files when reading a directory.

// Don’t work directly in the code exposed by the file server since if you make a mistake, you are likely to damage the files there. Instead, keep your work outside of the publicly accessible directory and copy it there when testing.

// You can create a <textarea> element to hold the content of the file that is being edited. A GET request, using fetch, can retrieve the current content of the file. You can use relative URLs like index.html, instead of http://localhost:8000/index.html, to refer to files on the same server as the running script.

// Then, when the user clicks a button (you can use a <form> element and "submit" event), make a PUT request to the same URL, with the content of the <textarea> as request body, to save the file.

// You can then add a <select> element that contains all the files in the server’s top directory by adding <option> elements containing the lines returned by a GET request to the URL /. When the user selects another file (a "change" event on the field), the script must fetch and display that file. When saving a file, use the currently selected filename.