import React, { use, useEffect, useState } from 'react'
import { IoFastFood } from 'react-icons/io5'
import { categories } from '../utils/data'
import { motion } from 'framer-motion'
import { collection, db, getDocs } from '../firebaseconnect'
import RowContainer from './RowContainer'

const MenuContainer = () => {
    const[filter, setFilter] = useState('chicken')
    useEffect(() => {
        
    }, [filter])

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
        <section className='w-full my-3' id="menu">
            <div className="flex flex-col w-full items-center justify-between">
                <p className="relative text-2xl text-headingColor font-semibold capitalize
before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-
bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all
ease-in-out duration-100 mr-auto"
                >
                    Our Hot Dishes
                </p>
            </div>
            <div className='w-full flex items-center justify-start lg:justify-center gap-8 py-6
overflow-x-scroll scrollbar-none'>
                {categories && categories.map(category => (
                    <motion.div whileTap={{ scale: 0.7 }} onClick={() => setFilter(category.urlParamName)} className={`group ${filter===category.urlParamName?'bg-red-500':'bg-card'} w-24 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 items-center justify-center duration-150 transition-all ease-in-out hover:bg-red-500`}>
                        <div className={`w-10 h-10 rounded-full ${filter===category.urlParamName?'bg-card':'bg-red-500'} group-hover:bg-card flex items-center justify-center`}>
                            <IoFastFood className={`${filter===category.urlParamName?'text-textColor':'text-card'} group-hover:text-textColor`}></IoFastFood>
                        </div>
                        <p className={` text-sm ${filter===category.urlParamName?'text-card':'text-textColor'} group-hover:text-card`}>{category.name}</p>
                    </motion.div>
                ))}
            </div>
            <RowContainer flag={false}
          data={foodItems?.filter(n => n.category === filter)} />
        </section>
    )
}

export default MenuContainer
