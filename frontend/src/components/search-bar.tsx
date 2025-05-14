import React, { useState } from 'react';
import { Input } from './hero-section/Input';
import { Button } from './hero-section/Button';

function SearchBar({ handleSearch }: { handleSearch: (input: string) => void }) {
    const [input, setInput] = useState('');

    const onSubmit = () => {
        handleSearch(input);
    };
    const handleKeyDown = (e:React.KeyboardEvent)=>{
        if(e.key=='Enter'){
            onSubmit()
        }
    }
    return (
        <div className="flex w-full max-w-md">
            <div className="w-full flex relative">
                <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Search for lost items"
                    onKeyDown={(e)=>handleKeyDown(e)}
                    className="w-full rounded-xl pr-20"
                />
                <Button
                    onClick={onSubmit}
                    className="absolute right-0 top-0 h-full rounded-xl scale-95"
                >
                    Search
                </Button>
            </div>
        </div>
    );
}

export default SearchBar;
