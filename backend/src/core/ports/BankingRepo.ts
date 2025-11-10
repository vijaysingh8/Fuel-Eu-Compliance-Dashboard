export interface BankingRepo {
getBanked(shipId: string, year: number): Promise<number>; // sum
add(shipId: string, year: number, amount: number): Promise<void>;
apply(shipId: string, year: number, amount: number): Promise<void>;
}