import React,{useState} from 'react'
import axios from 'axios';
import { useSelector } from "react-redux";
import { CloseCircleOutlined } from "@ant-design/icons";
import { message } from 'antd';

const Form = ({data, setUpdateList}) => {

    // console.log(props.data)

     
  const {walletAdd} = useSelector((state)=> state.wallet);

  // console.log(walletAdd)

//   const { user } = useSelector((state) => state.users);
 
  const [id , setid]=useState(data._id)

 
  
 const [name,setName]= useState(data.user);
  const [walletAddress , setwalletAddress] = useState(data.walletAdd);
  const [pincode , setPincode] = useState(data.pincode);
  const [minprice , setPrice] = useState(data.minprice);
  const [maxunit , setMaxunit] = useState(data.maxunit);



const update = async (e) => {

    e.preventDefault();
    const data = {name , walletAddress, pincode , minprice , maxunit};

   try{

      const upd = await axios.put(`http://localhost:9000/api/auct/upd/${id}`,data, {withCredentials:true})

      if(upd){
         message.success("Auction updated");
         setUpdateList(false)
      }

      setUpdateList(false)

   
     

   }catch(error){
       console.log(error);
   }

}



  return (
    <>
    {/* <div className="absolute top-[5rem] right-1rem w-[30%] z-[1000]"> */}

    <div className=" absolute top-[5rem] w-[30%] z-[1000] "> 
        
    <form class="w-full max-w-sm mx-auto  bg-white p-8 rounded-md shadow-md">
    <h1>update form</h1>
        <button onClick={()=>  setUpdateList(false) } className='p-5'>
        <CloseCircleOutlined />
        Cancel
      </button>

      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="name">name</label>
        <input class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          type="text" id="name" name="name" value={name}/>
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Wallet Address</label>
        <input class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          type="text" id="name" name="name" value={walletAdd}/>
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Pincode</label>
        
        <input class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          type="text" id="pincode" name="pincode" placeholder="Pincode" value={pincode}     onChange={(e)=>setPincode(e.target.value)}/>
      </div>
      
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Max Unit (kwh)</label>
        <input class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          type="text" id="password" name="password" placeholder="Max Unit (kwh)"  value={maxunit} onChange={(e)=>setMaxunit(e.target.value)}  />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="confirm-password">Min Price</label>
        <input class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          type="text" id="confirm-password" name="confirm-password" placeholder="Price" value={minprice}    onChange={(e)=>setPrice(e.target.value)} />
      </div>
      
      <button
        class="w-full bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
        type="submit"  onClick={update} > update Order</button>
 
    </form>
    </div>
    </>
  )
}

export default Form