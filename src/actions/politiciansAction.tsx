import { addData, deleteData, getDocumentById, loadData, updateData, uploadFileStorage } from '../helpers/firebaseMethods';
import { showAlert } from '../helpers/messagesNotifications';
import { Politician } from '../interfaces/politiciansInterface';
import { types } from '../types/types';
import { finishLoading, startLoading } from './globalActions';

export const startLoadPoliticians = () =>{
    return async (dispatch:any) =>{
       try {
           const politicians = await loadData('politicians','name');
            dispatch(loadPoliticians(politicians));
       } catch (error) {
           console.log(error);
       }
    }
}

export const startSearchPoliticians = (search:string) =>{
    return async(dispatch:any)=>{
        try {
           const politicians = await loadData('politicians');
           dispatch(loadPoliticians(politicians));
        } catch (error) {
            console.log(error);
        }
    }
}

export const loadPoliticians = (politicians:Array<Politician>) =>({
    type: types.politiciansLoad,
    payload:politicians
 });



export const startAddNewPolitician = (politician:Politician ,  politicianImage:Array<File> , politicianRadiography:Array<File>) =>{
    return async(dispatch:any)=>{
        dispatch(startLoading());
        let image_path = '';
        let radiography_path = '';
        if(politicianImage.length > 0){
            image_path =  await uploadFileStorage(politicianImage,'produccion/politicians');
        }
        if(politicianRadiography.length > 0){
            radiography_path =  await uploadFileStorage(politicianRadiography,'produccion/radiography');
        }
        politician.image_path = image_path;
        politician.radiography_path = radiography_path;
      try {
        const {id} = await addData('politicians' , politician );
        politician.id = id;
        dispatch(addPolitician(politician));
        showAlert('Registro guardado',
                  'El registro ha sido guardado de forma correcta',
                  'success'
                 );
      } catch (error) {
          console.log(error);
          showAlert('Error al guardar',
                  'El registro no se ha guardado de forma correcta , contacta al administrador',
                  'success'
                 );
      }
      dispatch(finishLoading());
    } 
}

export const addPolitician = (politician:Politician) =>({
    type: types.politicianAddNew,
    payload:politician
});

export const startUpdatePolitician = (politician:Politician , politicianImage:Array<File> , politicianRadiography:Array<File>) =>{
    return async (dispatch:any ,  getState:any) =>{
        const {politicianSelected:{id , image_path:img_path , radiography_path:radio_path}} = getState().politicians
        dispatch(startLoading());
        let image_path = img_path;
        let radiography_path = radio_path;
        if(politicianImage.length > 0){
            image_path =  await uploadFileStorage(politicianImage,'produccion/politicians');
        }
        if(politicianRadiography.length > 0){
            radiography_path =  await uploadFileStorage(politicianRadiography,'produccion/radiography');
        }
        politician.image_path = image_path;
        politician.radiography_path = radiography_path;
     try {
         await updateData('politicians',id , politician )
         politician.id = id;
         dispatch(updatePolitician(politician));
         showAlert('Registro actualizado',
                  'El registro ha sido actualizado de forma correcta',
                  'success'
                 );
     } catch (error) {
         console.log(error);
         showAlert('Error al actualizar',
                  'El registro no se ha actualizado de forma correcta , contacta al administrador',
                  'danger'
                 );
     }
     dispatch(finishLoading());
    }
}


export const activeUpdatePolitician = (politician:Politician) => ({
    type:types.politicianActiveUpdated,
    payload:politician
});

export const updatePolitician = (politician:Politician) =>({
    type:types.politicianUpdate,
    payload:politician
});

export const startDeletePolitician = (id:string) =>{
    return async (dispatch:any) =>{
        try {
           await deleteData('politicians',id);
           dispatch(deletePolitician(id))
        } catch (error) {
            
        }
    }
}

export const startLoadPoliticianById = (id:string) =>{
    return async (dispatch:any) =>{
        try {
          const politician:any = await getDocumentById('politicians',id);
          if(politician){
            dispatch(loadPoliticianById(politician))  
          }    
        } catch (error) {
         console.log(error);
        }
    }
}

export const loadPoliticianById = (politician:Politician) =>({
    type: types.politicianShow,
    payload:politician
});

export const deletePolitician = (id:string) =>({
    type:types.politicianDelete,
    payload:id
});

export const resetStatePoliticians = () =>({
   type:types.politicianResetState
});

export const startAddNewPoliticianExcel = (politician:any) =>{
    return async(dispatch:any)=>{
        dispatch(startLoading());
      try {
        const {id} = await addData('politicians' , politician );
        politician.id = id;
        dispatch(addPolitician(politician));
      } catch (error) {
          console.log(error);
          showAlert('Error al guardar',
                  'El registro no se ha guardado de forma correcta , contacta al administrador',
                  'success'
                 );
      }
      dispatch(finishLoading());
    } 
}