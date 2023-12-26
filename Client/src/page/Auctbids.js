import Logout from "../Logout";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import Bidupdateform from "../components/Bidupdateform"

const Auctbids = () => {

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updlist, setUpdateList] = useState(false);


 
  var productid = useParams().id;
  const receiverwallet = useParams().walletAddress;
  const biditem = useParams().index;
  const bidowner = useParams().owner;

  const pincode = useParams().pincode;

  const [Auctid, setAuctid] = useState(productid);
  // console.log(Auctid)///

  const navigate = useNavigate();

  const [completedTransactions, setCompletedTransactions] = useState(() => {
    // Initialize from localStorage on component mount
    const storedData = localStorage.getItem("completedAucBid");
    return storedData ? JSON.parse(storedData) : [];
  });



  const [status, setStatus] = useState(false);
  const [bids, setBids] = useState([]);
  console.log(bids)

 

  const { user } = useSelector((state) => state.users); // Extracting user from the Redux state
  const { walletAdd } = useSelector((state) => state.wallet); // Extracting wallet address

  const getbids = async () => {
    

    try {
      const res = await axios.get(
        "http://localhost:9000/api/auct/bids/" + productid
      );

    

      setBids(res.data);
        
    } catch (error) {
      console.log(error);
    }
  };









  const AcceptBid = async (senderwallet, amount) => {

      
         if(walletAdd !== receiverwallet ){
          message.error("you are not the owner")
         } else{
               

    try {
      // Check if MetaMask is installed
      if (window.ethereum) {
        console.log("MetaMask is installed");
        // Request access to the user's Ethereum accounts
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log("Accounts:", accounts);

        // Set sender and receiver addresses
        const senderAddress = senderwallet;
        const receiverAddress = receiverwallet;

     


        await window.ethereum.request({
          method: "eth_sendTransaction",
          params: [
            {
              from: senderAddress,
              to: receiverAddress,
              value: amount.toString(), // Use the string representation
            },
          ],
        });

   

        setCompletedTransactions((prev) => [...prev, parseInt(biditem)]);

        setTimeout(() => {
          message.success("Transaction successful!");
        }, 10000);

        setTimeout(() => {
          navigate("/auction");
        }, 13000);


        setTimeout(()=>{
          Tranaction(senderwallet,receiverwallet,amount/10000000000000,pincode); 

          axios.put(`http://localhost:9000/api/auct/status/${productid}`)
    
        },10000)


      } else {
        console.error("MetaMask is not installed");
      }
    } catch (error) {
      console.error('Error handling "Buy" click:', error);
      // setTransactionStatus('failure');
    }
  }
  };

  
  const Tranaction = async (buyerWallet,  sellerWallet, price , pincode)=>{

    try {
     const res = axios.post("http://localhost:9000/api/auct/auctra",{buyerWallet,  sellerWallet, price , pincode} )


      if(res){
        message.success("Transaction saved")
      }


          // console.log("Transaction saved")
     
    } catch (error) {
       console.log("Trsansaction not saved")
    } 
 }


 const deleteitem = async (id)=>{
     

  try {

     const deleteitem = await axios.delete(`http://localhost:9000/api/auct/bidDel/${productid}/${id}`)
   
    
  } catch (error) {
     console.log(error);
  }

 }


 useEffect(() => {
  getbids();
}, [getbids]);




  return (
    <div className="bg-purple-900 bg-gradient-to-b from-gray-900 via-gray-900 to-purple-800 flex flex-col gap-10 items-center bottom-0 leading-5 h-[100vh] w-full overflow-hidden">
   
      <div className="bg-gray-200 p-4  right-0 mt-[4rem]  rounded-lg shadow-md h-18px">
      <p>User : {user ? user : "Please log in first"}</p>
          <p>Wallet: {walletAdd ? walletAdd : "Please log in first"}</p>
        </div>

     
      <div className="text-yellow-400 text-5xl  font-bold">Bids</div>

      <div className="bg-gray-200 p-4  right-0  rounded-lg shadow-md h-18px">
        <p>Owner name : {bidowner}</p>
        <p>Owner wallet : {receiverwallet}</p>
      </div>


       {updlist ? <Bidupdateform  data = {selectedOrder} Auctionid={Auctid} setUpdateList={setUpdateList} /> : null}





       <div className="md:px-32 py-7 w-full">
          <div className="shadow overflow-hidden rounded-2xl border-b border-gray-200 max-h-[45vh] overflow-y-auto">
            <table className="min-w-full bg-white">



            <thead className="bg-gray-800 text-white ">
              <tr>
             
                <th className="w-1/5 text-center py-3 px-4 uppercase font-semibold text-sm">
                  Wallet Address
                </th>
                <th className=" w-1/5 text-center py-3 px-4 uppercase font-semibold text-sm">
                  Offer Price
                </th>
                <th className="w-1/5 text-center py-3 px-4 uppercase font-semibold text-sm">
                  HighestBid
                </th>

                <th className="w-1/8 sm:w-1/12 text-center py-3 px-4 uppercase font-semibold text-sm">
                  update
                </th>
                <th className="w-1/8 sm:w-1/12 text-center py-3 px-4 uppercase font-semibold text-sm">
                  Delete
                </th>
              </tr>
            </thead>



            <tbody className="text-gray-700">

              {  bids.length===0 ? <div className="p-5 text-red">No Bid placed Till Now</div> :    bids.map((value, index) => (
                <tr key={index}>
                  <td className="w-1/9 text-center py-3 px-4">
                    {value.bidderwallet}
                  </td>
                  <td className="w-1/9 text-center py-3 px-4">
                    <a className="hover:text-blue-500" href="tel:622322662">
                      {value.bidAmount}
                    </a>
                  </td>
                  <td className="w-1/9 text-center">
                    <button
                      onClick={() =>
                        AcceptBid(value.bidderwallet, value.bidAmount* 10000000000000, index)
                      }
                      type="button"
                      class= { `${walletAdd === receiverwallet ? "text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 " : "focus:outline-none text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2 me-2  mt-1 dark:bg-red-600 dark:hover:bg-red-600 dark:focus:ring-red-900"} `}


                      disabled={ walletAdd !== receiverwallet }
                    >
                      Accept Offer
                    </button>
                  </td>

                  <td className="w-1/6 py-3 px-8 text-center">
  <a
    onClick={() => { 
      if (walletAdd === value.bidderwallet) {
        setSelectedOrder(value);
        setAuctid(productid);
        setUpdateList(true);
      } else {
        message.error("you are not the bidder");
      }
    }}
    className="flex items-center justify-center group relative inline-flex overflow-hidden rounded bg-green-700 px-4 py-2 text-white focus:outline-none focus:ring active:bg-indigo-500"
  >
    <svg
      className="w-6 h-6 text-gray-800 dark:text-white"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 18 16"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
      />
    </svg>
  </a>
</td>



                    <td
                      className="w-1/6  text-center"
                      onClick={() => {

                        if(walletAdd===value.bidderwallet){
                        deleteitem(value._id)
                        }else{
                          message.error("you are not the bidder")
                        }
                      }
                      
                      }
                    >
                      <DeleteOutlined />
                    </td>
                </tr>
              ))}


            </tbody>
          </table>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default Auctbids;
