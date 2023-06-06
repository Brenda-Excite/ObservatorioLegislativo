import { useState } from "react";
import XLSX from "xlsx";

const useImportExcel = () => {
    const [dataList, setDataList] = useState([]);

    const loadExcel = (e: any) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = function (e: any) {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: "array" });
          const firstSheet = workbook.SheetNames[0];
          const elements: any = XLSX.utils.sheet_to_json(
            workbook.Sheets[firstSheet]
          );
          setDataList(elements);
        };
        reader.readAsArrayBuffer(file);
    };
    
      return {
        dataList,
        setDataList,
        loadExcel

      }
};

export default useImportExcel;