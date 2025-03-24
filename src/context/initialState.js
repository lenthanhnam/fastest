// import { fetchUser } from "../utils/fetchLocalStorage"


// const userInfo = fetchUser();
// export const initialState = {
//     user: userInfo,
// }

import { fetchUser } from "../utils/fetchLocalStorage";

export const initialState = {
  user: fetchUser(), // Sẽ là null nếu không có dữ liệu
};