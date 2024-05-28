// private page, should be added in PrivateRoute
// main used instead of div to make it more SEO friendly

import { useEffect, useState } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase.js'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditListing() {
    
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const params = useParams();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({ 
    imageURLs: [],
    name: '',
    description: '',
    address: '',
    regularPrice: 50,
    discountedPrice: 0,
    bedroomCount: 1,
    bathroomCount: 1,
    furnished: false,
    parking: false,
    type: '',
    offer: false,
  });

  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // create an async function inside the useEffect hook
    const fetchListing = async () => {
        // get listing from param ID
        const listingID = params.listingID;
        const response = await fetch(`/api/listing/${listingID}`);
        const data = await response.json();

        if (data.success === false){ console.log(data.message); return; }

        // set formData state to data
        setFormData(data);
        
    }

    fetchListing();
  }, [])

  const handleChange = (e) => {
    if (e.target.id == 'sell' || e.target.id === 'rent') {setFormData({ ...formData, type: e.target.id })}
    if (e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer') {setFormData({ ...formData, [e.target.id]: e.target.checked })}
    if (e.target.type === 'number' || e.target.type === 'text') {setFormData({ ...formData, [e.target.id]: e.target.value })}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try 
    {
      // check for no images
      if (formData.imageURLs.length < 1) { return setSubmitError("You must upload at least one image!"); }

      // check for incorrect price
      if (+formData.regularPrice < +formData.discountedPrice) { return setSubmitError("Discounted price must be lower than the regular price") }
      setSubmitting(true);
      setSubmitError(false);

      const response = await fetch(`/api/listing/update/${params.listingID}`, 
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        })
      });

      const data = await response.json();
      setSubmitting(false);

      if (data.success === false)
      {
        setSubmitError(data.message);
      }

      navigate(`/listing/${data._id}`);
    } 
    catch (error) 
    {
      setSubmitError(error.message);
      setSubmitting(false);
    }
  };

  const handleFileUpload = (e) => { setFiles(e.target.files) };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleImageSubmit = () =>
  {
    // check for 6 or less files
    if (files.length > 0 && (files.length + formData.imageURLs.length) < 7)
    {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      // upload files one at a time
      for (let i = 0; i < files.length; i++)
      {
        // downloadURLs from each file upload are pushed
        promises.push(storeImage(files[i]));
      }

      // ensure that all promises are resolved in the array, then update formData state with new URLs
      Promise.all(promises).then((URLs) => { 
        setFormData({ ...formData, imageURLs: formData.imageURLs.concat(URLs) });
        setImageUploadError(false);
        setUploading(false);
      })
      // eslint-disable-next-line no-unused-vars
      .catch((error) => { 
        setImageUploadError("Image upload failed! (2MB maximum per image)");
        setUploading(false);
      })
    }

    else
    {
      setImageUploadError("You can only upload upto 6 images per listing");
      setUploading(false);
    }
  }

  const handleDeleteImage = (index) => {
    setFormData({ ...formData, imageURLs: formData.imageURLs.filter((_, i) => i !== index)});
  };

  return (
    <main className="p-10">
        <div className="p-6 bg-white border border-stone-600 border-opacity-40 shadow-gray-200 shadow-sm hover:shadow-md rounded-md mt-4 max-w-4xl mx-auto">
            <h1 className="text-2xl text-center font-semibold mb-5">Edit a Listing</h1>

            {/* Making two forms */}
            <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
                <div className="flex flex-col gap-6 mt-6 flex-1">
                    <input type="text"  onChange={handleChange} value={formData.name} className= 'w-11/12 p-3 rounded-md border border-gray-400 shadow-gray-200 shadow-sm hover:shadow-md bg-white' placeholder="Name" id='name' maxLength='62' minLength='5' required/>
                    <input type="text"  onChange={handleChange}  value={formData.description} className= 'w-11/12 p-3 rounded-md border border-gray-400 shadow-gray-200 shadow-sm hover:shadow-md bg-white' placeholder="Description" id='description' required/>
                    <input type="text"  onChange={handleChange}  value={formData.address} className= 'w-11/12 p-3 rounded-md border border-gray-400 shadow-gray-200 shadow-sm hover:shadow-md bg-white' placeholder="Address" id='address' required/>

                    <div className="flex gap-6 flex-wrap">
                        <div className=" flex gap-2">
                            <input type="checkbox" onChange={handleChange} checked={formData.type === "sell"} className="w-5" id="sell" />
                            <span>Sell</span>
                        </div>
                        <div className=" flex gap-2">
                            <input type="checkbox" onChange={handleChange} checked={formData.type === "rent"} className="w-5" id="rent" />
                            <span>Rent</span>
                        </div>
                        <div className=" flex gap-2">
                            <input type="checkbox"  onChange={handleChange} checked={formData.parking} className="w-5" id="parking" />
                            <span>Parking spot</span>
                        </div>
                        <div className=" flex gap-2">
                            <input type="checkbox"  onChange={handleChange} checked={formData.furnished} className="w-5" id="furnished" />
                            <span>Furnished</span>
                        </div>
                        <div className=" flex gap-2">
                            <input type="checkbox"  onChange={handleChange} checked={formData.offer} className="w-5" id="offer" />
                            <span>Offer</span>
                        </div>

                    </div>

                    <div className="flex flex-wrap gap-6">
                        <div className="flex items-center gap-3">
                            <input type="number" id="bedroomCount"  onChange={handleChange} value={formData.bedroomCount} className="p-2 border border-gray-400 shadow-gray-200 shadow-sm hover:shadow-md rounded-md" min='1' max='10' required/>
                            <span>Bedrooms</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <input type="number" id="bathroomCount"  onChange={handleChange} value={formData.bathroomCount} className="p-2 border border-gray-400 shadow-gray-200 shadow-sm hover:shadow-md rounded-md" min='1' max='10' required/>
                            <span>Bathrooms</span>
                        </div>
                        <div className="flex gap-3">
                            <input type="number" id="regularPrice"  onChange={handleChange} value={formData.regularPrice} min="50" max="10000000" className="p-2 border border-gray-400 shadow-gray-200 shadow-sm hover:shadow-md rounded-md" required/>
                            <div className="flex flex-col items-center">
                                <span>Regular Price</span>
                                <span className="text-xs font-semibold">($ / month)</span>
                            </div>
                        </div>
                        {formData.offer && (
                        <div className="flex gap-3">
                            <input type="number" id="discountedPrice"  onChange={handleChange} value={formData.discountedPrice} min="0" max="10000000" className="p-2 border border-gray-400 shadow-gray-200 shadow-md rounded-md" required/>
                            <div className="flex flex-col items-center">
                                <span>Discounted Price</span>
                                <span className="text-xs font-semibold">($ / month)</span>
                            </div>
                        </div>)}
                    </div>

                </div>
                
                <div className="flex flex-col gap-3 mt-6 flex-1">
                    <p className="font-semibold">Images:
                        <span className="font-normal after:text-gray-700 ml-1">The first image will be the cover (max 6)</span>
                    </p>
                    <div className="flex gap-4">
                        <input onChange={handleFileUpload} className='p-3 border border-gray-400 rounded-md shadow-gray-200 shadow-sm bg-white w-full' type="file" id="images" accept="image/*" multiple/>
                        <button disabled={uploading} type="button" onClick={handleImageSubmit} className='p-3 bg-gray-600 text-slate-100 shadow-sm shadow-gray-400 hover:opacity-95 hover:shadow-md disabled:opacity-80 text-center rounded-md'>
                          {uploading ? "Uploading..." : "Upload"}
                        </button>
                    </div>
                    <p className='text-red-700 mx-auto text-sm'>{imageUploadError && imageUploadError }</p>
                    {formData.imageURLs.length > 0 ? formData.imageURLs.map((URL, index) => 
                      
                          <div key={URL} className='flex justify-between p-3 border items-center'>
                            <img src={URL} className='h-20 w-20 object-contain rounded-lg' alt='listing image' />
                            <button type="button" onClick={() => handleDeleteImage(index)} className='p-3 text-red-700 rounded-md hover:opacity-80'>Delete</button>
                          </div>
                      )
                     : <p className='text-gray-600'>Uploaded images will appear here:</p>
                     }
                    <button disabled={submitting || uploading} className="bg-green-700 text-slate-100 p-3 mt-4 rounded-md shadow-sm shadow-gray-400 w-full hover:opacity-95 disabled:opacity-80 text-center mx-auto" type="submit">
                      {submitting ? "Updating..." : "Update Listing"}
                      </button>
                    
                    {submitError && <p className='text-red-700 text-sm'>{submitError}</p>}

                </div>
            </form>
        </div>
    </main>
  )
}
