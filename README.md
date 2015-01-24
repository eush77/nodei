[![npm](https://nodei.co/npm/nodei.png)](https://nodei.co/npm/nodei/)

# nodei

[![Dependency Status][david-badge]][david]

`nodei` executes script files and exports global declarations into the REPL.

Supports REPL commands.

The goal is to foster experimentation and rapid prototyping of JavaScript snippets.

[david]: https://david-dm.org/eush77/nodei
[david-badge]: https://david-dm.org/eush77/nodei.png

## Usage

```
nodei <filename>
```

## Example

```js
$ nodei example/foo.js
> foo
4
> printFoo()
4

/* Change example/foo.js. */

> .reload
> foo
6
```

## Commands

| Command        | Description
| :------------: | :----------
| `.reload`      | Reload the active JS file
| `.load %file%` | Load `%file%` into REPL

Yes, built-in `.load` is gone.

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
