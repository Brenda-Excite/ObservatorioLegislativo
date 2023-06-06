import { types } from "../types/types";

 const startLoading = () => ({
    type: types.uiStartLoading,
 });
 
const finishLoading = () => ({
   type: types.uiFinishLoading,
 });

export {
    startLoading,
    finishLoading
}


 