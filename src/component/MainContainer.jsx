import React, { useEffect } from 'react'
import { HomeContainer } from './HomeContainer'
import { motion } from 'framer-motion'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import RowContainer from './RowContainer'
import MenuContainer from './MenuContainer'
import { db } from '../firebaseconnect'
import { collection, getDocs } from 'firebase/firestore'

export const MainContainer = () => {
  const [foodItems, setFoodItems] = React.useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products")); // Lấy dữ liệu từ Firestore
        const items = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setFoodItems(items);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className='w-full h-auto flex flex-col items-center justify-center'>
      <HomeContainer />
      <section className="w-full my-6">
        <div className="flex w-full items-center justify-between">
          <p className="relative text-2xl text-headingColor font-semibold capitalize
before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0
before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100"
          >
            Our fresh & healthy fruits
          </p>
          <div className="hidden md:flex gap-3 items-center">
            <motion.div whileTap={{ scale: 0.5 }} className="flex w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 transition-all duration100 ease-in-out hover:shadow-lg cursor-pointer items-center justify-center"><MdChevronLeft className="text-lg text-white" /></motion.div>
            <motion.div whileTap={{ scale: 0.5 }} className="flex w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 transition-all duration100 ease-in-out hover:shadow-lg cursor-pointer items-center justify-center"><MdChevronRight className="text-lg text-white" /></motion.div>
          </div>

        </div>
        <RowContainer flag={false}
          data={foodItems?.filter(n => n.category === "curry")} />
      </section>
      <MenuContainer />
    </div>
  )
}
