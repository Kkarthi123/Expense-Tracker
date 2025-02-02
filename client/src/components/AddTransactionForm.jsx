import React, {useEffect, useState} from 'react';
import Datepicker from "react-tailwindcss-datepicker";
import { TransactionCategories, TransactionType } from '../config/constants';


const AddTransactionForm = ({onSubmit, onClose, formData=null}) => {

    const [type, setType] = useState(TransactionType.Expenses);
    const [amount, setAmount] = useState(1);
    const [description, setDescription] = useState('');
    const [paymentMode, setPaymentMode] = useState(0);
    const [category, setCategory] = useState(TransactionCategories[0].name)
    const [data, setDate] = useState({ 
        startDate: new Date(), 
        endDate: new Date()
    });
    const [isEditMode, setIsEditmode] = useState(false)

    useEffect(()=>{
        if(formData){
            let {type, amount, description, category, paymentMode, date} = formData;
            setType(type);
            setAmount(amount);
            setDescription(description);
            setCategory(category);
            setPaymentMode(paymentMode);
            setDate({
                startDate: date,
                endDate: date
            })
            setIsEditmode(true)
        }
    },[])


    const addTransaction = (e) => {
        e.preventDefault();
        let transaction = {
            type: type,
            amount: amount,
            description: description,
            paymentMode: paymentMode,
            category: category,
            date: new Date(data.startDate).toISOString()
        }
        onSubmit(transaction, (isEditMode) ? {isEditMode, id: formData._id}:'');
    }


  return (
      <form onSubmit={(e)=>addTransaction(e)}>
          <div className='bg-white rounded-md p-5 min-w-[550px] relative'>
            <div className='absolute right-4 top-4 text-gray-400 hover:text-gray-500 cursor-pointer text-lg' onClick={onClose}>
                <i className="fa-solid fa-xmark"></i>
            </div>
            <div className='text-lg font-medium'>
                <span>New Transaction</span>
            </div>
            <div className='pt-6 px-2'>
                <div className="flex flex-wrap pb-4">
                    <div className="flex items-center me-4 mr-10 cursor-pointer">
                        <input id="expense" type="radio" value={TransactionType.Expenses} name="type" className="w-4 h-4  accent-red-600 cursor-pointer" checked={type == TransactionType.Expenses} onChange={(e)=>setType(e.target.value)}/>
                        <label htmlFor="expense" className="pl-2 text-sm font-medium cursor-pointer">Expense</label>
                    </div>
                    <div className="flex items-center me-4 cursor-pointer">
                        <input id="income" type="radio" value={TransactionType.Income} name="type" className="w-4 h-4 accent-green-600 cursor-pointer" checked={type == TransactionType.Income} onChange={(e)=>setType(e.target.value)} />
                        <label htmlFor="income" className="pl-2 text-sm font-medium cursor-pointer">Income</label>
                    </div>
                </div>
                <div className='py-3 flex justify-between place-items-center'>
                    <div className=''>
                        <label htmlFor="amount" className="block mb-2 text-[15px] font-semibold text-gray-600"><i className="fa-solid fa-sack-dollar mr-2"></i>Amount:</label>
                        <input type="number" id="amount" onChange={(e)=>setAmount(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg block w-full p-2.5 outline-none" value={amount} placeholder="Amount" min="1" required/>
                    </div>
                    <div className='width-full'>
                         <label htmlFor="countries" className="block mb-2 text-[15px] font-semibold text-gray-600"><i className="fa-solid fa-list mr-2"></i>Category:</label>
                        <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 outline-none w-[240px]" required onChange={(e)=> setCategory(e.target.value)} value={category}>
                            {
                                TransactionCategories.map((category) => (
                                    <option key={category.id} value={category.name}>{category.name}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>
                
                <div className='py-3'>
                    <label htmlFor="description" className="block mb-2 text-[15px]  font-semibold text-gray-600"><i className="fa-solid fa-list mr-2"></i>Description:</label>
                    <input type="text" id="description" value={description}  onChange={(e)=>setDescription(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg block w-full p-2.5 outline-none" placeholder="Description" required />
                </div>
                <div className='py-3'>
                    <label htmlFor="description" className="block mb-2 text-[15px]  font-semibold text-gray-600"><i className="fa-solid fa-calendar-days mr-2"></i>Date:</label>
                    <Datepicker 
                    inputClassName="border relative transition-all duration-300 py-2 pl-4 pr-[40px] w-full border-gray-300 outline-none rounded-md text-sm cursor-pointer bg-gray-50"
                    toggleClassName = "hidden"
                    value={data}
                    useRange={false}
                    asSingle={true}
                    popoverDirection="up"
                    onChange={newValue => setDate(newValue)} 
                    displayFormat="DD/MM/YYYY" 
                    maxDate={new Date()}
                    required={true}
                    primaryColor={"indigo"}
                    />
                </div>
                <div className='py-3'>
                    <div className='text-[15px]  font-semibold py-1 pb-2.5'><i className="fa-regular fa-credit-card mr-2"></i>Payment Mode:</div>
                    <div className="flex flex-wrap">
                        <div className="flex items-center me-4 mr-10 cursor-pointer">
                            <input id="cash" type="radio" value={2} name="payment-mode" className="w-4 h-4  cursor-pointer" checked={paymentMode == 2} onChange={(e)=>setPaymentMode(e.target.value)}/>
                            <label htmlFor="cash" className="pl-2 text-sm font-medium cursor-pointer">Cash / Digital</label>
                        </div>
                        <div className="flex items-center me-4 mr-10 cursor-pointer">
                            <input id="credit" type="radio" value={0} name="payment-mode" className="w-4 h-4  cursor-pointer" checked={paymentMode == 0} onChange={(e)=>setPaymentMode(e.target.value)}/>
                            <label htmlFor="credit" className="pl-2 text-sm font-medium cursor-pointer">Credit</label>
                        </div>
                        <div className="flex items-center me-4 cursor-pointer">
                            <input id="debit" type="radio" value={1} name="payment-mode" className="w-4 h-4 cursor-pointer" checked={paymentMode == 1} onChange={(e)=>setPaymentMode(e.target.value)}/>
                            <label htmlFor="debit" className="pl-2 text-sm font-medium cursor-pointer">Debit</label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="pt-7 text-right">
             <button className="py-[4px] px-[14px] bg-[#249a50] text-white rounded-md hover:bg-green-700" type='submit'>Submit</button>
             <button className="py-[4px] px-[14px] border-gray-300 border rounded-md ml-4 hover:bg-gray-100" onClick={onClose}>Cancel</button>
            </div>
         </div>
      </form>
  )
}

export default AddTransactionForm