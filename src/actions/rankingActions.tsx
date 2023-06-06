import { Indicators, Politician } from "../interfaces/politiciansInterface";
import { types } from "../types/types";
import { loadData, updateData } from "../helpers/firebaseMethods";
import { calculateRanking } from "../helpers/rankingHelpers";
import { showAlert } from "../helpers/messagesNotifications";

export const startLoadRankingPoliticians = () => {
  return async (dispatch: any) => {
    try {
      const politicians = await loadData("politicians", "name");
      dispatch(loadRanking(politicians));
    } catch (error) {
      console.log(error);
    }
  };
};

export const loadRanking = (politicians: Array<Politician>) => ({
  type: types.loadRankigPoliticians,
  payload: politicians,
});

export const startCalculateRanking = (indicators: Indicators, id: string) => {
  return async (dispatch: any, getState: any) => {
    const { settings } = getState().global_settings;
    const percentil_Indicators = calculateRanking(indicators, settings);
    try {
      updateData("politicians", id, percentil_Indicators);
      dispatch(updateRanking());
      showAlert("Ranking Actualizado", "El Ranking ha sido actualizado de forma correcta", "success");
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateRanking = () => ({
  type: types.rankingUpdate,
});
