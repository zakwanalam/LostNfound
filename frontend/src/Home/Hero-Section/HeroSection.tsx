import { Input } from '../../components/hero-section/Input';

import { Card, CardContent } from '../../components/hero-section/Card';
import {Button} from '../../components/hero-section/Button'
import '../../index.css'
import bannerImage from "../../images/hero-section/lost-items-banner.jpg";
import Navbar from '../Navbar';
import image1 from '../Hero-Section/images/image1.jpg'
import image2 from '../Hero-Section/images/image2.jpg'
import image3 from '../Hero-Section/images/image3.jpg'

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
        title: "Found: Blue Backpack",
        location: "Redwood Main St",
        image: image1
    },
    {
        title: "Found: iPhone 13",
        location: "Downtown Library",
        image: image2
    },
    {
        title: "Found: Set of Keys",
        location: "Corner of Elm and Oak",
        image: image3
    },
    {
        title: "Found: Leather Wallet",
        location: "Bus Stop #7",
        image: image2
    },
    {
        title: "Found: Sunglasses",
        location: "Community Pool",
        image: image1
    },
    {
        title: "Found: Set of Keys",
        location: "Corner of Elm and Oak",
        image: image3
    },
    {
        title: "Found: Leather Wallet",
        location: "Bus Stop #7",
        image: image2
    },
    {
        title: "Found: Sunglasses",
        location: "Community Pool",
        image: image1
    },
    {
        title: "Found: Set of Keys",
        location: "Corner of Elm and Oak",
        image: image3
    },
    {
        title: "Found: Leather Wallet",
        location: "Bus Stop #7",
        image: image2
    },
    {
        title: "Found: Sunglasses",
        location: "Community Pool",
        image: image1
    }
];

export default function LostItemsDashboard() {
    return (

        <div className='flex  items-center justify-center'>
            {/* <header className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Community Lost & Found</h1>
        <div className="flex items-center space-x-4">
          <Input placeholder="Search" className="w-64" />
          <Button>Post Item</Button>
        </div>
      </header> */}

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
                        <div className=" flex  w-full  max-w-md">
                            <div className='w-full flex  relative'>
                                <Input placeholder="Search for lost items" className=" w-full rounded-xl " />
                                <Button className='absolute mt-[1px] bg- scale-95 cursor-pointer right-0 rounder-xl'>Search</Button>
                            </div>
                        </div>
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
                <section>
                    <h3 className="text-xl py-2 font-semibold mb-4">Recently Found Items</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                        {foundItems.map((item) => (
                            <Card key={item.title} className="overflow-hidden cursor-pointer">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="h-40 w-full object-cover"
                                />
                                <CardContent className="p-2">
                                    <p className="font-semibold text-sm">{item.title}</p>
                                    <p className="text-xs text-gray-500">{item.location}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>
            </div>
        </div >
    );
}
