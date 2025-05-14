import { Input } from '../../components/hero-section/Input';

import { Card, CardContent } from '../../components/hero-section/Card';
import { Button } from '../../components/hero-section/Button'
import '../../index.css'
import bannerImage from "../../images/hero-section/lost-items-banner.jpg";
import Navbar from '../Navbar';
import image1 from '../Hero-Section/images/image1.jpg'
import image2 from '../Hero-Section/images/image2.jpg'
import image3 from '../Hero-Section/images/image3.jpg'
import useLoadingNavigation from '@/utility-functions/loading-navigation';
import Items from '@/Items/Items';
import SearchBar from '@/components/search-bar';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { Footer } from './Footer/footer';

const categories = [
    "Electronics",
    "Personal Accessories",
    "Clothing",
    "Documents",
    "Keys",
    "Pets"
];

const foundItems = [
    {
        id: 1,
        title: "Found: Blue Backpack",
        location: "Redwood Main St",
        image: image1
    },
    {
        id: 2,
        title: "Found: iPhone 13",
        location: "Downtown Library",
        image: image2
    },
    {
        id: 3,
        title: "Found: Set of Keys",
        location: "Corner of Elm and Oak",
        image: image3
    },
    {
        id: 4,
        title: "Found: Leather Wallet",
        location: "Bus Stop #7",
        image: image2
    },
    {
        id: 5,
        title: "Found: Sunglasses",
        location: "Community Pool",
        image: image1
    },
    {
        id: 6,
        title: "Found: Set of Keys",
        location: "Corner of Elm and Oak",
        image: image3
    },
    {
        id: 7,
        title: "Found: Leather Wallet",
        location: "Bus Stop #7",
        image: image2
    },
    {
        id: 8,
        title: "Found: Sunglasses",
        location: "Community Pool",
        image: image1
    },
    {
        id: 9,
        title: "Found: Set of Keys",
        location: "Corner of Elm and Oak",
        image: image3
    },
    {
        id: 10,
        title: "Found: Leather Wallet",
        location: "Bus Stop #7",
        image: image2
    },
    {
        id: 11,
        title: "Found: Sunglasses",
        location: "Community Pool",
        image: image1
    }
];


export { foundItems, categories }

export default function HeroSection() {
    const loadingnavigate = useLoadingNavigation()
    const { items } = useSelector((state: RootState) => state.itemState)
    return (
        <div>
            <div className='flex  items-center justify-center'>

                <div className="space-y-8 px-6 lg:px-0 w-screen">
                    <section className="relative flex   rounded-xl overflow-hidden shadow-md">
                        <img
                            src={bannerImage}
                            alt="Find Your Lost Items"
                            className="w-full h-80 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/60 flex flex-col  items-center justify-center text-white text-center p-4">
                            <h2 className=" text-3xl font-bold mb-2">Find Your Lost Items</h2>
                            <p className="max-w-xl mb-4">
                                Join a community of helpful neighbors to recover your belongings or help others find theirs. Search our database to locate lost items, or report something you've found to help reunite it with its owner.
                            </p>
                            <div onClick={() => loadingnavigate('/items')} className=" flex  w-full  max-w-md">
                                <SearchBar />
                            </div >
                        </div>
                    </section>
                    <section>
                        <h3 className="text-xl py-2 font-semibold mb-2">Browse by Category</h3>
                        <div className="flex flex-wrap gap-2">
                            {categories.map((cat) => (
                                <Button key={cat} variant="outline" className="rounded-full cursor-pointer px-4">
                                    {cat}
                                </Button>
                            ))}
                        </div>
                    </section>
                    <h3 className="text-xl py-2 font-semibold mb-4">Recently Found Items</h3>
                    <Items items={items.slice(0, 5)} />
                    <div className='flex justify-end'>
                    <Button onClick={()=>loadingnavigate('/items')} className='p-1 -m-1 text-sm cursor-pointer' >See More</Button>
                    </div>
                </div>
            </div >
        </div>

    );
}
