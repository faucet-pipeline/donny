donny
=====

[![npm](https://img.shields.io/npm/v/donny.svg)](https://www.npmjs.com/package/donny)

> as a surfer he explored the beaches of Southern California, from La Jolla to
> Leo Carrillo and up to Pismo

![goodbye, donny](https://media.giphy.com/media/j7wBU7aHcKf7y/giphy.gif)

donny serves a directory of files via HTTP. That's it. It works similarly to
`python3 -m http.server` or `ruby -run -e httpd` and is **not intended to be
used in production**. Use it in development only.

## Usage via CLI

Simply run

```
donny
```

to serve the current directory on port 8080. You can also run:

```
donny -p 9000 -b 127.0.0.1 dist
```

to bind to port 9000 for bind address 127.0.0.1 and serve the `dist` folder.

## Usage as a library

```js
let donny = require("donny");

donny({
    port: "9000",
    bind: "127.0.0.1",
    webroot: "dist"
}).then(() => {
    console.error("Serving 'dist' on port 9000");
});
```

## Comparison to other solutions

* It has no dependencies except minimist.
* In comparison to [servedir](https://github.com/remy/servedir), it serves the
  index.html when asked for a directory instead of listing the contents.

## License

donny is licensed under the Apache 2.0 License.
