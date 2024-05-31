import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';


export default function Listing() {

    SwiperCore.use([Navigation]);
    const params = useParams();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

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
                                <div className="h-[530px]" style={{background: `url(${URL}) center no-repeat`, backgroundSize: `auto`}}></div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )
        }
    </main>
  )
}
