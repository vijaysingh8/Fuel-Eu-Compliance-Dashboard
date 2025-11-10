import { createServer } from "../../adapters/inbound/http/server";
import "dotenv/config";


const port = process.env.PORT ? Number(process.env.PORT) : 4000;
const app = createServer();
app.listen(port, () => console.log(`[backend] listening on :${port}`));
