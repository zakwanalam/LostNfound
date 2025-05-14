import GlobalContainer from '@/Home/GlobalContainer';
import React, { useEffect, useState } from 'react';
import Items from './Items';
import { foundItems } from '@/Home/Hero-Section/HeroSection';
import NavbarContainer from '@/Home/NavbarContainer';
import Navbar from '@/Home/Navbar';
import SearchBar from '@/components/search-bar';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { Item } from '@/state/item/itemslice';
import axios from 'axios';
import { Button } from '@/components/ui/button';


function ItemsPage() {
    const { items, loading, error } = useSelector((state: RootState) => state.itemState)
    const [allItems, setItems] = useState(items);
    console.log(allItems)
    const handleSearch = (searchInput: string) => {
        const trimmed = searchInput.trim().toLowerCase();

        if (!trimmed) {
            setItems(items); // Reset to original list
            return;
        }

        const filtered = allItems.filter(item =>
            item.itemName.toLowerCase().includes(trimmed) ||
            item.location.toLowerCase().includes(trimmed)
        );

        setItems(filtered);
    };


    useEffect(() => {
        console.log(items)
    })
    return (
        <div>
            <NavbarContainer>
                <Navbar />
            </NavbarContainer>
            <GlobalContainer>
                <div className="flex items-center justify-between mb-6 pt-10">
                    <h2 className="text-2xl font-bold">All Items</h2>
                    <SearchBar handleSearch={handleSearch} />
                </div>
                <Items items={allItems} />
            </GlobalContainer>
        </div>
    );
}

export default ItemsPage;
