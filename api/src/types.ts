import { Server } from "@hapi/hapi";

export type RegisterPlugin = {
  version?: string;
  name: string;
  dependencies?: string[];
  register: (server: Server) => Promise<void>;
};
