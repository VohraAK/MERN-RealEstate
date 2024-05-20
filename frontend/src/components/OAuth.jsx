import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGoogleClick = async () => {
        try 
        {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            
            // Create signup popup
            const result = await signInWithPopup(auth, provider);
            const requestObject = {
                username: result.user.displayName,
                email: result.user.email, 
                photo: result.user.photoURL,
            };

            const response = await fetch('/api/auth/google', 
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(requestObject)
            });

            const data = await response.json();
            dispatch(signInSuccess(data));
            navigate('/')
        }
        catch (error) 
        {
            console.log(error);
        }
    };
  return (
    <button onClick={handleGoogleClick} type='button' className='bg-red-600 text-slate-100 p-2 rounded-md shadow-sm shadow-gray-400 hover:opacity-95 disabled:opacity-80'>
        Continue With Google
    </button>
  )
}
