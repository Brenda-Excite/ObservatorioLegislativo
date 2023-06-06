import { addData, deleteData, loadData, updateData } from "../helpers/firebaseMethods"
import { showAlert } from "../helpers/messagesNotifications"
import { Legislature } from "../interfaces/legislaturesInterfaces"
import { types } from "../types/types"

export const startLoadLegislatures = () =>{
  return async (dispatch:any)=>{
      try {
       const legislatures = await loadData('legislatures','name'); 
       dispatch(loadLegislatures(legislatures))        
      } catch (error) {
          console.log(error);
      }
  }
}

export const loadLegislatures = (legislatures:Array<Legislature>) =>({
  type: types.legislaturesLoad,
  payload: legislatures
});

export const startNewLegislature = (data:Legislature) =>{
    return async ( dispatch:any )=>{
        try {
          const {id} = await addData('legislatures' , data );
          data.id = id;
          dispatch(addLegislature(data)); 
          showAlert('Registro guardado',
                  'El registro ha sido guardado de forma correcta',
                  'success'
                 );
        } catch (error) {
            console.log(error);
        }
        
    }
}

export const addLegislature = (legislature:Legislature) =>({
  type:types.legislatureAddNew,
  payload:legislature
});

export const startUpdatedLegislature = (data:Legislature) =>{
    return async (dispatch:any , getState:any)=>{
      const { legislatureSelected } = getState().legislature;
      try {
        await updateData('legislatures',legislatureSelected.id , data );
         data.id = legislatureSelected.id;
        dispatch(updateLegislature(data));
        showAlert('Registro actualizado',
                  'El registro ha sido actualizado de forma correcta',
                  'success'
                 );
      } catch (error) {
        console.log(error);
      }
    }
}
export const activeUpdated = (legislature:Legislature) =>({
  type:types.legislaturesActiveUpdated,
  payload:legislature
});

export const updateLegislature = (legislature:Legislature) =>({
  type:types.legislatureUpdate,
  payload:legislature
});
export const startDeletingLegislatures = (id:string) =>{
  return async (dispatch:any) =>{
    try {
      await deleteData('legislatures',id);
      dispatch(deleteLegislature(id));
    } catch (error) {
      console.log(error);
    }
  }
}

export const deleteLegislature = (id:string) =>({
  type:types.legislatureDelete,
  payload:id
});
