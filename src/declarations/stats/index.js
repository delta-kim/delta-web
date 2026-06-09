import { Actor, HttpAgent } from "@dfinity/agent";

// Imports and re-exports candid interface
import { idlFactory } from "./service.did.js";
export { idlFactory } from "./service.did.js";

export const createActor = async (canisterId, options = {}) => {
  const agent = options.agent || new HttpAgent({ ...options.agentOptions });

  if (options.agent && options.agentOptions) {
    console.warn(
      "Detected both agent and agentOptions passed to createActor. Ignoring agentOptions and proceeding with the provided agent."
    );
  }

  if (options.agentOptions && options.agentOptions.host && options.agentOptions.host.startsWith("http://")) {
    console.log("fetchRootKey start");
    await agent.fetchRootKey();
    console.log("fetchRootKey end");
  }

  // Creates an actor with using the candid interface and the HttpAgent
  return Actor.createActor(idlFactory, {
    agent,
    canisterId,
    ...options.actorOptions,
  });
};
