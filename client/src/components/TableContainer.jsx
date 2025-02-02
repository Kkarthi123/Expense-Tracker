import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import axios from 'axios'
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule ,ModuleRegistry } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-theme-material.css';
import TableHeaderActions from './TableHeaderActions';
import columnConfig from '../config/columnConfig';
import Modal from './Modal';
import AddTransactionForm from './AddTransactionForm';
import { ExportType, PaymentMode } from '../config/constants';
import { exportToXlsx } from '../utils/export-to-xlsx';
import CircleLoader from './circleLoader';
import noDataImage from '../assets/no-data.png'
import Button from './Button';
ModuleRegistry.registerModules([AllCommunityModule]);


const defaultColumnWidth = 250;


const TableContainer = () => {
  const [rowData, setRowData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalWidth, setTotalWidth] = useState(0);
  const [quickFilterText, setQuickFilterText] = useState('');
  const [isShowModal, setIsShowModal] = useState(false);
  const [dateConfig, setDateConfig] = useState({
    startDate: new Date(new Date().setDate(new Date().getDate() - 30)),
    endDate: new Date()
  })
  const [selectedRowData, setSelectedRowData] = useState(null)
  const [buttonConfig, setButtonConfig] = useState({
    addBtn: {
      isDisabled : false,
      isShow: true,
      action: ()=>{
        setIsShowModal(true)
      }
    },
    editBtn:{
      isDisabled : true,
      isShow: true,
      action: onEditTransaction
    },
    deleteBtn:{
      isDisabled : true,
      isShow: true,
      action: onDeleteTransaction
    }
  })

  const gridRef = useRef(null); 

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 150,
      width: defaultColumnWidth,
      maxWidth: 300,
      filter: true,
      filterParams: {
        buttons: ["clear"],
        closeOnApply: true,
      },
    };
  }, []);

  const rowSelection = useMemo(() => {
    return { mode: "multiRow" };
  }, []);

  
  useEffect(() => {
    getReportData()
  }, [dateConfig]);


  //getting all data
  const getReportData = async()=>{
    let tableData = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/transactions/getAll`, {withCredentials: true, params:{...dateConfig}});
    if(tableData){
      setRowData(tableData.data);
      setTotalWidth(columnConfig.length * defaultColumnWidth);
      setTimeout(()=>{
        setLoading(false);
      }, 1000)
    }
  }

  //close popup
  const onClose = ()=>{
    setSelectedRowData(null)
    setIsShowModal(false)
  }

  //export 
  const exportItemCallback = (value)=>{
    if(value == ExportType.csv){
      gridRef.current.api.exportDataAsCsv()
    }

    if(value == ExportType.xlsx){
      let allVisibleData = gridRef.current.api.getRenderedNodes();

      let transformedData = allVisibleData.map(({data})=>{
        return {
          Category: data['category'],
          Date: new Date(data['date']).toDateString(),
          Description: data['description'],
          "Payment Mode": PaymentMode[data['paymentMode']],
          Amount: data['amount'],
          Type:  data['type'] == 0 ? 'Income' : 'Expenses'  
        }
      })

      exportToXlsx(transformedData)
    }
  }

  //date picker callback
  const datePickerCallback = (newValue)=>{
    setDateConfig(newValue);
  }

  //add new 
  const addNewTransaction = async (transactionData, mode)=>{
  
    let newTransaction;
    if(mode.isEditMode){
      newTransaction = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/transactions/update/${mode.id} `,  {...transactionData}, {withCredentials: true});
    }else{
      newTransaction = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/transactions/add`,  {...transactionData}, {withCredentials: true});
    }

    if(newTransaction.data){
      onClose();
      getReportData()
    }

    
  }

  //on selection changes
  const onSelectionChanged = useCallback((event) => {
    const rowSelctionCount = event.api.getSelectedNodes().length;
    if(rowSelctionCount == 1){
      setButtonConfig({
        ...buttonConfig, 
        editBtn: { ...buttonConfig.editBtn, isDisabled: false },
        deleteBtn: { ...buttonConfig.deleteBtn, isDisabled: false },
      })
    }else if(rowSelctionCount > 1){
      setButtonConfig({
        ...buttonConfig, 
        editBtn: { ...buttonConfig.editBtn, isDisabled: true },
        deleteBtn: { ...buttonConfig.deleteBtn, isDisabled: false},
      })
    }else{
      setButtonConfig({
        ...buttonConfig, 
        editBtn: { ...buttonConfig.editBtn, isDisabled: true },
        deleteBtn: { ...buttonConfig.deleteBtn, isDisabled: true},
      })
    }

  }, []);


  //edit tranactions
  function onEditTransaction (){
    let selectionData = gridRef.current.api.getSelectedNodes();

    if(selectionData.length == 1){
      setSelectedRowData(selectionData[0].data)
      setIsShowModal(true)
    }
  }


  //delete transaction
  async function onDeleteTransaction(){
    let selectionData = gridRef.current.api.getSelectedNodes();

    if(selectionData.length > 0){
      selectionData = selectionData.map((item)=> item.data._id)
      let deletedData = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/transactions/delete`,  {transactionIds: selectionData}, {withCredentials: true});

      if(deletedData.data.status == 1){
        getReportData()
      }
    }
  }

 
  return (
    <>

      {
        loading ? (
          <div className='flex justify-center items-center' style={{ padding: '20px', textAlign: 'center',  height: '75vh'}}>
            <div className='flex flex-col place-items-center'>
              <CircleLoader />
              <h2 className='mb-5 text-lg font-medium text-gray-500 mt-5'>Fetching Your Transactions</h2>
            </div>
          </div>
        ) : (
          rowData.length == 0 ? (
            <div className='flex justify-center items-center h-[75vh] flex-col'>
               <div>
                 <img  src={noDataImage} alt='No data'  className='m-w-[100%]'/>
               </div>
               <div className='mt-3 text-center'>
                 <div className='font-medium text-gray-500'>No Transactions Found! <span className='text-[#13bd87]'>Start Track your Money Now🚀</span></div>
                 <Button iconRTL={true} buttonName={"Add"} buttonTooltip={"Add tranactions"} customClass={"mt-3 bg-[#1da75c] text-white w-[max-content] hover:bg-[#179b53]"} iconClass={"fa-solid fa-plus"} isDisabled={buttonConfig.addBtn.isDisabled} onButtonClick={buttonConfig.addBtn.action}/>
               </div>
            </div>
          ):(
           <>
              <div className='exp-trackker-table-header-actions'>
                <TableHeaderActions setQuickFilterText={setQuickFilterText} quickFilterText={quickFilterText} exportItemCallback={exportItemCallback} buttonConfig={buttonConfig} datePickerCallback={datePickerCallback} dateConfig={dateConfig}/>
              </div>
              <div className="ag-theme-material bg-[#e4ebf0] rounded-[12px] p-[10px]" style={{ height: (rowData.length) > 15 ? "80vh" : "auto" }}>
                <AgGridReact
                  ref={gridRef}
                  columnDefs={columnConfig}
                  defaultColDef={defaultColDef}
                  rowData={rowData}
                  quickFilterText={quickFilterText}
                  cacheQuickFilter={true}
                  rowSelection={rowSelection}
                  domLayout= {rowData.length > 15 ? "normal" : "autoHeight"}
                  animateRows={true}
                  pagination={true}
                  paginationPageSize={20}
                  onSelectionChanged={onSelectionChanged}
                />
              </div>
           </>
          )
        )
      }

      {isShowModal && 
        <Modal>
          <AddTransactionForm onClose={onClose} onSubmit={addNewTransaction} formData={selectedRowData}/>
        </Modal>
      }
    </>
  );
}

export default TableContainer;
