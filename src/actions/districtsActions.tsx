import { types } from "../types/types";
import { District } from '../interfaces/districtsInterfaces';
import { addData, deleteData, loadData, updateData } from "../helpers/firebaseMethods"
import { finishLoading, startLoading } from "./globalActions";
import { showAlert } from "../helpers/messagesNotifications";

export const startLoadDistricts = () =>{
    return async (dispatch:any)=>{
        try {
            const districts = await loadData('districts' , 'id_district');
            dispatch(loadDistricts(districts));
        } catch (error) {
            console.log(error);
        }
    }
}

export const loadDistricts = (districts:Array<District>) =>({
    type:types.districtsLoad,
    payload:districts
})

export const startNewDistrict = (district:District) =>{
    return async (dispatch:any)=>{
        dispatch(startLoading());
        try {
           const {id} = await addData('districts',district);
           district.id = id;
           dispatch(addDistrict(district));
           showAlert('Registro Guardado',
                  'El registro ha sido guardado de forma correcta',
                  'success'
                 );
        } catch (error) {
            console.log(error);
        }  
        dispatch(finishLoading());
    }
}

export const addDistrict = (district:District) =>({
    type:types.districtAddNew,
    payload:district
});

export const startUpdatedDistrict = (district:District) =>{
    return async(dispatch:any , getState:any) =>{
        const {districtSelected} = getState().district;
        dispatch(startLoading());
        try {
            updateData('districts',districtSelected.id,district);
            district.id = districtSelected.id;
            dispatch(updateDistrict(district));
            showAlert('Registro Actualizado',
                  'El registro ha sido actualizado de forma correcta',
                  'success'
                 );
        } catch (error) {
            console.log(error);
        }
        dispatch(finishLoading());
    }
}
export const activeUpdate = (district:District) =>({
   type: types.districtActiveUpdated,
   payload:district
});

export const updateDistrict = (district:District) =>({
    type:types.districtUpdate,
    payload:district
});

export const showSections = (sections:string[]) =>({
    type:types.districtShowSections,
    payload:sections
})

export const resetStateDistricts = () =>({
    type: types.districtResetState
});

export const startDeleteDistrict = (id:string) =>{
    return async (dispatch:any)=>{
        try {
           await deleteData('districts',id);
           dispatch(deleteDistrict(id))
        } catch (error) {
            console.log(error);
        }
    }
}

export const deleteDistrict = (id:string) =>({
    type:types.districtDelete,
    payload:id
})