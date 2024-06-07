export default function Search() {

  return (
    <div className="flex flex-col md:flex-row">
        <div className="border border-b-2 md:border-r-2 md:min-h-screen p-8 min-w-2/3">
            <form className="flex flex-col gap-8">
                <div className="flex flex-row items-center gap-3">
                    <label className="whitespace-nowrap font-semibold">Search Term: </label>
                    <input className='p-2 rounded-md w-ful outline-none w-full' id="searchTerm" type="text" placeholder="Search..." />
                </div>
                <div className="flex gap-3 sm:flex-wrap items-center">
                    <label className="font-semibold">Type:</label>
                    <div className="flex gap-4 flex-wrap">
                        <div className="flex flex-row gap-2 text-nowrap">
                            <input className='w-5' type="checkbox" id="all" />
                            <span>Rent and Sale</span>
                        </div>
                        <div className="flex flex-row gap-2 text-nowrap">
                            <input className='w-5' type="checkbox" id="rent" />
                            <span>For Rent</span>
                        </div>
                        <div className="flex flex-row gap-2 text-nowrap">
                            <input className='w-5' type="checkbox" id="sell" />
                            <span>For Sale</span>
                        </div>
                        <div className="flex flex-row gap-2 text-nowrap">
                            <input className='w-5' type="checkbox" id="offer" />
                            <span>Offer</span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-3 sm:flex-wrap items-center">
                    <label className="font-semibold">Amenities:</label>
                    <div className="flex gap-4 flex-wrap">
                        <div className="flex flex-row gap-2 text-nowrap">
                            <input className='w-5' type="checkbox" id="parking" />
                            <span>Parking</span>
                        </div>
                        <div className="flex flex-row gap-2 text-nowrap">
                            <input className='w-5' type="checkbox" id="furnished" />
                            <span>Furnished</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <label className="font-semibold">Sort by:</label>
                    <select className='border rounded-md p-2'id="sort_order">
                        <option>Price high to low</option>
                        <option>Price low to high</option>
                        <option>Latest</option>
                        <option>Oldest</option>
                    </select>
                </div>
                <button type="submit" className="bg-slate-600 text-lg text-slate-100 p-2 rounded-md shadow-sm shadow-gray-400 hover:opacity-95 disabled:opacity-80">Search</button>
            </form>
        </div>
        <div className="w-full">
            <h1 className="text-2xl p-3 mt-4 font-semibold border-b-2 text-slate-600">Search results: </h1>
        </div>
    </div>
  )
}
