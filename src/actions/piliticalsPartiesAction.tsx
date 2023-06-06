import { addData, deleteData, loadData, updateData, uploadFileStorage } from "../helpers/firebaseMethods"
import { showAlert } from "../helpers/messagesNotifications";
import { PoliticalParty } from "../interfaces/politicalsPartiesInterfaces";
import { types } from "../types/types";
import { finishLoading, startLoading } from "./globalActions";

export const startLoadPoliticalsParties = () =>{
    return async (dispatch:any)=>{
        try {
            const politicals_parties = await loadData('political-parties','name');
            dispatch(loadPoliticalsParties(politicals_parties))
        } catch (error) {
            console.log(error);
        }
    }
}

export const loadPoliticalsParties = (politicals_parties:Array<PoliticalParty>) =>({
    type:types.politicalPartiesLoad,
    payload:politicals_parties
});

export const startNewPoliticalParty = (data:PoliticalParty , pictures:Array<File>) =>{
    return async (dispatch:any) =>{
        dispatch(startLoading());
        let image_path = '';
        if(pictures.length > 0){
            image_path =  await uploadFileStorage(pictures,'produccion/political-parties');
        }
        data.image_path = image_path;
        try {
            const {id} = await addData('political-parties' , data );
            data.id = id;
            dispatch(addPoliticalParty(data));
            showAlert('Registro agregado',
                      'El registro ha sido guardado de forma correcta',
                      'success'
                      )
        } catch (error) {
            console.log(error);
        }

        dispatch(finishLoading());


    }
}

export const addPoliticalParty = (political:PoliticalParty) =>({
    type:types.politicalPartyAddNew,
    payload:political
})

export const startUpdatedPoliticalParty = (data:PoliticalParty ,pictures:Array<File>) =>{
    return async (dispatch:any ,  getState:any ) =>{
        const { politicalSelected } = getState().political;
        dispatch(startLoading());
        if(pictures.length > 0){
            data.image_path =  await uploadFileStorage(pictures,'produccion/political-parties');
        }else{
            data.image_path = politicalSelected.image_path;
        }
        try {
        await updateData('political-parties',politicalSelected.id , data )
        data.id = politicalSelected.id;
        dispatch(updatePoliticalParty(data));
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

export const activeUpdated = (political:PoliticalParty) =>({
    type:types.politicalPartiesActiveUpdated,
    payload:political
});

export const updatePoliticalParty = (political:PoliticalParty) =>({
    type:types.politicalPartyUpdate,
    payload:political
})

export const startDeletePoliticalParty = (id:string) =>{
    return async (dispatch:any)=>{
    await deleteData('political-parties',id);
    dispatch(deletePoliticalParty(id));
    }
}

export const deletePoliticalParty = (id:string) =>({
    type:types.politicalPartyDelete,
    payload:id
})