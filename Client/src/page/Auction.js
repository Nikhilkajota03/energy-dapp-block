import Logout from "../Logout";
import React, { useEffect, useState } from "react";
import Formau from "../components/Formau";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import UpdateForm2 from "../components/UpdateForm2";
import { useSelector } from "react-redux";

const Auction = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updlist, setUpdateList] = useState(false);

  const [status, setStatus] = useState(false);
  const [order, setOrder] = useState([]);
  const [currBid, setcurrBid] = useState("");

  const navigate = useNavigate();

  const { user } = useSelector((state) => state.users); // Extracting user from the Redux state
  const { walletAdd } = useSelector((state) => state.wallet); // Extracting wallet address

  const orders = async () => {
    try {
      const allorders = await axios.get(
        "http://localhost:9000/api/auct/auction"
      );

      setOrder(allorders.data);
      // console.log(allorders.data)
    } catch (error) {
      console.log(error);
    }
  };

  const bid = async (bidAmount, orderId, bidderWallet, ownerwallet) => {
    if (ownerwallet === walletAdd) {
      message.error("owner can not Bid ");
    } else {
      try {
        const res = await axios.post("http://localhost:9000/api/auct/bid", {
          bidAmount,
          orderId,
          bidderWallet,
        });
        
        message.success("Bid Placed successfully");
        setcurrBid("");
        // console.log(currBid);
        orders();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const deleteitem = async (id) => {
    console.log(id);

    try {
      const dlt = await axios.delete(
        `http://localhost:9000/api/auct/delete/${id}`,
        { withCredentials: true }
      );

      message.success("deleted successfully");
    } catch (error) {
      message.error("something went wrong");
    }
  };

  useEffect(() => {
    orders();
  }, [deleteitem]);

  return (
    <>
      <div className="bg-green-900 bg-gradient-to-b from-gray-900 via-gray-900 to-green-800 flex flex-col gap-10 items-center bottom-0 leading-5 h-[100vh] w-full overflow-hidden">
        <div className="bg-gray-200 p-4 mt-[4rem] right-0  rounded-lg shadow-md h-18px">
          <p>User : {user ? user : "Please log in first"}</p>
          <p>Wallet: {walletAdd ? walletAdd : "Please log in first"}</p>
        </div>

        <div className="text-yellow-300 text-4xl mt-[1rem] font-bold">
          Auction
        </div>
        <div className="flex gap-5">
          <a
            class="group relative inline-flex items-center overflow-hidden rounded bg-green-700 px-8 py-3 text-white focus:outline-none focus:ring active:bg-indigo-500"
            onClick={() =>{

              if(user){
                setStatus(true)
              }else{
                 message.error("log in first")
                
              }
              
             
            }
            }
          >
        
            Add Orders
          </a>

          <a class="group relative inline-flex items-center overflow-hidden rounded bg-green-700 px-8 py-3 text-white focus:outline-none focus:ring active:bg-indigo-500">
        

            <Link to={"/auctTra"}>See transactions</Link>
          </a>
        </div>

        {status && <Formau setStatus={setStatus} />}
        {updlist ? (
          <UpdateForm2 data={selectedOrder} setUpdateList={setUpdateList} />
        ) : null}

        <div className="md:px-32 py-7 w-full">
          <div className="shadow overflow-hidden rounded-2xl border-b border-gray-200 max-h-[45vh] overflow-y-auto">
            {/* <div className="max-h-[45vh] overflow-y-auto"> */}
            <table className="min-w-full bg-white">
              <thead className="bg-gray-800 text-white">
                <th className="w-1/8 sm:w-1/12 text-center py-3 px-4 uppercase font-semibold text-sm">
                  Owner
                </th>
                <th className="w-1/4 sm:w-1/2 text-center py-3 px-4 uppercase font-semibold text-sm">
                  Wallet Address
                </th>
                <th className="w-1/8 sm:w-1/12 text-center py-3 px-4 uppercase font-semibold text-sm">
                  Pincode
                </th>
                <th className="w-1/8 sm:w-1/12 text-center py-3 px-4 uppercase font-semibold text-sm">
                  Unit (kwh)
                </th>
                <th className="w-1/8 sm:w-1/12 text-center py-3 px-4 uppercase font-semibold text-sm">
                  minPrice
                </th>
                <th className="w-1/8 sm:w-1/12 text-center py-3 px-4 uppercase font-semibold text-sm">
                  HighestBid
                </th>
                <th className="w-1/8 sm:w-1/12 text-center py-3 px-4 uppercase font-semibold text-sm">
                  Bid
                </th>
                <th className="w-1/8 sm:w-1/12 text-center py-3 px-4 uppercase font-semibold text-sm">
                  Auction Status
                </th>
                <th className="w-1/8 sm:w-1/12 text-center py-3 px-4 uppercase font-semibold text-sm">
                  update
                </th>
                <th className="w-1/8 sm:w-1/12 text-center py-3 px-4 uppercase font-semibold text-sm">
                  Delete
                </th>
              </thead>

              <tbody className="text-gray-700">
                {order.map((value, index) => (
                  <tr key={index}>
                    <td className="w-1/8 text-center py-3 px-4">
                      {value.user}
                    </td>
                    <td className="w-1/8 text-left py-3 px-4">
                      {value.walletaddre}
                    </td>
                    <td className="w-1/8 text-center py-3 px-4">
                      <a className="hover:text-blue-500" href="tel:622322662">
                        {value.pincode}
                      </a>
                    </td>
                    <td className="w-1/8 text-center py-3 px-4">
                      {value.maxunit}
                    </td>
                    <td className="w-1/8 text-center py-3 px-4">
                      {value.minprice}
                    </td>

                    <td className="text-center">
                      <button
                        type="button"
                        className={
                          value.status === "CLOSED"
                            ? "focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                            : "text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded text-sm px-4 py-1.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
                        }
                        disabled={value.status === "CLOSED"}
                      >
                        {value.status === "OPEN" ? (
                          <Link
                            to={`/auctionbids/${value._id}/${value.walletaddre}/${index}/${value.user}/${value.pincode}`}
                          >
                            Bids
                          </Link>
                        ) : (
                          " Bids"
                        )}
                      </button>
                    </td>

                    <td>
                      <div className="relative flex h-10 w-[12rem]">


                        <button
                          onClick={() => {
                            
             if(user){

                            if (currBid > value.minprice || currBid === value.minprice ) {
                              bid(
                                currBid,
                                value._id,
                                walletAdd,
                                value.walletaddre
                              );
                            } else {
                              message.error("bid lesser than min price");
                            }

                          }else{
                            message.error("Please login in first")
                          }

                          }}
                          className={`!absolute right-1 top-1 z-10 select-none rounded ${
                            value.status == "CLOSED"
                              ? "bg-red-600 cursor-not-allowed opacity-70"
                              : "bg-green-700"
                          } py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none peer-placeholder-shown:pointer-events-none peer-placeholder-shown:bg-blue-gray-500 peer-placeholder-shown:opacity-50 peer-placeholder-shown:shadow-none`}
                          type="button"
                          disabled={value.status == "CLOSED"}
                          data-ripple-light="true"
                        >
                          Bid
                        </button>




                        <input
                          onChange={(e) => setcurrBid(e.target.value)}
                          type="email"
                          className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 pr-20 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                          placeholder=" "
                          required
                        />
                        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                          Enter Bid Price
                        </label>
                      </div>
                    </td>

                    <td className="text-center">
                      <button
                        type="button"
                        className={
                          value.status == "CLOSED"
                            ? "focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                            : "text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded text-sm px-4 py-1.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800 "
                        }
                        disabled={value.status == "CLOSED"}
                      >
                        {value.status}
                      </button>
                    </td>

                    <td className="w-1/6  py-3 px-4 text-center">
                      <a
                        onClick={() => {


                          if(value.status==="CLOSED"){
                            message.error("Already sold")
                            return;
                          }

                          if (value.walletaddre === walletAdd) {
                            setSelectedOrder(value);
                            setUpdateList(true);
                          } else {
                            message.error("you are not the owner");
                          }
                        }}
                      >
                        <svg
                          class="w-6 h-6 text-gray-800 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 16"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                          />
                        </svg>
                      </a>
                    </td>

                    <td
                      className="w-1/6  text-center"
                      onClick={() => {
                        if (value.walletaddre === walletAdd) {
                          deleteitem(value._id);
                        } else {
                          message.error("you are not the owner");
                        }
                      }}
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
      {/* </div> */}
    </>
  );
};

export default Auction;
