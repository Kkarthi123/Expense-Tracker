import React, {useState} from 'react';
import DropDown from './DropDown';
import Button from './Button';
import Datepicker from "react-tailwindcss-datepicker";
import { ExportType } from '../config/constants';


const exportDrodownlist = [{name: "CSV", iconClass:"fa-solid fa-file-csv", value: ExportType.csv},{name: "XLS", iconClass:"fa-solid fa-file-excel", value:ExportType.xlsx}]

const TableHeaderActions = ({setQuickFilterText, quickFilterText, exportItemCallback, dateConfig ,datePickerCallback, buttonConfig}) => {


  return (
    <div className='flex justify-between items-center mb-8 flex-wrap gap-y-6'>
        <div className='flex gap-x-3'>
             <div className='relative border border-gray-300 rounded-md p-1.5'>
                <input type='text' placeholder='Search Tranactions' onChange={(e) => setQuickFilterText(e.target.value)}  className=' text-sm outline-none min-w-64 mr-1' value={quickFilterText}/>
                {quickFilterText && <i title='Clear All' className='fa-solid fa-xmark text-gray-400 mr-1 cursor-pointer hover:text-gray-500' onClick={()=>setQuickFilterText('')} ></i>}
             </div>
             <div>
                 <Datepicker 
                  inputClassName="border relative transition-all duration-300 py-2 pl-4 pr-[40px] w-full border-gray-300 outline-none rounded-md text-sm cursor-pointer bg-gray-50"
                  value={dateConfig} 
                  onChange={newValue => datePickerCallback(newValue)} 
                  showShortcuts={true} 
                  separator="to" 
                  showFooter={true} 
                  displayFormat="DD/MM/YYYY" 
                  startFrom={new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1)} 
                  maxDate={new Date()}
                  primaryColor={"indigo"}
                />
             </div>
        </div>
        <div className='flex justify-center items-center gap-x-3'>
            <div className=''>
              <Button buttonName={"Add"} buttonTooltip={"Add tranactions"} customClass={"add-transaction-btn"} iconClass={"fa-solid fa-plus"} isDisabled={buttonConfig.addBtn.isDisabled} onButtonClick={buttonConfig.addBtn.action}/>
            </div>
            <div className=''>
              <Button buttonName={"Edit"} buttonTooltip={"Edit tranactions"} customClass={"edit-transaction-btn"} iconClass={"fa-solid fa-pen"} isDisabled={buttonConfig.editBtn.isDisabled} onButtonClick={buttonConfig.editBtn.action}/>
            </div>
            <div className=''>
              <Button buttonName={"Delete"} buttonTooltip={"Delete tranactions"} customClass={"delete-transaction-btn"} iconClass={"fa-solid fa-trash-can"} isDisabled={buttonConfig.deleteBtn.isDisabled} onButtonClick={buttonConfig.deleteBtn.action}/>
            </div>
            <DropDown iconClass={"fa-solid fa-download"}  drodDownList={exportDrodownlist} customClass={"exp-tracker-export-btn"} itemCallback={exportItemCallback} buttonTooltip={"Export as CSV or XlS"}/>
        </div>
    </div>
  ) 
}

export default TableHeaderActions