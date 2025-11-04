import { createServer } from "http";
import { buildApp } from "./app";
import { PORT } from "./config";

createServer(buildApp()).listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
