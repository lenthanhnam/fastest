import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseconnect';

const DSmon = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all'); // State để lưu danh mục được chọn
  const [categories, setCategories] = useState(['all']); // State để lưu danh sách danh mục

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const itemsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Dữ liệu từ Firestore:", itemsData);
        setItems(itemsData);
        
        // Lấy danh sách danh mục duy nhất từ dữ liệu
        const uniqueCategories = ['all', ...new Set(itemsData.map(item => item.category))];
        setCategories(uniqueCategories);
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Lọc sản phẩm theo danh mục được chọn
  const filteredItems = selectedCategory === 'all' 
    ? items 
    : items.filter(item => item.category === selectedCategory);

  if (loading) {
    return <div className="text-center text-gray-500 mt-6">Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-6">Lỗi: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Danh sách món ăn</h1>

      {/* Phần danh mục */}
      <div className="flex justify-center mb-6">
        <div className="flex flex-wrap gap-3">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full font-medium text-sm transition-colors duration-300 
                ${selectedCategory === category 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              {category === 'all' ? 'Tất cả' : category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Phần danh sách sản phẩm */}
      {filteredItems.length === 0 ? (
        <p className="text-center text-gray-500">Không có sản phẩm trong danh mục này.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredItems.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md p-3 transition-transform transform hover:scale-105 hover:shadow-lg"
            >
              {item.imageURL && (
                <img
                  src={item.imageURL}
                  alt={item.title}
                  className="w-full h-32 object-cover rounded-t-lg mb-2"
                />
              )}
              <h2 className="text-lg font-semibold text-gray-800 mb-1">{item.title || 'Không có tiêu đề'}</h2>
              <p className="text-gray-600 text-sm mb-1">
                <span className="font-medium">Calories:</span> {item.calories || 'N/A'}
              </p>
              <p className="text-gray-600 text-sm mb-1">
                <span className="font-medium">Category:</span> {item.category || 'N/A'}
              </p>
              <p className="text-gray-600 text-sm mb-1">
                <span className="font-medium">Price:</span> {item.price || 'N/A'}
              </p>
              <p className="text-gray-600 text-sm">
                <span className="font-medium">Quantity:</span> {item.quantity || 'N/A'}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DSmon;