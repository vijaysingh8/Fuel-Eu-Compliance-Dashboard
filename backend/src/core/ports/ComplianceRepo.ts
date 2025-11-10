import type { CBRecord } from "../domain/Compliance";
export interface ComplianceRepo {
upsert(record: CBRecord): Promise<void>;
get(shipId: string, year: number): Promise<CBRecord | null>;
}