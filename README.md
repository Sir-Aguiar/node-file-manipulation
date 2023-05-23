# Path

File paths represent files, and these paths come in relative or absolute formats. You can concatenate file paths, extract filename information, and even detect file existence.

## Path normalize

The `path.normalize()` takes care of .., ., //, etc.

> Normalizing paths is often a good idea, for example: file paths from users input, paths from configuration file, paths that are the result of joining two or more paths.

```js
const pathSample = path.normalize("C:\\temp\\\\foo\\bar\\..\\");
// 'C:\\temp\\foo\\'
```

> It's important to see that \\ is also a windows path separator, and the method work different in different platforms (Linux, MacOs, etc);

```js
// On POSIX
const pathSample = "/foo/bar//baz/asdf/quux/..";
path.normalize(pathSample);
// '/foo/bar/baz/asdf'
```

## Join

This method joins all given path segments together using the platform-specific separator as a delimiter, then normalizes the resulting path.

```js
const pathSample = path.join("src", "server", "..", "index.js");
// 'src\index.js'
```

## Resolve

The `path.resolve()` method resolves a sequence of paths or path segments into an absolute path. It does not tap into the underlying filesystem to try to see if the path exists, simply
manipulates paths.

For example an empty string results in the path wich my file is being executed.

```js
const pathSample = path.resolve("");
// 'c:\Users\User\Desktop\repo'
```

> Observe that this code is inside src/index.js but the src/ segment is not showing up, cause my working directory is the root not src/.

```js
const pathSample = path.resolve("/foo/bar", "./baz");
// 'c:\foo\bar\baz'

const pathSample2 = path.resolve("foo/bar", "./baz");
// 'c:\Users\User\Desktop\repo\foo\bar\baz'
```

## Relative path

This method give us the relative path between to paths. It will return the path from `from` to `to` (the two respectively arguments) based on the current working directory.

```js
const p1 = path.resolve("");
// 'C:\Users\User\Desktop\repo'
const p2 = path.resolve("src", "files", "index.js");
//'C:\Users\User\Desktop\repo\src\files\index.js'

const pathSample = path.relative(p1, p2);
// 'src\files\index.js'
```

## Extracting Components of a path

You might have a file path like `/configurations/serious-configs/serious-file.config`, and perhaps you need to read another file in the same directory or get data from the parent directory.

The `path.dirname()` method returns the directory name of a path (trailing directory separators are ignored).

```js
const parentDir = path.dirname("/configurations/serious-configs/serious-file.config");
// /configurations/serious-configs
```

In case you need the file name from a given path, use `path.basename()`.

> You can remove the file extension from the result (in this case .config) by passing it as a secundary argument in the method, like: `path.basename(path,extension)`;

> To get the file extension in advance, use `path.extname()`, that receives the file path and returns its extension.

```js
const configPath = "/configurations/serious-configs/serious-file.config";
const configFile = path.basename(configPath);
// serious-file.config

const fileExtension = path.extname(configPath);
// .config

const FileWithoutExtension = path.basename(configPath, fileExtension);
// serious-file
```

# Filesystem

This module is where the file query and manipulation methods are stored. by using this module you can query files, open, read, write and close them.

You can import everything from this module by: `import * as fs from "node:fs";`

Or import each method or class specifying them individually: `import { } from "node:fs";`

Notice that `fs` module has a lot of callback parameters inside its methods. Before getting into the method functionality I will place the typage of the callbacks and what else is needed. It's very important to know that these functions are mostly asynchronous, and if you want it to work well, know well the callbacks you shall.

## File statistics

### Reference: [Node documentation](https://nodejs.org/api/fs.html#fsstatpath-options-callback)

The method `fs.stat(path, callback)` returns some characteristics of a file, like: size, creation,permissions, etc...
Generally used to access meta-data of a file or directory.

### Parameters

- path `<string> | <Buffer> |<URL>`
- options `<object>`
  - bigint `<boolean>`: When the returned numeric values in `<fs.Stats>` should be bigint. Setted `false` as default.
- callback `<function>`
  - error `<Error>`
  - stats `<fs.Stats>`

```js
const configPath = path.resolve("src", "samples", "credentials.config");
// 'C:\Users\user\Desktop\repo\src\samples\credentials.config'

fs.stat(configPath, function (error, stats) {
	if (error) return console.log(error);
	console.log(stats);
});

/* Stats {
  dev: 3161518070,
  mode: 33206,
  nlink: 1,
  uid: 0,
  gid: 0,
  rdev: 0,
  blksize: 4096,
  ino: 10133099161797116,
  size: 0,
  blocks: 0,
  atimeMs: 1684786451698.632,
  mtimeMs: 1684786451698.632,
  ctimeMs: 1684786451698.632,
  birthtimeMs: 1684786451698.632,
  atime: 2023-05-22T20:14:11.699Z,
  mtime: 2023-05-22T20:14:11.699Z,
  ctime: 2023-05-22T20:14:11.699Z,
  birthtime: 2023-05-22T20:14:11.699Z
} */
```

> The `fs.Stats` object is quite big and useful, and i'm not listing all of the properties here, but if you wanna go deeper read the Node documentation that is very, very objective.


## Writing a file

Asynchronously writes data to a file, replacing it if already exists. 

### Parameters
- file `<string> | <Buffer> | <URL> | <integer>`
- data `<string> | <Buffer> | <TypedArray> | <DataView>`
- options ` <object> | <string>`
- callback `<function>`
  - error `<Error> | <AggregateError>`

It's important do define the enconding (with the options parameter), so if you're writing binary, hexs, etc... Say it to the method.
> The `enconde` option is ignored if `data` is a buffer

```js
const configPath = path.resolve("src", "samples", "credentials.config");
// 'C:\Users\user\Desktop\repo\src\samples\credentials.config'
const adminCredential = "username=admin\npassword=admin\nuserport=3241";

fs.writeFile(configPath, adminCredential, "utf8", function (error) {
	if (error) console.log(error);
});

```

> It's very unsufe to use `fs.writeFile()` at the same file multiple times without waiting for the callback being done. If you need to do something like this, check out for `fs.createWriteStream()`

> Also, if you wanna writing data without cleaning the existing data in the file, check out `fs.appendFile()`

## Reading data from a file

This method asynchronously read the entire data in a file, and returns it encoded in the pattern you define (if no encoding is defined, a buffer is returned)

### Parameters

- path `<string> | <Buffer> |<URL> | <integer>`
- options `<object> | <string>`
- callback `<function>`
  - error `<Error> | <AggregateError>`
  - data `<string> | <Buffer>`

```js
const configPath = path.resolve("src", "samples", "credentials.config");
// 'C:\Users\user\Desktop\repo\src\samples\credentials.config'

fs.readFile(configPath, function (error, data) {
	if (error) return console.log(error);
	console.log(data);
});
/* 
<Buffer 75 73 65 72 6e 61 6d 65 3d 61 64 6d 69 6e 0d 0a 70 61 73 73 77 6f 72 64 3d 61 64 6d 69 6e 0d 0a 75 73 65 72 70 6f 72 74 3d 33 32 34 31>
*/
```

Enconding it to UTF-8:

```js
const configPath = path.resolve("src", "samples", "credentials.config");
// 'C:\Users\user\Desktop\repo\src\samples\credentials.config'

fs.readFile(configPath, { encoding: "utf8" }, function (error, data) {
	if (error) return console.log(error);
	console.log(data);
});

/* 
username=admin
password=admin
userport=3241 
*/
```

> If the path is a directory, an error is returned

