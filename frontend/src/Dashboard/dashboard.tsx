import React, { useRef, useState } from 'react';
import { HiOutlinePlus, HiOutlineTable, HiOutlineClipboardList } from 'react-icons/hi';
import { foundItems } from '@/Home/Hero-Section/HeroSection';
import NavbarContainer from '@/Home/NavbarContainer';
import Navbar from '@/Home/Navbar';
import GlobalContainer from '@/Home/GlobalContainer';
import {
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { Card, CardContent } from '@/components/hero-section/Card';
import { Button } from '@/components/ui/button';
import {
    DialogTrigger,
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { FileIcon } from 'lucide-react';
import axios from 'axios';

const Dashboard = () => {
    const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
    const [items, setItems] = useState(foundItems);
    const [claims, setClaims] = useState([]);
    const [darkMode, setDarkMode] = useState(false);

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const userData = JSON.parse(localStorage.getItem("userData"));
    const [formData, setFormData] = useState({
        userId: userData.userId,
        itemName: '',
        description: '',
        dateReported: '',
        location: '',
        status: 'Pending'
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleAddItem = async () => {
        if (formData.itemName.trim()) {
            setItems([...items, { ...formData, file: selectedFile }]);
            setFormData({
                userId: formData.userId,
                itemName: '',
                description: '',
                dateReported: '',
                location: '',
                status: 'Pending'
            });
            setSelectedFile(null);
            setIsAddItemModalOpen(false);
        }

        const uploadFormData = new FormData();
        uploadFormData.append("userId", formData.userId);
        uploadFormData.append("itemName", formData.itemName);
        uploadFormData.append("description", formData.description);
        uploadFormData.append("dateReported", formData.dateReported);
        uploadFormData.append("location", formData.location);
        uploadFormData.append("status", formData.status);
        uploadFormData.append("file", selectedFile); // Make sure this is not null
        uploadFormData.forEach((value, key) => {
            console.log(`${key}:`, value);
        });

        try {
            const response = await axios.post("http://localhost:5086/api/item/saveItem", uploadFormData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            });
            
            console.log("Item uploaded:", response.data);
        } catch (error) {
            console.error("Upload failed:", error);
        }
    };


    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleBrowseClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    return (
        <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
            <NavbarContainer>
                <Navbar />
            </NavbarContainer>

            <GlobalContainer>
                <section className='py-7'>
                    <h1 className='text-2xl font-bold'>Dashboard</h1>
                </section>

                <Card className='bg-white shadow-lg rounded-lg p-6'>
                    <CardHeader className='mb-4'>
                        <CardTitle className='text-3xl font-bold'>Add Item</CardTitle>
                        <CardDescription className='text-lg'>
                            Enter the details for the new item you want to add.
                        </CardDescription>
                    </CardHeader>

                    <CardContent className='mb-6'>
                        <p className='text-xl font-bold'>
                            Please provide all necessary details below:
                        </p>
                    </CardContent>

                    <CardFooter className='flex justify-between items-center'>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className='font-bold bg-black text-white' variant='outline'>
                                    Add Item
                                </Button>
                            </DialogTrigger>

                            <DialogContent className='sm:max-w-[425px]'>
                                <DialogHeader>
                                    <DialogTitle>Add Item</DialogTitle>
                                    <DialogDescription>
                                        Fill in the item details and attach an image file.
                                    </DialogDescription>
                                </DialogHeader>

                                <div className='grid gap-4 py-4'>
                                    <div className='grid grid-cols-4 items-center gap-4'>
                                        <Label htmlFor='name' className='text-right'>
                                            Item Name
                                        </Label>
                                        <Input
                                            id='itemName'
                                            value={formData.itemName}
                                            onChange={handleInputChange}
                                            className='col-span-3'
                                        />
                                    </div>

                                    <div className='grid grid-cols-4 items-center gap-4'>
                                        <Label htmlFor='description' className='text-right'>
                                            Description
                                        </Label>
                                        <Input
                                            id='description'
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            className='col-span-3'
                                        />
                                    </div>

                                    <div className='grid grid-cols-4 items-center gap-4'>
                                        <Label htmlFor='date' className='text-right'>
                                            Date
                                        </Label>
                                        <Input
                                            id='dateReported'
                                            type='date'
                                            value={formData.dateReported}
                                            onChange={handleInputChange}
                                            className='col-span-3'
                                        />
                                    </div>

                                    <div className='grid grid-cols-4 items-center gap-4'>
                                        <Label htmlFor='location' className='text-right'>
                                            Location
                                        </Label>
                                        <Input
                                            id='location'
                                            value={formData.location}
                                            onChange={handleInputChange}
                                            className='col-span-3'
                                        />
                                    </div>

                                    {/* Drag-and-drop zone */}
                                    <div
                                        className='border-2 border-dashed border-gray-300 rounded-lg flex flex-col gap-2 p-6 items-center cursor-pointer hover:bg-gray-50 transition'
                                        onDrop={handleDrop}
                                        onDragOver={handleDragOver}
                                        onClick={handleBrowseClick}
                                    >
                                        <FileIcon className='w-12 h-12 text-gray-500' />
                                        <span className='text-sm font-medium text-gray-600'>
                                            {selectedFile
                                                ? selectedFile.name
                                                : 'Drag and drop a file or click to browse'}
                                        </span>
                                        <span className='text-xs text-gray-500'>
                                            PDF, image, video, or audio
                                        </span>
                                        <input
                                            type='file'
                                            accept='image/*'
                                            ref={fileInputRef}
                                            className='hidden'
                                            onChange={handleFileChange}
                                        />
                                    </div>
                                </div>

                                <DialogFooter>
                                    <Button onClick={handleAddItem} type='submit'>Save changes</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </CardFooter>
                </Card>
            </GlobalContainer>
        </div>
    );
};

export default Dashboard;
