import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import { FaBath, FaBed, FaChair, FaMapMarkerAlt, FaParking, FaShare } from 'react-icons/fa';

export default function Listing() {

    SwiperCore.use([Navigation]);
    const params = useParams();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const fetchListing = async () => {
            const listingID = params.listingID;
            try 
            {
                setLoading(true);
                const response = await fetch(`/api/listing/${listingID}`);
                const data = await response.json();
    
                if (data.success === false) 
                {
                    console.log(data.message); 
                    setError(true); setLoading(false); 
                    return;
                }

                setListing(data);
                setLoading(false);
                
            } 
            catch (error) 
            { 
                console.log(error.message); 
                setLoading(false); 
                setError(true); 
            }
        }
        fetchListing();
    }, [params.listingID]);

    const handleShareClick = () => {
        //  copy listing link to clipboard
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);

        // setCopied to false after 2 seconds
        setTimeout(() => {setCopied(false)}, 2000);
    };


  return (
    <main>
        {loading && <p className="text-center my-10 text-2xl">Loading...</p>}
        {error && <p className="text-center my-10 text-2xl">Something went wrong...</p>}
        {listing && !loading && !error && 
            (
                <div>
                    <Swiper navigation>
                        {listing.imageURLs.map((URL) => (
                            <SwiperSlide key={URL} className="bg-neutral-950">
                                <div className="h-[450px]" style={{background: `url(${URL}) center no-repeat`, backgroundSize: `auto`}}></div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className="flex items-center justify-center hover:opacity-85 cursor-pointer fixed top-[12%] right-[3%] z-10 border border-slate-700 bg-slate-300 shadow-sm shadow-neutral-900 rounded-full p-3">
                        <FaShare className="text-slate-600" onClick={handleShareClick}/>
                    </div>
                    {copied && (
                        <p className="fixed top-[20%] right-[3%] rounded-lg bg-slate-200 text-slate-900 bg-opacity-50 z-10 p-2">Link copied!</p>
                    )}
                    <div className="flex flex-col my-5 max-w-3xl border rounded-md p-5 gap-5 shadow-md mx-auto">
                        <p className="text-2xl font-semibold">
                            {listing.name} - ${listing.offer === true ? listing.discountedPrice.toLocaleString('en-US') : listing.regularPrice.toLocaleString('en-US')}
                            {listing.type === 'rent' && ' / month'}
                        </p>
                        <p className="flex flex-row gap-1 items-center">
                            <FaMapMarkerAlt className="text-green-600"/> {listing.address}
                        </p>
                        <div className="flex gap-5 flex-1">
                            <p className="bg-red-700 max-w-[180px] text-slate-100 text-center p-3 rounded-md">
                                {listing.type === 'rent' ? 'For Rent' : "For Sale"}
                            </p>
                            {listing.offer && (
                                <p className=" bg-green-700 text-slate-100 rounded-md text-center p-3 max-w-[180px]">
                                    Offer: ${+listing.regularPrice - +listing.discountedPrice} Off
                                </p>
                            )}
                        </div>
                        <p className="text-slate-700">
                        <span className="font-semibold text-black">Description: </span>
                        {listing.description}
                        </p>
                        <ul className="flex flex-wrap gap-4">
                            <li className="flex items-center gap-2 whitespace-nowrap text-green-900 font-medium">
                                <FaBed className="text-lg text-green-700"/>
                                {listing.bedroomCount > 1 ? `${listing.bedroomCount} beds` : `${listing.bedroomCount} bed`}
                            </li>
                            <li className="flex items-center gap-2 whitespace-nowrap text-green-900 font-medium">
                                <FaBath className="text-lg text-green-700"/>
                                {listing.bathroomCount > 1 ? `${listing.bathroomCount} baths` : `${listing.bedroomCount} bath`}
                            </li>
                            <li className="flex items-center gap-2 whitespace-nowrap text-green-900 font-medium">
                                <FaParking className="text-lg text-green-700"/>
                                {listing.parking ? "Parking available" : "No parking"}
                            </li>
                            <li className="flex items-center gap-2 whitespace-nowrap text-green-900 font-medium">
                                <FaChair className="text-lg text-green-700"/>
                                {listing.furnished ? "Furnished" : "Unfurnished"}
                            </li>
                        </ul>
                    </div>
                </div>
            )
        }
    </main>
  )
}
