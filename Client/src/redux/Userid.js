import { createSlice } from '@reduxjs/toolkit'

export const useridSlice = createSlice({

   name: 'userid',

  initialState: {
    userid:null
},

   reducers:{
       setUserid(state,action){
           state.userid = action.payload;
       },
   }
}

)

export const {setUserid} = useridSlice.actions;

export default useridSlice.reducer