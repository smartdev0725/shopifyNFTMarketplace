export type RegisterPluginType = {
  version?: string;
  name: string;
  register: () => void | Promise<void>;
};
