import { serve } from "inngest/next";
import {
  functions,
  inngest,
  syncUserCreation,
  syncUserUpdation,
  syncUserDeletion,
} from "../../../config/ingest";
// import { helloWorld } from "../../../inngest/functions";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [syncUserCreation, syncUserUpdation, syncUserDeletion],
});
