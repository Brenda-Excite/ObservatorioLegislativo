import {useState} from 'react';
import { getFileUploadStorage } from "../helpers/firebaseMethods";

export const useGetImage = () =>{
    const [photo, setPhoto] = useState<string>("");

      const getImagePath = async(path:string) =>{
          try {
            const image:any = await getFileUploadStorage(path);
            setPhoto(image); 
          } catch (error) {
            console.log(error);
          }
      }

      return{
          photo,
          getImagePath
      }

}