import * as XLSX from "xlsx";
import { saveAs } from 'file-saver'

const exportToXlsx = (data)=>{
    if(data){
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(data); 


        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");


        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const blob = new Blob([excelBuffer], { type: "application/octet-stream" });

        saveAs(blob, "Transaction.xlsx");
    }
}


export {exportToXlsx}