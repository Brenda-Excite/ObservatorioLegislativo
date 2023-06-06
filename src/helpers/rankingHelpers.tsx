export const calculateRanking = (indicadores: any, globalConfig: any) => {
  const assistances = indicadores.politician_assistance / (globalConfig[0] as any).plenarySessions;
  const commisions_assistances = indicadores.politician_assistance / (globalConfig[0] as any).commissionSessions;
  const full_participation = indicadores.participations_in_plenary_session_politician / (globalConfig[0] as any).sessions_per_period;
  const initiatives_presented = indicadores.initiatives_presented_politician / indicadores.initiatives_presented_congress;
  const initiatives_approved = indicadores.initiatives_approved_politician / indicadores.initiatives_presented_politician;
  const total = assistances + commisions_assistances + full_participation + initiatives_presented + initiatives_approved + indicadores.transparency;

  let percentile_Indicators = {
    "percentile_Indicators.assistances": assistances.toFixed(2),
    "percentile_Indicators.commisions_assistances": commisions_assistances.toFixed(2),
    "percentile_Indicators.full_participation": full_participation.toFixed(2),
    "percentile_Indicators.initiatives_approved": initiatives_approved.toFixed(2),
    "percentile_Indicators.initiatives_presented": initiatives_presented.toFixed(2),
    "percentile_Indicators.total": total.toFixed(2),
  };
  let indicators = {
    "indicators.initiatives_approved_politician": indicadores.initiatives_approved_politician,
    "indicators.initiatives_presented_congress": indicadores.initiatives_presented_congress,
    "indicators.initiatives_presented_politician": indicadores.initiatives_presented_politician,
    "indicators.participations_in_plenary_session_politician": indicadores.participations_in_plenary_session_politician,
    "indicators.politician_assistance": indicadores.politician_assistance,
  };

  const data = { ...indicators, ...percentile_Indicators };
  return data;
};

export const convertDataExcelToPoliticiansData = (politician: any, globalConfig: any) => {
  const assistances_percentil = parseInt(politician.No_de_Asistencias) / parseInt((globalConfig[0] as any).plenarySessions);
  const commisions_assistances = parseInt(politician.No_de_Asistencias) / parseInt((globalConfig[0] as any).commissionSessions);
  const fullParticipation = parseInt(politician.No_de_participaciones_en_pleno) / parseInt((globalConfig[0] as any).sessions_per_period);
  const initiativesPresented = parseInt(politician.no_de_iniciativas_presentadas) / parseInt(politician.no_de_iniciativas_presentadas_al_congreso);
  const initiativesApproved = parseInt(politician.no_de_iniciativas_aprobadas) / parseInt(politician.no_de_iniciativas_presentadas);
  const total_Ranking =
    assistances_percentil + commisions_assistances + fullParticipation + initiativesPresented + initiativesApproved + (politician.tres_de_tres === "Si" ? 1 : 0);

  const data = {
    name: politician.Nombre || "",
    image_path: politician.foto_diputado || "",
    radiography_path: politician.imagen_radiografia || "",
    date_of_birthday: politician.Fecha_de_Nacimiento || "",
    gender: politician.genero || "",
    academic_degree: { label: politician.grado_Academico || "", value: politician.grado_Academico || "" },
    last_job: politician.ultimo_cargo || "",
    hobbies: politician.hobbies || "",
    fan_page_facebook: politician.fan_page_facebook || "",
    no_followers_facebook: politician.no_seguidores_facebook || "",
    personal_account_facebook: politician.cuenta_personal_de_facebook,
    no_followers_twitter: politician.no_seguidores_twitter || "",
    account_twitter: politician.cuenta_de_twitter || "",
    account_instagram: politician.cuenta_de_instagram || "",
    no_followers_instagram: politician.no_seguidores_instagram || "",
    activity_report: politician.Reporte_de_Actividades,
    election: politician.Eleccion || "",
    month_presented: politician.mes_presentado || "",
    year_presented: politician.año_presentado || "",
    three_of_three: politician.tres_de_tres || "",
    political_party: { label: `${politician.abreviacion || ""}-${politician.partido_politico || ""}`, value: politician.partido_politico || "" },
    district: { label: `${politician.distrito_numero_romano || ""}-${politician.distrito || ""}`, value: politician.distrito || "" },
    legislature: { label: politician.legislatura || "", value: politician.legislatura || "" },
    commission: { label: politician.comision || "", value: politician.comision || "" },
    experience_legislative: politician.Experiencia_Legislativa || "",
    experience_list: [],
    percentile_Indicators: {
      assistances: assistances_percentil.toFixed(2) || 0,
      commisions_assistances: commisions_assistances.toFixed(2) || 0,
      initiatives_presented: initiativesPresented.toFixed(2) || 0,
      initiatives_approved: initiativesApproved.toFixed(2) || 0,
      transparency: politician.tres_de_tres === "Si" ? 1 : 0,
      full_participation: fullParticipation.toFixed(2) || 0,
      total: total_Ranking.toFixed(2),
    },
    indicators: {
      politician_assistance: parseInt(politician.No_de_Asistencias) || 0,
      participations_in_plenary_session_politician: parseInt(politician.No_de_participaciones_en_pleno) || 0,
      initiatives_presented_politician: parseInt(politician.no_de_iniciativas_presentadas) || 0,
      initiatives_approved_politician: parseInt(politician.no_de_iniciativas_aprobadas) || 0,
      initiatives_presented_congress: parseInt(politician.no_de_iniciativas_presentadas_al_congreso) || 0,
    },
  };

  return data;
};

//importar excel comissions
export const convertDataExcelToComissionData = (comission: any) => {
  const data = {
    commission_id: comission.id_comicion || "",
    name: comission.Nombre || "",
    description: comission.Descripcion || "",
    no_sessions_commission: comission.numero_de_seciones || "",
  };

  return data;
};

//importacion de exel asignacioncomiciones
export const convertDataExcelToAsingComissionData = (assignCommission: any) => {
  const data = {
    assignmentID: assignCommission.ID || "",
    name: assignCommission.Nombre || "",
  };

  return data;
};
