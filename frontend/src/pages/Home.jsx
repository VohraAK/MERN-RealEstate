import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import ListingCard from '../components/ListingCard';
export default function Home() {

  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);

  SwiperCore.use([Navigation]);

  // fetch listings

  useEffect(() => {
    const fetchListings = async () => {
      
      // fetch offer listings
      try 
      {
        const response = await fetch(`/api/listing/get?offer=true&limit=4`);
        const data = await response.json();
        setOfferListings(data);
        // until data arrives, do not fetch other listings, hence it is called here
        fetchRentListings();
      } 
      catch (error) 
      {
        console.log(error);
      }
    };

    const fetchRentListings = async () => {
      try 
      {
        const response = await fetch(`/api/listing/get?type=rent&limit=4`);
        const data = await response.json();
        setRentListings(data);
        fetchSaleListings();
      } 
      catch (error) 
      {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try 
      {
        const response = await fetch(`/api/listing/get?type=sell&limit=4`);
        const data = await response.json();
        setSaleListings(data);
      } 
      catch (error) 
      {
        console.log(error);
      }
    };

    fetchListings();

  }, [])

  return (
    <div>
      {/* top */}
      <div className='flex flex-col gap-8 p-28 px-8 max-w-6xl mx-auto'>
        <h1 className="font-semibold text-4xl lg:text-6xl">Find your <span className="text-slate-500">perfect</span> <br />home with ease</h1>
        <div className='text-slate-700 font-semibold text-xs sm:text-sm'>We offer a seamless experience and help you find your home easily and comfortably.<br /><br />We have a wide range of properties to choose from.</div>
        <Link className='text-sm sm:text-md font-bold text-blue-800 cursor-pointer hover:underline' to={"/search"}>Get Started</Link>
      </div>

      {/* swiper */}

      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                style={{
                  background: `url(${listing.imageURLs[0]}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
                className='h-[500px]'
                key={listing._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>
 
      {/* listing results */}
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
          {offerListings && offerListings.length > 0 && 
             <div className=''>
                <div className='my-3'>
                  <h2 className='text-2xl mb-3 font-semi-bold text-slate-700'>Recent Offers</h2>
                <div className='flex flex-wrap gap-4'>
                  {offerListings.map((listing) => <ListingCard listing={listing} key={listing._id}/>)}
                </div>
                  <Link className='text-sm text-blue-700 hover:underline' to={'/search?offer=true'}>
                    Show more offers
                  </Link>
                </div>
             </div>
          }
          {rentListings && rentListings.length > 0 && 
             <div className=''>
                <div className='my-3'>
                  <h2 className='text-2xl mb-3 font-semi-bold text-slate-700'>Recent Rentals</h2>
                <div className='flex flex-wrap gap-4'>
                  {rentListings.map((listing) => <ListingCard listing={listing} key={listing._id}/>)}
                </div>
                  <Link className='text-sm text-blue-700 hover:underline' to={'/search?type=rent'}>
                    Show more rentals
                  </Link>
                </div>
             </div>
          }
          {saleListings && saleListings.length > 0 && 
             <div className=''>
                <div className='my-3'>
                  <h2 className='text-2xl mb-3 font-semi-bold text-slate-700'>Recent For Sale</h2>
                <div className='flex flex-wrap gap-4'>
                  {saleListings.map((listing) => <ListingCard listing={listing} key={listing._id}/>)}
                </div>
                  <Link className='text-sm text-blue-700 hover:underline' to={'/search?type=sell'}>
                    Show more for sale
                  </Link>
                </div>
             </div>
          }
      </div>

    </div>
  )
}
