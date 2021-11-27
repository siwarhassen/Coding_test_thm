import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: {},
  errors: '',
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    findUserById:
        (state, action) => action.payload,
    updateUser(state, action) {
      const { payload } = action;
      console.log(payload);
      state.user = payload;
    },

    setErrors(state, action) {
      return action.payload;
    },
  },

});

export const { findUserById, setErrors } = userSlice.actions;
export const fetchUser = () => async (dispatch) => {
  /* const config = {
        headers: {
            "Content-Type":"appliation/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`
        }
    } */
  axios.get('http://localhost:3002/user/getuserbyId/1')
    .then((response) => {
      dispatch(findUserById(response.data));
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const selectUser = (state) => [state.user, state.user.errors];
export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
