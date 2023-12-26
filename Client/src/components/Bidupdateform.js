import React,{useState} from 'react'
import axios from 'axios';
import { useSelector } from "react-redux";
import { CloseCircleOutlined } from "@ant-design/icons";
import { message } from 'antd';

const Form = ({data, Auctionid,setUpdateList}) => {

  

    

 
  const {walletAdd} = useSelector((state)=> state.wallet);


 
  const [id , setid]=useState(data._id);   //bid id

 
  

  const [bidAmount , setbidAmount] = useState(data.bidAmount);
 


 


const update = async (e) => {

    e.preventDefault();

    console.log(bidAmount)
   

   try{

      const upd = await axios.put(`http://localhost:9000/api/auct/updbid/${Auctionid}`, {bidAmount,id},{withCredentials:true})

      if(upd){
        message.success("Bid updated")
        setUpdateList(false);
      }

     

      console.log(upd)
     

   }catch(error){
       console.log(error);
   }

}






  return (
    <>
   

    <div className=" absolute top-[5rem] w-[30%] z-[1000] "> 
        
    <form class="w-full max-w-sm mx-auto  bg-white p-8 rounded-md shadow-md">
    <h1>update form</h1>
        <button className='p-5'>
        <CloseCircleOutlined />
        Cancel
      </button>

      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="confirm-password">Price</label>
        <input class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          type="text" id="confirm-password" name="confirm-password" placeholder="Price" value={bidAmount}    onChange={(e)=>setbidAmount(e.target.value)} />
      </div>

      
      <button
        class="w-full bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
        type="submit"  onClick={update} > update Price</button>

     
        
    </form>
    </div>
    </>
  )
}

export default Form