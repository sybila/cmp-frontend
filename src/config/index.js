var env = process.env.NODE_ENV === "production" ? "prod" : "dev";
var loadedModule = require("./config." + env + ".js");
var sharedConfig = require("./config.shared.js");
export default Object.assign({}, loadedModule, sharedConfig);
