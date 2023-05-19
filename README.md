File paths represent files, and these paths come in relative or absolute formats. You can concatenate file paths, extract filename information, and even detect file existence.

## Path normalize

The `path.normalize()` takes care of .., ., //, etc.

> Normalizing paths is often a good idea, for example: file paths from users input, paths from configuration file, paths that are the result of joining two or more paths.

```js
const pathSample = path.normalize("C:\\temp\\\\foo\\bar\\..\\");
console.log(pathSample);
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
console.log(pathSample);
// 'src\index.js'
```

## Resolve

The `path.resolve()` method resolves a sequence of paths or path segments into an absolute path. It does not tap into the underlying filesystem to try to see if the path exists, simply
manipulates paths.

For example an empty string results in the path wich my file is being executed.

```js
const pathSample = path.resolve("");
console.log(pathSample);
// 'c:\Users\Felipe\Desktop\Repositories\file-manipulation'
```

> Observe that this code is inside src/index.js but the src/ segment is not showing up, cause my working directory is the root not src/.

```js
const pathSample = path.resolve("/foo/bar", "./baz");
console.log(pathSample);
// 'c:\foo\bar\baz'

const pathSample2 = path.resolve("foo/bar", "./baz");
console.log(pathSample2);
// 'c:\Users\Felipe\Desktop\Repositories\file-manipulation\foo\bar\baz'
```

## Relative path

This method give us the relative path between to paths. It will return the path from `from` to `to` (the two respectively arguments) based on the current working directory.

```js
const p1 = path.resolve("");
// 'C:\Users\Felipe\Desktop\Repositories\file-manipulation'
const p2 = path.resolve("src", "files", "index.js");
//'C:\Users\Felipe\Desktop\Repositories\file-manipulation\src\files\index.js'

const pathSample = path.relative(p1, p2);
console.log(pathSample);
// 'src\files\index.js'
```
