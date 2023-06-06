export interface Commission {
  id: string;
  commission_id: string;
  name: string;
  description: string;
  no_sessions_commission: number;
}
export interface Commissions {
  commissions: Array<Commission>;
  update: boolean;
  commissionSelected: Commission | null;
}
