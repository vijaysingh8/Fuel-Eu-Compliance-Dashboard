import type { PoolInput } from "../domain/Pool";
export interface PoolRepo {
create(input: PoolInput): Promise<{ poolId: number; members: { shipId: string; cbBefore: number; cbAfter: number }[] }>;
}