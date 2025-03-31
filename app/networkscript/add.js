"use client";
import React, { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import Cookies from 'js-cookie';
import { uploadScript } from './api.js';
const AddButton = () => {
    const accessToken = Cookies.get('accessToken');
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        vendor: '',
        model: '',
        software_vers: '',
        service_type: '',
        action_group: '',
        tpl_file: null // เปลี่ยนจาก tpl_file เป็น uploade
    });

    // ฟังก์ชันสำหรับอัพเดตค่าของฟอร์ม
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // ฟังก์ชันสำหรับการจัดการไฟล์อัพโหลด
    const handleFileChange = (e) => {
        const file = e.target.files[0]; // รับไฟล์ที่เลือก

        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                const base64String = reader.result.split(',')[1]; // ข้อมูลที่อ่านจากไฟล์ในรูปแบบ Base64 String

                // เก็บ Base64 String ใน formData
                setFormData((prevData) => ({
                    ...prevData,
                    tpl_file: base64String, // เก็บเป็น Base64 String
                }));
            };

            reader.readAsDataURL(file); // อ่านไฟล์เป็น Data URL (Base64)
        }
    };






    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = await uploadScript(formData);

        if (result.success) {
            alert('Data saved successfully');
            setShowForm(false);
        } else {
            alert(`Failed to save data: ${result.message}`);
        }
    };


    useEffect(() => {
        const dataGrid = document.querySelector('.MuiDataGrid-root');
        if (showForm) {
            document.body.style.overflow = 'hidden';
            if (dataGrid) {
                dataGrid.style.visibility = 'hidden';
            }
        } else {
            document.body.style.overflow = 'auto';
            if (dataGrid) {
                dataGrid.style.visibility = 'visible';
            }
        }
    }, [showForm]);




    return (
        <div >
            {/* ปุ่ม Add */}
            <button
                className="absolute top-3 right-6 bg-gradient-to-r from-green-400 to-green-600 text-white flex items-cenetr justify-center rounded-2xl px-6 py-3 hover:scale-105 focus:outline-none shadow-xl transform transition-all duration-300"
                onClick={() => setShowForm(true)} // เปิดฟอร์มเมื่อคลิก
            >
                <FaPlus className="h-4 w-4 mr-2" />
                <span className="text-sm font-semibold">Add Script</span>
            </button>

            {/* Modal ฟอร์มที่จะแสดงขึ้นมา */}
            {showForm && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-4xl relative mt-20">
                        <h2 className="text-2xl font-extrabold text-center mb-6 text-gray-700">Add New Script</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-600">Title</label>
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                        placeholder="Enter title"
                                        required
                                    />
                                </div>

                                {/* Dropdown for Vendor */}
                                <div>
                                    <label htmlFor="vendor" className="block text-sm font-medium text-gray-600">Vendor</label>
                                    <select
                                        id="vendor"
                                        name="vendor"
                                        value={formData.vendor}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                        required
                                    >
                                        <option value="">Select Vendor</option>
                                        <option value="huawei">huawei</option>
                                        <option value="juniper">juniper</option>
                                    </select>
                                </div>

                                {/* Dropdown for Service Type */}
                                <div>
                                    <label htmlFor="service_type" className="block text-sm font-medium text-gray-600">Service Type</label>
                                    <select
                                        id="service_type"
                                        name="service_type"
                                        value={formData.service_type}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                        required
                                    >
                                        <option value="">Select Service Type</option>
                                        <option value="tcc">tcc</option>
                                        <option value="inet">inet</option>
                                        <option value="ccc">ccc</option>
                                        <option value="no">no</option>
                                    </select>
                                </div>

                                {/* Dropdown for Action Group */}
                                <div>
                                    <label htmlFor="action_group" className="block text-sm font-medium text-gray-600">Action Group</label>
                                    <select
                                        id="action_group"
                                        name="action_group"
                                        value={formData.action_group}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                        required
                                    >
                                        <option value="">Select Action Group</option>
                                        <option value="policer">policer</option>
                                        <option value="shaping">shaping</option>
                                        <option value="both">both</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="model" className="block text-sm font-medium text-gray-600">Model</label>
                                    <input
                                        type="text"
                                        id="model"
                                        name="model"
                                        value={formData.model}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                        placeholder="Enter model"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="software_vers" className="block text-sm font-medium text-gray-600">Software Version</label>
                                    <input
                                        type="text"
                                        id="software_vers"
                                        name="software_vers"
                                        value={formData.software_vers}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                        placeholder="Enter software version"
                                        required
                                    />
                                </div>

                                {/* อัพโหลดไฟล์ */}
                                <div>
                                    <label htmlFor="uploade" className="block text-sm font-medium text-gray-600">Upload File</label>
                                    <input
                                        type="file"
                                        id="uploade"
                                        name="uploade"
                                        onChange={handleFileChange} // เพิ่มการจัดการไฟล์
                                        className="w-60 bg-gray-400 px-4 py-2 mt-1 border-2 border-gray-500 rounded-md hover:bg-gray-500 hover:border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"

                                        required
                                    />
                                </div>

                            </div>
                            <div className="flex justify-between mt-6">
                                <button
                                    type="submit"
                                    className="bg-green-500 text-white px-6 py-2 rounded-xl hover:bg-green-600 focus:outline-none transition duration-300"
                                >
                                    Save
                                </button>
                            </div>
                        </form>

                        <button
                            type="button"
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 hover:bg-gray-200 p-2 rounded-full transition duration-300 w-10"
                            onClick={() => setShowForm(false)}
                        >
                            <span className="font-bold text-xl">X</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddButton;
