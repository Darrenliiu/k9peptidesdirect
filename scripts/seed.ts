import "./load-env";
import { ensureReady } from "../lib/ensure";

ensureReady()
  .then((ok) => {
    console.log(ok ? "Seed complete" : "DATABASE_URL missing — skipped");
    process.exit(ok ? 0 : 1);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
