let http = require("http");
let fs = require("fs");
let path = require("path");
let util = require("util");
let stat = util.promisify(fs.stat);
let readFile = util.promisify(fs.readFile);
let mimeTypes = require("./mime_types");

module.exports = ({ port, bind, webroot }) => {
	return new Promise(resolve => {
		http.createServer(async ({ url }, res) => {
			let pathname = path.join(webroot, url);

			try {
				let [data, contentType] = await read(pathname);

				res.setHeader("Content-Type", contentType);
				res.end(data);
			} catch(err) {
				if(err.code === "ENOENT") {
					res.statusCode = 404;
					res.end(`File ${pathname} not found!`);
				} else {
					res.statusCode = 500;
					res.end(`Error getting the file: ${err}.`);
				}
			}
		}).
			on("listening", resolve).
			listen(port, bind);
	});
};

let read = async pathname => {
	let stats = await stat(pathname);

	if(stats.isDirectory()) {
		pathname = path.join(pathname, "index.html");
	}

	return [await readFile(pathname), contentTypeFor(pathname)];
};

let contentTypeFor = pathname => {
	let ext = path.parse(pathname).ext.toLowerCase();
	return mimeTypes[ext] || "text/plain";
};
