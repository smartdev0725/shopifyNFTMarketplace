"use strict";

import { init, start } from "./lib/server";

init()
    .then(() => start())
    .catch((err) => console.log("err :>> ", err));
