# Using Path

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
