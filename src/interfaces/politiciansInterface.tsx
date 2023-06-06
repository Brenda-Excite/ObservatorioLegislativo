export interface InitialState {
  politicians: Array<Politician>;
  update: boolean;
  politicianSelected: Politician | null;
  politician: Politician | null;
}

export interface Politician {
  id: string;
  image_path: string;
  radiography_path: string;
  name: string;
  date_of_birthday: string;
  gender: string;
  academic_degree: { label: string; value: string };
  last_job: string;
  hobbies: string;
  fan_page_facebook: string;
  no_followers_facebook: string;
  personal_account_facebook: string;
  no_followers_twitter: number;
  account_twitter: string;
  account_instagram: string;
  no_followers_instagram: string;
  activity_report: string;
  election: string;
  month_presented: string;
  year_presented: string;
  three_of_three: string;
  political_party: { label: string; value: string };
  district: { label: string; value: string };
  legislature: { label: string; value: string };
  commission: { label: string; value: string };
  experience_legislative: string;
  experience_list: string[];
  percentile_Indicators: PercentileIndicators;
  indicators: Indicators;
}

export interface PercentileIndicators {
  assistances: number;
  commisions_assistances: number;
  full_participation: number;
  initiatives_presented: number;
  transparency: number;
  initiatives_approved: number;
  total: number;
}

export interface Indicators {
  politician_assistance: number;
  participations_in_plenary_session_politician: number;
  initiatives_presented_politician: number;
  initiatives_approved_politician: number;
  initiatives_presented_congress: number;
  /*   politician_assistance_commission: number; */
}
