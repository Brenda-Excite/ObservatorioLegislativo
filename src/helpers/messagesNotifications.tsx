import { store } from "react-notifications-component";
export const showAlert = (title:string,message:string,type:'success' | 'danger' | 'info' | 'default' | 'warning' | undefined) =>{
    store.addNotification({
        title,
        message,
        type,
        insert:'top',
        container:'top-right',
        animationIn: ['animate__animated", "animate__fadeIn'],
        animationOut: ['animate__animated", "animate__fadeOut'],
        dismiss: {
          duration: 5000,
          onScreen: true
        }
      });
}
