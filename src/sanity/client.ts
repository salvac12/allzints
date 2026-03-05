import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";

export const isSanityConfigured = !!projectId;

export const client = createClient({
  projectId: projectId || "placeholder",
  dataset,
  apiVersion,
  useCdn: true,
});
