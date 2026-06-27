import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";

// During local validation we can force the storefront to read from the local
// productos.json fallback (set NEXT_PUBLIC_USE_LOCAL_DATA=true), so data edits
// are visible immediately without a Sanity write token. The /studio keeps
// working because it reads projectId directly from env.
const useLocalData = process.env.NEXT_PUBLIC_USE_LOCAL_DATA === "true";

export const isSanityConfigured = !!projectId && !useLocalData;

// Lazy client: only created when projectId is available
export const client = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
    })
  : (null as unknown as ReturnType<typeof createClient>);
