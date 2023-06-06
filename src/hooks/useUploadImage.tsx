import { useState } from "react";

const useUploadImage = () => {
  const [pictures, setPictures] = useState<any>([]);

  const onDrop = (picture: any) => {
    setPictures(picture);
  };
  return {
    pictures,
    onDrop,
  };
};

export default useUploadImage;
