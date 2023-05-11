import path from "node:path";

const FilePath = "/etc//ssh/example_file/..";
const NormalizedPath = path.normalize(FilePath);

console.log(FilePath); // -> /etc//ssh/example_file/..
console.log(NormalizedPath); // ->  \etc\ssh

path.join('/foo', 'bar', 'baz/asdf', 'quux', '..'); // -> '/foo/bar/baz/asdf'
