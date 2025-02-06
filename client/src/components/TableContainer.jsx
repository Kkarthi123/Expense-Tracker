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
import noDataImage from '../assets/no-data.png'
import Button from './Button';
import CircleLoader from './CircleLoader';
import axiosInstance from '../utils/axios-instance';
import { useToastContext } from '../context/ToastContext';


ModuleRegistry.registerModules([AllCommunityModule]);


const defaultColumnWidth = 250;


const TableContainer = () => {
  const [rowData, setRowData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isReportAPILoading, setISReportAPILoading] = useState(false)
  const [totalWidth, setTotalWidth] = useState(0);
  const [quickFilterText, setQuickFilterText] = useState('');
  const [totalAvailableTransactions, setTotalAvailableTransactions] = useState(0)
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

  const {showToast} = useToastContext();

  
  useEffect(() => {
    getReportData()
  }, [dateConfig]);


  //getting all data
  const getReportData = async()=>{
    setISReportAPILoading(true)
    let tableData = await axiosInstance.get(`${import.meta.env.VITE_API_BASE_URL}/api/transactions/getAll`, {withCredentials: true, params:{...dateConfig}});
    if(tableData){
      setRowData(tableData.data.allTransactions);
      setTotalAvailableTransactions(tableData.data.totalDataCount)
      setTotalWidth(columnConfig.length * defaultColumnWidth);
      setISReportAPILoading(false)
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
    onClose();
    setISReportAPILoading(true)
    let newTransaction;
    if(mode.isEditMode){
      newTransaction = await axiosInstance.put(`${import.meta.env.VITE_API_BASE_URL}/api/transactions/update/${mode.id} `,  {...transactionData}, {withCredentials: true});
    }else{
      newTransaction = await axiosInstance.post(`${import.meta.env.VITE_API_BASE_URL}/api/transactions/add`,  {...transactionData}, {withCredentials: true});
    }

    if(newTransaction.data?.status == 1){
      await getReportData()
      showToast(newTransaction.data?.message)
    }else{
      showToast(newTransaction.data?.message)
      setISReportAPILoading(false)
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
     setISReportAPILoading(true)

      selectionData = selectionData.map((item)=> item.data._id)
      let {data} = await axiosInstance.post(`${import.meta.env.VITE_API_BASE_URL}/api/transactions/delete`,  {transactionIds: selectionData}, {withCredentials: true});

      if(data?.status == 1){
        
        await getReportData();
        showToast(data?.message)
      }else{
        showToast(data?.message)
        setISReportAPILoading(true)
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
          totalAvailableTransactions == 0 ? (
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
              <div className="ag-theme-material bg-[#e4ebf0] rounded-[12px] p-[10px] relative" style={{ height: (rowData.length) > 15 ? "80vh" : "auto" }}>
                {isReportAPILoading && <div className='absolute top-0 left-0 z-[3] w-full h-full flex place-items-center justify-center bg-[#ffffffb3] text-lg'>Loading<i className="fa  animate-spin fa-spinner duration-1000 text-[20px] ml-2"></i></div>}
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
