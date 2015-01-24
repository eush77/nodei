[![npm](https://nodei.co/npm/nodei.png)](https://nodei.co/npm/nodei/)

# nodei

[![Dependency Status][david-badge]][david]

`nodei` executes script files and exports global declarations into the REPL.

Supports REPL commands.

The goal is to foster experimentation and rapid prototyping of JavaScript snippets.

[david]: https://david-dm.org/eush77/nodei
[david-badge]: https://david-dm.org/eush77/nodei.png

## Example

```js
$ nodei examples/foo.js
> foo
4
> printFoo()
4

/* Change examples/foo.js. */

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
nodei <filename>
```

## API

### `nodei(filename)`

Start the REPL session, populate it with commands and load `filename`.

Return the REPL instance.

## Caveats

Since script is loaded into a separate sandbox, there is no way to use a module system, so that's not supported yet. Working on it!

What _is_ supported, are the following [globals](http://nodejs.org/api/globals.html):
  - `console`,
  - `Buffer`,
  - `setTimeout`,
  - `clearTimeout`,
  - `setInterval`,
  - `clearInterval`.

## Install

```shell
npm install nodei -g
```

## License

MIT
