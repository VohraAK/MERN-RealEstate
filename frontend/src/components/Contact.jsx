import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiMail } from "react-icons/fi";


// eslint-disable-next-line react/prop-types
export default function Contact({listing}) {
    const [landlord, setLandlord] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchLandlord = async () => {
            try 
            {
                // eslint-disable-next-line react/prop-types
                const response = await fetch(`/api/user/${listing.userRef}`);
                const data = await response.json();
                setLandlord(data);
            } 
            catch (error) {console.log(error)}
        };

        fetchLandlord();

    // eslint-disable-next-line react/prop-types, react-hooks/exhaustive-deps
    }, [listing.userRef]);

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    console.log(message);

  return (
    <>
        {landlord && (
            <div className="flex flex-col gap-2 mt-5">
                <p>Contact <span className="font-semibold">{landlord.username}</span> for <span className="font-medium">{listing.name}</span></p>
                <textarea className="p-3 rounded-md border border-slate-400 shadow-md" name="message" id="message" rows="2" cols="30" value={message} placeholder="Message" onChange={handleMessageChange}></textarea>
                <Link to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}>
                    <button className="bg-slate-600 text-slate-100 p-3 mt-3 rounded-md shadow-sm shadow-gray-400 hover:opacity-95 disabled:opacity-80 w-full uppercase mx-suto">Send Message</button>
                </Link>
            </div>
        )}
    </>
  )
}
