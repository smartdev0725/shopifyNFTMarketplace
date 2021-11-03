"use strict";

import fs from "fs";
import path from "path";
import { RegisterPluginType } from "../types";

const pluginsFolder = path.join(path.dirname(__dirname), "\\", "plugins");

let plugins: RegisterPluginType[] = [];

fs.readdirSync(pluginsFolder)
    .filter((file) => file != "index.js" && path.extname(file) != ".ts")
    .forEach((file) => {
        plugins = plugins.concat(require(`${pluginsFolder}\\${file}`));
    });

export default plugins;
