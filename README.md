[![npm](https://nodei.co/npm/nodei.png)](https://nodei.co/npm/nodei/)

# nodei

[![Build Status][travis-badge]][travis] [![Dependency Status][david-badge]][david]

`nodei` executes script files and exports global declarations into the REPL.

Supports modules and REPL commands.

[travis]: https://travis-ci.org/eush77/nodei
[travis-badge]: https://travis-ci.org/eush77/nodei.svg
[david]: https://david-dm.org/eush77/nodei
[david-badge]: https://david-dm.org/eush77/nodei.png

## Example

foo.js:

```js
var foo = 4;

var printFoo = function () {
  return foo;
};
```

nodei repl session:

```js
$ nodei foo.js
> foo
4
> printFoo()
4

/* Change foo.js. */

> .reload
> foo
6
```

## Commands

| Command        | Description
| :------------: | :----------
| `.reload`      | Reload the active JS file
| `.load %file%` | Load `%file%` into REPL, set it as a target for future .reloads

Yes, built-in `.load` is gone.

## CLI

```
nodei [<filename>]
```

## API

### `nodei([filename], [options])`

Start the REPL session, populate it with commands and load `filename`.

`options` are passed to [`repl.start`](https://iojs.org/api/repl.html#repl_repl_start_options) and can override defaults.

Return the REPL instance.

### Event: 'load(filename)'

Emitted when file is loaded via `.load` or `.reload`, or at startup.

## Install

```shell
npm install nodei -g
```

## License

MIT
