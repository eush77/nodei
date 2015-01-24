[![npm](https://nodei.co/npm/nodei.png)](https://nodei.co/npm/nodei/)

# nodei

[![Dependency Status][david-badge]][david]

`nodei` executes the script file and spawns REPL with exported global declarations.

It fosters experimentation and rapid prototyping of small JavaScript snippets.

[david]: https://david-dm.org/eush77/nodei
[david-badge]: https://david-dm.org/eush77/nodei.png

## Usage

```
nodei <filename>
```

## Example

```js
$ cat >foo.js
var x = 2;
$ nodei foo.js
> x
2
```

## Caveats

Since script is loaded into a separate sandbox, there is no way to use a module system, so that's not supported.

What _is_ supported, are the following [globals](http://nodejs.org/api/globals.html):
  - `console`,
  - `Buffer`,
  - `setTimeout`,
  - `clearTimeout`,
  - `setInterval`,
  - `clearInterval`.

## Install

```shell
npm install -g nodei
```

## License

MIT
