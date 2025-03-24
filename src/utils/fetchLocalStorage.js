// export const fetchUser = () => {
//   const userInfo =
//     localStorage.getItem('user') !== 'undefined'
//       ? JSON.parse(localStorage.getItem('user'))
//       : localStorage.clear();

//   return userInfo;
// };


export const fetchUser = () => {
  try {
    const userData = localStorage.getItem('user');
    console.log('userData from localStorage:', userData); // Kiểm tra giá trị thô
    if (userData && userData !== 'undefined') {
      const parsedData = JSON.parse(userData);
      console.log('Parsed user data:', parsedData); // Kiểm tra sau khi parse
      return parsedData;
    }
    return null;
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu người dùng từ localStorage:', error);
    return null;
  }
};