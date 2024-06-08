/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';
import { FaBed, FaBath } from 'react-icons/fa';

export default function ListingCard({ listing }) {
  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow duration-200 rounded-lg w-full sm:w-[330px] overflow-hidden'>
        <Link to={`/listing/${listing._id}`}>
            <img src={listing.imageURLs[0]} alt="listing cover image" className='h-[330px] sm:h-[220px] object-cover hover:scale-105 transition-scale duration-200'/>
        
        <div className='p-4 flex flex-col gap-2 w-full'>
            <p className='text-lg font-semibold text-slate-700 truncate '>{listing.name}</p>
            <div className='flex items-center gap-1'>
                <MdLocationOn className='h-4 w-4 text-green-700'/>
                <p className='truncate text-sm w-full text-gray-600'>{listing.address}</p>
            </div>
            <p className='text-sm text-gray-600 line-clamp-2 mt-2'>{listing.description}</p>
            <div className='flex gap-4 mt-2'>
                <div className='font-bold text-sm text-slate-700 flex gap-2 items-center'>
                <FaBed className='text-green-700'/>
                    {listing.bedroomCount > 1 ? `${listing.bedroomCount} beds` : `${listing.bedroomCount} bed`}
                </div>
                <div className='font-bold text-sm text-slate-700 flex gap-2 items-center'>
                <FaBath className='text-green-700'/>
                    {listing.bathroomCount > 1 ? `${listing.bathroomCount} baths` : `${listing.bathroomCount} bath`}
                </div>
            </div>
            <p className='text-slate-500 mt-1 font-semibold'>
                ${listing.offer ? listing.discountedPrice.toLocaleString('en-US') : listing.regularPrice.toLocaleString('en-US')} {listing.type === 'rent' && ' / month' }
            </p>
        </div>
        </Link>
    </div>
  )
}
