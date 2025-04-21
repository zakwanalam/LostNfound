import { Input } from '../components/hero-section/Input';
import { Button } from '../components/hero-section/Button';
import { Card, CardContent } from '../components/hero-section/Card';
import '../index.css'
import bannerImage from "../images/hero-section/lost-items-banner.jpg";
import Navbar from '../Home/Navbar';
import NavbarContainer from '../Home/NavbarContainer';

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
        image: "/images/backpack.jpg"
    },
    {
        title: "Found: iPhone 13",
        location: "Downtown Library",
        image: "/images/iphone.jpg"
    },
    {
        title: "Found: Set of Keys",
        location: "Corner of Elm and Oak",
        image: "/images/keys.jpg"
    },
    {
        title: "Found: Leather Wallet",
        location: "Bus Stop #7",
        image: "/images/wallet.jpg"
    },
    {
        title: "Found: Sunglasses",
        location: "Community Pool",
        image: "/images/sunglasses.jpg"
    }
];

export default function LostItemsDashboard() {
    return (

        <div className='flex relative items-center justify-center'>
            {/* <header className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Community Lost & Found</h1>
        <div className="flex items-center space-x-4">
          <Input placeholder="Search" className="w-64" />
          <Button>Post Item</Button>
        </div>
      </header> */}

            {/* Navbar Container */}
            <NavbarContainer color='bg-gray-200'>
                <Navbar />
            </NavbarContainer>

            <div className="pt-20 p-6 space-y-8 w-screen">
                <section className="relative rounded-xl overflow-hidden shadow-md">
                    <img
                        src={bannerImage}
                        alt="Find Your Lost Items"
                        className="w-full h-80 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-center p-4">
                        <h2 className="text-3xl font-bold mb-2">Find Your Lost Items</h2>
                        <p className="max-w-xl mb-4">
                            Join a community of helpful neighbors to recover your belongings or help others find theirs. Search our database to locate lost items, or report something you've found to help reunite it with its owner.
                        </p>
                        <div className="flex w-full max-w-md">
                            <Input placeholder="Search for lost items" className="rounded-l-md" />
                            <Button className="rounded-l-none">Search</Button>
                        </div>
                    </div>
                </section>

                <section>
                    <h3 className="text-lg font-semibold mb-2">Browse by Category</h3>
                    <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                            <Button key={cat} variant="outline" className="rounded-full px-4">
                                {cat}
                            </Button>
                        ))}
                    </div>
                </section>

                <section>
                    <h3 className="text-lg font-semibold mb-4">Recently Found Items</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                        {foundItems.map((item) => (
                            <Card key={item.title} className="overflow-hidden">
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
