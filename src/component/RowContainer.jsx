import React from 'react'
import { MdShoppingBasket } from 'react-icons/md'
import { motion } from 'framer-motion'

const RowContainer = ({ flag, data }) => {
    console.log('test data', data);

    return (
        <div className={`w-full my-12 flex items-center gap-3 scroll-smooth  ${flag ? 'overflow-x-scroll scrollbar-none' : 'overflow-x-hidden flex-wrap justify-center'}`}>
            {data && data.length > 0 ? data.map(i => (
                <div className="w-full md:w-[350px] h-[225px] bg-cardOverlay shadow-md rounded-lg backdrop-blur-lg p-4">
                    <div className="flex w-full h-100 items-center justify-between">
                        <img
                            className="w-36 mt-4"
                            src={i.imageURL}
                            alt="Kem socola"
                        />
                        <motion.div
                            whileTap={{ scale: 0.7 }}
                            className="flex w-10 h-10 rounded-full bg-red-600 hover:shadow-lg cursor-pointer items-center justify-center"
                        >
                            <MdShoppingBasket className="text-white text-xl" />
                        </motion.div>
                    </div>

                    <div className="flex flex-col w-full items-end justify-end position-absolute">
                        <p className="text-base md:text-lg font-semibold text-textColor">
                            {i.title}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">{i.calories}</p>
                        <div className="flex items-center gap-4 mt-2">
                            <p className="text-lg font-semibold text-headingColor">
                                <span className="text-base text-red-500">$</span> {i.price}
                            </p>
                        </div>
                    </div>
                </div>
            )):null}
        </div>
    )
}

export default RowContainer
