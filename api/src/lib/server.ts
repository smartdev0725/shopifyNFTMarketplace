"use strict";

import Hapi from "@hapi/hapi";

import plugins from "./plugins";

export let server: Hapi.Server;

export const init = async function (): Promise<Hapi.Server> {
    server = Hapi.server({
        port: process.env.PORT || 3000,
        host: process.env.HOST || "localhost",
    });

    server.register(plugins);

    return server;
};

export const start = async function (): Promise<void> {
    console.log(`Listening on ${server.info.uri}`);
    return server.start();
};

process.on("unhandledRejection", async (err) => {
    await server.app.prisma.$disconnect();
    console.error("unhandledRejection");
    console.error(err);
    process.exit(1);
});
