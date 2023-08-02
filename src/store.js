import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import podcastReducer from "./slices/podcastSlice";
export default configureStore({
  reducer: {
    user: userReducer,
    podcasts: podcastReducer,
  },
});




// position: absolute;
//   top: 270px;
//   left: 20px;  
//   font-size: 75px;
//   text-shadow: 2px 2px 3px ;
//   color: var(--white);
//   font-weight: bold;
//   z-index: 1000;