
"use client";
import React, { useState, useEffect } from "react";

import { DataGrid } from "@mui/x-data-grid";
import SearchFilter from "./searchfilter";
import { Edit, Delete, InsertDriveFile } from "@mui/icons-material";
import { fetchLogsData, deleteScriptData, updateScriptData } from "./api";
import { IconButton, Dialog, Paper, DialogActions, DialogContent, DialogTitle, TextField, Button, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import AddButton from "./add";


export default function ApiDataGrid() {
    
    const [fileName, setFileName] = useState('');
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [open, setOpen] = useState(false);
    const [editRow, setEditRow] = useState(null);
    const [openFileDialog, setOpenFileDialog] = useState(false);
    const [fileContent, setFileContent] = useState("");
    const [formData, setFormData] = useState({
        title: '',
        vendor: '',
        model: '',
        software_vers: '',
        service_type: '',
        action_group: ''
    });
    const asciiToString = (asciiData) => {
        
        const text = new TextDecoder().decode(new Uint8Array(asciiData));

        
        const isBase64 = (str) => {
            const base64Pattern = /^[A-Za-z0-9+/=]+$/;
            return base64Pattern.test(str);
        };

        
        if (isBase64(text)) {
            console.log("Data is Base64.");

            
            const decodedText = atob(text);

            console.log("Decoded Base64 to text:", decodedText);
            return decodedText;
        } else {
            console.log("Data is not Base64.");
            return text; 
        }
    };

    const handleFile = (rowData) => {
        const fileContent = asciiToString(rowData.tpl_file.data);
        setFileContent(fileContent);
        setOpenFileDialog(true);
    };

    const fetchData = async () => {
        try {
            const result = await fetchLogsData();
            setData(result);
            setFilteredData(result);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };


    useEffect(() => {

        fetchData();
    }, []);

    const columns = [
        { field: "templateId", headerName: "Template ID", width: 150 },
        { field: "title", headerName: "Title", width: 250 },
        { field: "vendor", headerName: "Vendor", width: 150 },
        { field: "model", headerName: "Model", width: 200 },
        { field: "software_vers", headerName: "Software Version", width: 250 },
        { field: "service_type", headerName: "Service Type", width: 200 },
        { field: "action_group", headerName: "Action Group", width: 200 },
        {
            field: "tpl_file",
            headerName: "Script File",
            width: 150,
            renderCell: (params) => {

                const fileContent = asciiToString(params.row.tpl_file.data);
                return (
                    <div style={{
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "center",
                        gap: "10px",
                        height: "100%",
                    }}>
                        <IconButton
                            onClick={() => handleFile(params.row)}
                            color="secondary"
                            sx={{
                                backgroundColor: "#FFCC00",
                                borderRadius: "50%",
                                padding: "12px",
                                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                                "&:hover": {
                                    backgroundColor: "#FFB700",
                                    boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.2)",
                                    transform: "scale(1.1)",
                                },
                                height: "40px",
                                width: "40px",
                                transition: "all 0.3s ease",
                            }}
                        >
                            <InsertDriveFile sx={{ fontSize: "24px", color: "#fff" }} />
                        </IconButton>
                    </div>
                );
            }
        },

        {
            field: "option",
            headerName: "Option",
            width: 250,
            renderCell: (params) => {
                return (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "start",
                            alignItems: "center",
                            gap: "10px",
                            height: "100%",
                        }}
                    >

                        <IconButton
                            onClick={() => handleEdit(params.row)}
                            color="primary"
                            sx={{
                                backgroundColor: "#80C7FF",
                                borderRadius: "50%",
                                padding: "12px",
                                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                                "&:hover": {
                                    backgroundColor: "#4DA6FF",
                                    boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.2)",
                                    transform: "scale(1.1)",
                                },
                                height: "40px",
                                width: "40px",
                                transition: "all 0.3s ease",
                            }}
                        >
                            <Edit sx={{ fontSize: "24px", color: "#fff" }} />
                        </IconButton>


                        <IconButton
                            onClick={() => handleDelete(params.row)}
                            color="secondary"
                            sx={{
                                backgroundColor: "#FF9999",
                                borderRadius: "50%",
                                padding: "12px",
                                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                                "&:hover": {
                                    backgroundColor: "#FF6666",
                                    boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.2)",
                                    transform: "scale(1.1)",
                                },
                                height: "40px",
                                width: "40px",
                                transition: "all 0.3s ease",
                            }}
                        >
                            <Delete sx={{ fontSize: "24px", color: "#fff" }} />
                        </IconButton>



                    </div>
                );
            }
        }

    ];

    const handleFilter = ({ vendor, technicalService, action, title, model, softwareVersion }) => {
        const filtered = data.filter((item) => {
            return (
                (vendor ? item.vendor === vendor : true) &&
                (technicalService ? item.service_type === technicalService : true) &&
                (action ? item.action_group === action : true) &&
                (title ? item.title.toLowerCase().includes(title.toLowerCase()) : true) &&
                (model ? item.model.toLowerCase().includes(model.toLowerCase()) : true) &&
                (softwareVersion ? item.software_vers.toLowerCase().includes(softwareVersion.toLowerCase()) : true)
            );
        });
        setFilteredData(filtered);
    };


    const handleEdit = (row) => {
        setEditRow(row);
        setFormData({
            title: row.title,
            vendor: row.vendor,
            model: row.model,
            software_vers: row.software_vers,
            service_type: row.service_type,
            action_group: row.action_group,
            tpl_file: row.tpl_file ? row.tpl_file.data : null,
        });
        setOpen(true);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0]; // รับไฟล์ที่เลือก

        if (file) {
            setFileName(file.name);
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

    const handleDelete = async (row) => {
        try {
            await deleteScriptData(row.templateId);
            fetchData();
        } catch (error) {
            console.error("Error deleting template:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleDropdownChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            await updateScriptData(editRow.templateId, formData);
            setOpen(false);
            fetchData();
        } catch (error) {
            console.error("Error updating template:", error);
        }
    };


    const handleClose = () => {
        setOpen(false);
    };
    const handleCloseFileDialog = () => {
        setOpenFileDialog(false);
    };



    return (
        <div>
            <AddButton />
            <SearchFilter onFilter={handleFilter} />
            <div style={{ height: 529, width: "100%" }}>
                <DataGrid
                    rows={filteredData}
                    columns={columns}
                    pageSize={5}
                    getRowId={(row) => row.templateId}
                    disableColumnFilter
                    sx={{
                        '.MuiDataGrid-columnHeaderTitle': {
                            fontWeight: 800,
                            color: 'black',
                        },
                    }}
                />
            </div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Template</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Vendor</InputLabel>
                        <Select
                            name="vendor"
                            value={formData.vendor}
                            onChange={handleDropdownChange}
                            fullWidth
                        >
                            <MenuItem value="huawei">huawei</MenuItem>
                            <MenuItem value="juniper">juniper</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        label="Model"
                        name="model"
                        value={formData.model}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Software Version"
                        name="software_vers"
                        value={formData.software_vers}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Service Type</InputLabel>
                        <Select
                            name="service_type"
                            value={formData.service_type}
                            onChange={handleDropdownChange}
                            fullWidth
                        >
                            <MenuItem value="tcc">tcc</MenuItem>
                            <MenuItem value="inet">inet</MenuItem>
                            <MenuItem value="ccc">ccc</MenuItem>
                            <MenuItem value="no">no</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Action Group</InputLabel>
                        <Select
                            name="action_group"
                            value={formData.action_group}
                            onChange={handleDropdownChange}
                            fullWidth
                        >
                            <MenuItem value="policer">policer</MenuItem>
                            <MenuItem value="shaping">shaping</MenuItem>
                            <MenuItem value="both">both</MenuItem>
                        </Select>
                    </FormControl>

                    
                    <div>
                        <label htmlFor="upload" className="text-sm text-gray-600 block">Upload File</label>
                        <div>
                            <label htmlFor="upload" className="w-40 mt-2 text-sm font-semibold text-gray-800 block cursor-pointer bg-blue-200 hover:bg-blue-400 py-2 px-4 rounded-md text-center border-2 border-blue-500">
                                Select File
                            </label>
                            <input
                                type="file"
                                id="upload"
                                name="upload"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </div>

                        {fileName && (
                            <div className="mt-2 text-sm text-gray-700">
                                Selected File: <span className="font-semibold">{fileName}</span>
                            </div>
                        )}
                    </div>





                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={handleSubmit} color="primary">Save</Button>
                </DialogActions>
            </Dialog>


            <Dialog
                open={openFileDialog}
                onClose={handleCloseFileDialog}
                maxWidth="lg"
                fullWidth
                sx={{
                    zIndex: (theme) => theme.zIndex.modal + 1,
                }}
            >
                <DialogTitle>File Content</DialogTitle>
                <DialogContent>
                    <Paper sx={{
                        padding: "30px",
                        maxHeight: "600px",
                        overflow: "auto",
                        backgroundColor: "#f4f4f4",
                    }}>
                        <pre style={{
                            fontFamily: "monospace",
                            whiteSpace: "pre-wrap",
                            wordWrap: "break-word",
                            lineHeight: "1.8",
                            fontSize: "16px",
                            color: "#333",
                            margin: "0",
                        }}>
                            {fileContent}
                        </pre>
                    </Paper>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseFileDialog} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>




        </div>
    );
}
