import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { CloseCircleOutlined } from "@ant-design/icons";
import { message } from "antd";

const Form = ({data , setUpdateList}) => {
  const { walletAdd } = useSelector((state) => state.wallet);

  // console.log(props);

  // console.log(props.setUpdateList.setUpdateList(false))

  //   const { user } = useSelector((state) => state.users);

  const [id, setid] = useState(data._id);

  const [name, setName] = useState(data.user);
  const [walletAddress, setwalletAddress] = useState(data.walletAdd);
  const [pincode, setPincode] = useState(data.pincode);
  const [price, setPrice] = useState(data.price);
  const [maxunit, setMaxunit] = useState(data.maxunit);

  

  const update = async (e) => {
    e.preventDefault();
    const data = { name, walletAddress, pincode, price, maxunit };

    

    try {
        const upd = await axios.put(
          `http://localhost:9000/api/mak/upd/${id}`,
          data,
          { withCredentials: true }
        );
        console.log("Response from server:", upd);
      
        if (upd.data.message === "successfully updated") {
                message.success("Update successful");

                setUpdateList(false); 
          
        } else {
          message.error("Update not successful:");
        }
      } catch (error) {
        console.error("Error updating:", error);
      }

  };


  return (
    <>
 

      <div className=" absolute top-[5rem] w-[30%] z-[1000] ">
        <form class="w-full max-w-sm mx-auto  bg-white p-8 rounded-md shadow-md">
          <h1>update form</h1>
          <button   onClick={ ()=> setUpdateList(false) }  className="p-5">
            <CloseCircleOutlined />
            Cancel
          </button>

          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="name"
            >
              name
            </label>
            <input
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="text"
              id="name"
              name="name"
              value={name}
            />
          </div>

          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="name"
            >
              Wallet Address
            </label>
            <input
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="text"
              id="name"
              name="name"
              value={walletAdd}
            />
          </div>

          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="email"
            >
              Pincode
            </label>

            <input
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="text"
              id="pincode"
              name="pincode"
              placeholder="Pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
            />
          </div>

          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="password"
            >
              Max Unit (kwh)
            </label>
            <input
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="text"
              id="password"
              name="password"
              placeholder="Max Unit (kwh)"
              value={maxunit}
              onChange={(e) => setMaxunit(e.target.value)}
            />
          </div>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="confirm-password"
            >
              Price
            </label>
            <input
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="text"
              id="confirm-password"
              name="confirm-password"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <button
            class="w-full bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
            type="submit"
            onClick={update}
          >
            {" "}
            update Order
          </button>

         
        </form>
      </div>
    </>
  );
};

export default Form;
