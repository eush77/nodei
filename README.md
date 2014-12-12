# nodei [![Dependency Status][david-badge]][david]

[![npm](https://nodei.co/npm/nodei.png)](https://nodei.co/npm/nodei/)

[david]: https://david-dm.org/eush77/nodei
[david-badge]: https://david-dm.org/eush77/nodei.png

`nodei` executes the script file and spawns REPL with exported global declarations.

Fosters experimentation and rapid prototyping of small JavaScript snippets.

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

## Install

```shell
npm install -g nodei
```

## License

MIT
