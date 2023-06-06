//interfce de Configuracion global
export interface InitialState {
  settings: Array<GlobalSettings>;
  update: boolean;
  globalSettingSelected: GlobalSettings | null;
}

export interface GlobalSettings {
  id: string;
  plenarySessions: number;
  /*   commissionSessions: number; */
  sessions_per_period: number;
  legislature: { label: string; value: string };
}
