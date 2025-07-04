// import { serve } from "inngest/next";
// import {
//   functions,
//   inngest,
//   syncUserCreation,
//   syncUserUpdation,
//   syncUserDeletion,
// } from "../../../config/ingest";
// // import { helloWorld } from "../../../inngest/functions";

// export const { GET, POST, PUT } = serve({
//   client: inngest,
//   functions: [syncUserCreation, syncUserUpdation, syncUserDeletion],
// });

import { serve } from "inngest/next";
import {
  inngest,
  syncUserCreation,
  syncUserUpdation,
  syncUserDeletion,
} from "@/config/ingest.js"; // Add .js if ingest file is in JS

export const { GET, POST } = serve(inngest, [
  syncUserCreation,
  syncUserUpdation,
  syncUserDeletion,
]);
