"use strict";

import { RegisterPlugin } from "../types";
import prisma from "../plugins/prisma";

const plugins: RegisterPlugin[] = [prisma];

export default plugins;

