import React, { useState } from 'react'
import { MdFastfood, MdCloudUpload, MdDelete, MdFoodBank, MdAttachMoney } from 'react-icons/md';
import { categories } from '../utils/data';
import Loader from './Loader';
import { db } from '../firebaseconnect';
import { setDoc, doc } from 'firebase/firestore';
const CreateProduct = () => {
    //khai báo state
    const [title, setTitle] = useState('');
    const [calories, setCalories] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState(null);
    const [fields, setFields] = useState(true);
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);
    const [alertStatus, setAlertStatus] = useState('danger');

    const uploadImage = async (e) => {
        setIsLoading(true);
        const imageFile = e.target.files[0]; // Lấy file từ input

        // Kiểm tra nếu không có file
        if (!imageFile) {
            setIsLoading(false);
            return;
        }

        // Tạo FormData để gửi file
        const formData = new FormData();
        formData.append("file", imageFile);
        formData.append("upload_preset", "testCloud"); // Thay bằng upload preset của bạn

        try {
            // Gửi request POST lên Cloudinary
            const res = await fetch("https://api.cloudinary.com/v1_1/dqdmivvsq/image/upload", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            setIsLoading(false);

            if (data.secure_url) {
                console.log("Image URL:", data.secure_url);
                setImageUrl(data.secure_url); // Lưu URL ảnh để sử dụng
                setAlertStatus('success');
                setMessage('Image uploaded successfully');

            }
        } catch (error) {
            console.error("Upload failed:", error);
            setIsLoading(false);
            setMessage('Error when uploading, try again pls ');
            setAlertStatus('danger');

        }
     }
    const deleteImage = () => { }
    const saveDetails = async () => {
        setIsLoading(true);    
        try {
            if (!title || !calories || !imageUrl || !price || !category) {
                setMessage("Required fields cannot be empty");
                setFields(true);
                setAlertStatus("danger");
                setTimeout(() => {
                    setFields(false);
                    setIsLoading(false);
                }, 4000);
                return; // Dừng hàm nếu có lỗi
            }
    
            // Tạo object chứa dữ liệu
            const data = {
                id: `${Date.now()}`,
                title,
                imageURL: imageUrl,
                category,
                calories,
                quantity: 1,
                price,
            };
    
            // Lưu vào Firestore
            await setDoc(doc(db, "products", data.id), data);
    
            setMessage("Data saved successfully");
            setAlertStatus("success");
            setFields(true);
    
            setTimeout(() => {
                setFields(false);
            }, 4000);
    
            // Reset trạng thái form sau khi lưu thành công
            setTitle("");
            setImageUrl(null);
            setCategory("");
            setCalories("");
            setPrice("");
    
        } catch (error) {
            console.error("Error saving to Firestore:", error);
            setFields(true);
            setMessage("Error when uploading, try again pls ");
            setAlertStatus("danger");
            setTimeout(() => {
                setFields(false);
            }, 4000);
        } finally {
            setIsLoading(false); // Đảm bảo luôn tắt loading
        }
     }

    return (
        <div className='flex w-full min-h-screen items-center justify-center'>
            <div className="w-[90%] md:w-[75%] border-gray-300 rounded-lg p-4 items-center justify-center flex flex-col">
                {/* thông báo  */}
                {
                    fields && (
                        <p className={`w-full text-lg font-semibold text-center p-2  rounded-lg ${alertStatus === 'danger'
                            ? 'bg-red-400 text-red-800'
                            : 'bg-emerald-400 text-emerald-800'
                            }`}>
                            {message}
                        </p>
                    )
                }

                {/* tên sản phẩm  */}
                <div className="flex w-full py-2 border-b border-gray-300 items-center gap-2">
                    <MdFastfood className="text-xl text-gray-700" />
                    <input
                        type="text"
                        required
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder="Input the title of the product"
                        className="w-full h-full text-lg bg-transparent font-semibold placeholder:text-gray-300 outline-none border-none"
                    />
                </div>

                {/* loại sản phẩm  */}
                <div className="w-full">
                    <select onChange={e => setCategory(e.target.value)} className="outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer">
                        <option value="other" className="bg-white">
                            Select Category
                        </option>
                        {categories &&
                            categories.map(item => (
                                <option
                                    key={item.id}
                                    value={item.urlParamName}
                                    className="text-base border-0 outline-none capitalize bg-white text-headingColor"
                                >
                                    {item.name}
                                </option>
                            ))}

                    </select>
                </div>

                {/* hình ảnh  */}
                <div className="flex flex-col group w-full h-225 md:h-420 cursor-pointer border-2 border-groove border-gray-300 rounded-lg items-center justify-center">

                    {isLoading ? <Loader /> : <>
                        {!imageUrl ? <>
                            <label className="flex flex-col w-full h-full items-center justify-center cursor-pointer">
                                <div className="flex flex-col w-full h-full items-center justify-center gap-2">
                                    <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700" />
                                    <p className="text-gray-500 hover:text-gray-700">
                                        Click here to upload
                                    </p>
                                </div>
                                <input
                                    type="file"
                                    name="uploadImage"
                                    accept="image/*"
                                    onChange={uploadImage}
                                    className="w-0 h-0"
                                />

                            </label>
                        </> : <>
                            <div className="relative h-full">
                                <img
                                    src={imageUrl}
                                    alt="The one awaits for upload"
                                    className="w-full h-full object-cover"
                                />
                                <button
                                    type="button"
                                    className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out"
                                    onClick={deleteImage}
                                >
                                    <MdDelete className="text-white" />
                                </button>
                            </div>

                        </>}

                    </>}
                </div>

                {/* calories */}
                <div className="flex flex-col md:flex-row w-full items-center gap-3">
                    <div className="flex w-full py-2 border-b border-gray-300 items-enter gap-2">
                        <MdFoodBank className="text-gray-700 text-2xl" />
                        <input
                            type="text"
                            required
                            value={calories}
                            placeholder="Calories"
                            onChange={e => setCalories(e.target.value)}
                            className="w-full h-full text-lg bg-transparent font-semibold placeholder:text-gray-300 outline-none border-none"
                        />
                    </div>
                </div>

                {/* giá  */}
                <div className="flex flex-col md:flex-row w-full items-center gap-3">
                    <div className="flex w-full py-2 border-b border-gray-300 items-enter gap-2">
                        <MdAttachMoney className="text-gray-700 text-2xl" />

                        <input
                            type="text"
                            required
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                            placeholder="Price"
                            className="w-full h-full text-lg bg-transparent font-semibold placeholder:text-gray-300 outline-none border-none"
                        />
                    </div>
                </div>
                {/* nút save  */}
                <div className="flex w-full items-center">
                    <button
                        type="button"
                        className="w-full md:w-auto ml-0 md:ml-auto border-none outline-none px-12 py-2 text-white text-lg font-semibold bg-emerald-500 rounded-lg"
                        onClick={saveDetails}
                    >
                        Save
                    </button>
                </div>

            </div>
        </div>

    )
}

export default CreateProduct