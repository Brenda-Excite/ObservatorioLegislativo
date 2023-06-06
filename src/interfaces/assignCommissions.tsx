//Asignacion de comicion Interface
//paso1
export interface AssignCommission {
  id: string;
  name: string;
  assignmentID: string;
}
export interface AssignCommissions {
  assignCommissions: Array<AssignCommission>;
  update: boolean;
  assignCommissionSelected: AssignCommission | null;
}
