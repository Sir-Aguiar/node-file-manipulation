import * as fs from "node:fs";
import * as path from "node:path";

const configPath = path.resolve("src", "samples", "credentials.config");
//
const adminCredential = "username=admin\npassword=admin\nuserport=3241";

fs.writeFile(configPath, adminCredential, "utf8", function (error) {
	if (error) console.log(error);
});
