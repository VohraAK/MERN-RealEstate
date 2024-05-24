// private page, should be added in PrivateRoute
// main used instead of div to make it more SEO friendly

export default function CreateListing() {
  return (
    <main className="p-10">
        <div className="p-6 bg-white border border-stone-600 border-opacity-40 shadow-gray-200 shadow-sm hover:shadow-md rounded-md mt-4 max-w-4xl mx-auto">
            <h1 className="text-2xl text-center font-semibold">Create a Listing</h1>

            {/* Making two forms */}
            <form className='flex flex-col sm:flex-row gap-4'>
                <div className="flex flex-col gap-6 mt-6 flex-1">
                    <input type="text" className= 'w-11/12 p-3 rounded-md border border-gray-400 shadow-gray-200 shadow-sm hover:shadow-md bg-white' placeholder="Name" id='name' maxLength='62' minLength='5' required/>
                    <input type="text" className= 'w-11/12 p-3 rounded-md border border-gray-400 shadow-gray-200 shadow-sm hover:shadow-md bg-white' placeholder="Description" id='description' required/>
                    <input type="text" className= 'w-11/12 p-3 rounded-md border border-gray-400 shadow-gray-200 shadow-sm hover:shadow-md bg-white' placeholder="Address" id='address' required/>

                    <div className="flex gap-6 flex-wrap">
                        <div className=" flex gap-2">
                            <input type="checkbox" className="w-5" id="sell" />
                            <span>Sell</span>
                        </div>
                        <div className=" flex gap-2">
                            <input type="checkbox" className="w-5" id="rent" />
                            <span>Rent</span>
                        </div>
                        <div className=" flex gap-2">
                            <input type="checkbox" className="w-5" id="parking" />
                            <span>Parking spot</span>
                        </div>
                        <div className=" flex gap-2">
                            <input type="checkbox" className="w-5" id="furnished" />
                            <span>Furnished</span>
                        </div>
                        <div className=" flex gap-2">
                            <input type="checkbox" className="w-5" id="offer" />
                            <span>Offer</span>
                        </div>

                    </div>

                    <div className="flex flex-wrap gap-6">
                        <div className="flex items-center gap-3">
                            <input type="number" id="bedrooms" className="p-2 border border-gray-400 shadow-gray-200 shadow-sm hover:shadow-md rounded-md" min='1' max='10' required/>
                            <span>Bedrooms</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <input type="number" id="bathrooms" className="p-2 border border-gray-400 shadow-gray-200 shadow-sm hover:shadow-md rounded-md" min='1' max='10' required/>
                            <span>Bathrooms</span>
                        </div>
                        <div className="flex gap-3">
                            <input type="number" id="regularPrice" className="p-2 border border-gray-400 shadow-gray-200 shadow-sm hover:shadow-md rounded-md" min='1' max='10' required/>
                            <div className="flex flex-col items-center">
                                <span>Regular Price</span>
                                <span className="text-xs font-semibold">($ / month)</span>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <input type="number" id="discountPrice" className="p-2 border border-gray-400 shadow-gray-200 shadow-md rounded-md" min='1' max='10' required/>
                            <div className="flex flex-col items-center">
                                <span>Discounted Price</span>
                                <span className="text-xs font-semibold">($ / month)</span>
                            </div>
                        </div>
                    </div>

                </div>
                
                <div className="flex flex-col gap-3 mt-6 flex-1">
                    <p className="font-semibold">Images:
                        <span className="font-normal after:text-gray-700 ml-1">The first image will be the cover (max 6)</span>
                    </p>
                    <div className="flex gap-4">
                        <input className='p-3 border border-gray-400 rounded-md shadow-gray-200 shadow-sm bg-white w-full' type="file" id="images" accept="image/*" multiple/>
                        <button className='p-3 bg-gray-600 text-slate-100 shadow-sm shadow-gray-400 hover:opacity-95 hover:shadow-md disabled:opacity-80 text-center rounded-md'>Upload</button>
                    </div>
                    <button className="bg-green-700 text-slate-100 p-3 mt-4 rounded-md shadow-sm shadow-gray-400 w-full hover:opacity-95 disabled:opacity-80 text-center mx-auto" type="submit">Create Listing</button>
                </div>


            </form>
        </div>
    </main>
  )
}
