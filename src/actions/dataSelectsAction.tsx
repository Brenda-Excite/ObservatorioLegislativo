import { types } from "../types/types";
import { PoliticalParty } from "../interfaces/politicalsPartiesInterfaces";
import { District } from "../interfaces/districtsInterfaces";
import { loadDataSelects } from "../helpers/firebaseMethods";
import { Legislature } from "../interfaces/legislaturesInterfaces";
import { Commission } from "../interfaces/commissionsInterfaces";
import { Politician } from "../interfaces/politiciansInterface";

export const startLoadDataSelectPoliticalParties = () => {
  return async (dispatch: any) => {
    try {
      const politicalParties = await loadDataSelects("political-parties");
      dispatch(loadDataSelectPoliticalParties(politicalParties));
    } catch (error) {
      console.log(error);
    }
  };
};

export const loadDataSelectPoliticalParties = (
  politicalParties: Array<PoliticalParty>
) => ({
  type: types.dataSelectPoliticalParties,
  payload: politicalParties,
});

export const startLoadSelectDistricts = () => {
  return async (dispatch: any) => {
    try {
      const districts = await loadDataSelects("districts");
      dispatch(loadSelectDistricts(districts));
    } catch (error) {
        console.log(error);
    }
  };
};

export const loadSelectDistricts = (districts: Array<District>) => ({
  type: types.dataSelectDistricts,
  payload: districts,
});

export const startLoadSelectLegislatures = () =>{
    return async (dispatch:any)=>{
        try {
            const legislatures = await loadDataSelects("legislatures");
            dispatch(loadSelectLegislatures(legislatures));
        } catch (error) {
            console.log(error);
        }
    }
}

export const loadSelectLegislatures = (legislatures:Array<Legislature>) =>({
    type: types.dataSelectLegislatures,
    payload:legislatures
});

export const startLoadSelectCommissions = () =>{
  return async (dispatch:any)=>{
      try {
          const commissions = await loadDataSelects("commissions");
          dispatch(loadSelectCommissions(commissions));
      } catch (error) {
          console.log(error);
      }
  }
}

export const loadSelectCommissions = (commission:Array<Commission>) =>({
  type: types.dataSelectCommissions,
  payload:commission
});

export const startLoadSelectPoliticians = () =>{
  return async (dispatch:any)=>{
    try {
      const politicians = await loadDataSelects("politicians");
      dispatch(loadSelectPolitician(politicians));
    } catch (error) {
      console.log(error);
    }
  }
}

export const loadSelectPolitician = (politicians:Array<Politician>) =>({
  type: types.dataSelectPolitician,
  payload:politicians
});