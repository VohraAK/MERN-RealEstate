import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import ListingCard from "../components/ListingCard";

export default function Search() {

	const [filterData, setFilterData] = useState({
		searchTerm: '',
		type: 'all',
		parking: false,
		furnished: false,
		offer: false,
		sort: 'createdAt',
		order: 'desc',
	});
	const [loading, setLoading] = useState(false);
	const [listings, setListings] = useState([]);
	const navigate = useNavigate();

	console.log(listings);


	const handleChange = (e) => {
		if (e.target.id === 'all' || e.target.id === 'rent' || e.target.id === 'sell') { setFilterData({ ...filterData, type: e.target.id }); }
		if (e.target.id === 'searchTerm') { setFilterData({ ...filterData, searchTerm: e.target.value }); }
		if (e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer') {setFilterData({ ...filterData, [e.target.id]: e.target.checked || e.target.checked === 'true' ? true : false })};
		if (e.target.id === 'sort_order')
		{
			const sort = e.target.value.split("_")[0] || 'createdAt';
			const order = e.target.value.split("_")[1] || 'desc';
			setFilterData({ ...filterData, sort, order });
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		// get previous params from URL
		const urlParams = new URLSearchParams(location.search);
		urlParams.set('searchTerm', filterData.searchTerm);
		urlParams.set('type', filterData.type);
		urlParams.set('parking', filterData.parking);
		urlParams.set('furnished', filterData.furnished);
		urlParams.set('offer', filterData.offer);
		urlParams.set('sort', filterData.sort);
		urlParams.set('order', filterData.order);

		const searchQuery = urlParams.toString();
		navigate(`/search?${searchQuery}`);
	};

	useEffect(() => {
		const urlParams = new URLSearchParams(location.search);
		const searchTermFromURL = urlParams.get('searchTerm');
		const typeFromURL = urlParams.get('type');
		const parkingFromURL = urlParams.get('parking');
		const furnishedFromURL = urlParams.get('furnished');
		const offerFromURL = urlParams.get('offer');
		const sortFromURl = urlParams.get('sort');
		const orderFromURl = urlParams.get('order');

		if
		(
			searchTermFromURL || typeFromURL || parkingFromURL || furnishedFromURL || offerFromURL || sortFromURl || orderFromURl
		)
		{
			setFilterData(
			{
				searchTerm: searchTermFromURL || '',
				type: typeFromURL || 'all',
				parking: parkingFromURL === 'true' ? true : false,
				furnished: furnishedFromURL === 'true' ? true : false,
				offer: offerFromURL === 'true' ? true : false,
				sort: sortFromURl || 'createdAt',
				order: orderFromURl || 'desc',
			}
		);

		const fetchListing = async () => {
			setLoading(true);
			const searchQuery = urlParams.toString();
			const response = await fetch(`/api/listing/get?${searchQuery}`);
			const data = await response.json();
			setListings(data);
			setLoading(false);
		};

		fetchListing();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location.search]);

  return (
    <div className="flex flex-col md:flex-row">
        <div className="border border-b-2 md:border-r-2 md:min-h-screen p-8 min-w-2/3">
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                <div className="flex flex-row items-center gap-3">
                    <label className="whitespace-nowrap font-semibold">Search Term: </label>
                    <input onChange={handleChange} value={filterData.searchTerm} className='p-2 rounded-md w-ful outline-none w-full' id="searchTerm" type="text" placeholder="Search..." />
                </div>
                <div className="flex gap-3 sm:flex-wrap items-center">
                    <label className="font-semibold">Type:</label>
                    <div className="flex gap-4 flex-wrap">
                        <div className="flex flex-row gap-2 text-nowrap">
                            <input onChange={handleChange} checked={filterData.type === 'all'} value={filterData.type} className='w-5' type="checkbox" id="all" />
                            <span>Rent and Sale</span>
                        </div>
                        <div className="flex flex-row gap-2 text-nowrap">
                            <input onChange={handleChange} checked={filterData.type === 'rent'} className='w-5' type="checkbox" id="rent" />
                            <span>For Rent</span>
                        </div>
                        <div className="flex flex-row gap-2 text-nowrap">
                            <input onChange={handleChange} checked={filterData.type === 'sell'} className='w-5' type="checkbox" id="sell" />
                            <span>For Sale</span>
                        </div>
                        <div className="flex flex-row gap-2 text-nowrap">
                            <input onChange={handleChange} checked={filterData.offer} className='w-5' type="checkbox" id="offer" />
                            <span>Offer</span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-3 sm:flex-wrap items-center">
                    <label className="font-semibold">Amenities:</label>
                    <div className="flex gap-4 flex-wrap">
                        <div className="flex flex-row gap-2 text-nowrap">
                            <input onChange={handleChange} checked={filterData.parking} className='w-5' type="checkbox" id="parking" />
                            <span>Parking</span>
                        </div>
                        <div className="flex flex-row gap-2 text-nowrap">
                            <input onChange={handleChange} checked={filterData.furnished} className='w-5' type="checkbox" id="furnished" />
                            <span>Furnished</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <label className="font-semibold">Sort by:</label>
                    <select onChange={handleChange} defaultValue={'created_at_desc'} className='border rounded-md p-2'id="sort_order">
                        <option value={"regularPrice_desc"}>Price high to low</option>
                        <option value={"regularPrice_asc"}>Price low to high</option>
                        <option value={'createdAt_desc'}>Latest</option>
                        <option value={'createdAt_asc'}>Oldest</option>
                    </select>
                </div>
                <button type="submit" className="bg-slate-600 text-lg text-slate-100 p-2 rounded-md shadow-sm shadow-gray-400 hover:opacity-95 disabled:opacity-80">Search</button>
            </form>
        </div>
        <div className="w-full flex-1">
            <h1 className="text-2xl p-3 mt-4 font-semibold border-b-2 text-slate-600">Search results: </h1>
			<div className="p-7 flex flex-wrap gap-10">
				{!loading && listings.length === 0 && (<p className="text-slate-700 text-xl p-3">No listings found...</p>)}
				{loading && (<p className="text-lg text-slate-700 text-center w-full pt-3">Loading...</p>)}
				{!loading && listings && listings.map((listing) => <ListingCard key={listing._id} listing={listing}/ >)}
			</div>
        </div>
    </div>
  )
}
