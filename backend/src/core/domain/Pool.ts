export type PoolMember = {
shipId: string;
cbBefore: number;
cbAfter?: number;
};
export type PoolInput = { year: number; members: PoolMember[] };