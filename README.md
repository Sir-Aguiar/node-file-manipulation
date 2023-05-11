File paths represent fi les, and these paths come in relative or absolute formats. You can concatenate file paths, extract fi lename information, and even detect fi le existence.

## Path normalize 
Normalizing paths before storing them is a good practice, for example, file paths that were input by users or are present in a confi guration fi le, as well as paths that are the result of joining two or more paths, usually need to be normalized. . To do so, you can use the normalize function present in the path module to normalize a path string, thus taking care of .., ., and //. 

## Join
By using path.join(), you can concatenate path strings. You can concatenate as many as you like,passing all of them as consecutive arguments like so