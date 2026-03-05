import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";

export const isSanityConfigured = !!projectId;

// Lazy client: only created when projectId is available
export const client = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
    })
  : (null as unknown as ReturnType<typeof createClient>);
