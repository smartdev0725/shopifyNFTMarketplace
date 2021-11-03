"use strict";

import { PrismaClient } from "@prisma/client";
import { Server } from "@hapi/hapi";

declare module "@hapi/hapi" {
  interface ServerApplicationState {
    prisma: PrismaClient;
  }
}

const prisma = {
    name: "prisma",
    register: async function (server: Server): Promise<void> {
        const prisma: PrismaClient = new PrismaClient();

        server.app.prisma = prisma;

        server.ext({
            type: "onPostStop",
            method: async (server) => {
                server.app.prisma.$disconnect();
            },
        });
    },
};

module.exports = prisma;
