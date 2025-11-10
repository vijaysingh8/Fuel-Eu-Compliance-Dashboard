import request from "supertest";
import { createServer } from "../src/adapters/inbound/http/server";
import { beforeAll, describe, expect, it } from "vitest";


const app = createServer();


describe("HTTP endpoints", () => {
it("/health", async () => {
const res = await request(app).get("/health");
expect(res.status).toBe(200);
expect(res.body.ok).toBe(true);
});
});