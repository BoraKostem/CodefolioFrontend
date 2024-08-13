import React,{useState} from 'react'
import { API_BASE_URL } from '../../utils/config';
import ClipLoader from "react-spinners/ClipLoader";

const EditGithubPopup = ({ field, userData, onClose }) => {
    const [value, setValue] = useState(userData);
    const [loading, setLoading] = useState(false);

    const handleSave = async() => {

        const accessToken = localStorage.getItem('accessToken');

        try{
            setLoading(true);
            const response = await fetch(`${API_BASE_URL}/profile/github`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ github_url: value })
            });
            if (!response.ok) {
                if (response.status === 401) {
                    console.error('Unauthorized: Access token expired or invalid');
                } else {
                    throw new Error('Failed to upload CV');
                }
                return;
            }
            console.log(`Updated ${field}:`, value);
            const data = await response.json();
            console.log(data);
            onClose();
            setLoading(false);
        }catch(error){
            console.error('Error:', error);
        }
   
       
    };
  return (
    <div>
          <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          {loading ? (
        <div className="flex justify-center items-center">
        <ClipLoader
          color={"#F4CE14"}
          loading={loading}
          size={120}
          aria-label="Loading Spinner"
          data-testid="loader"
          
        />
        </div>
      ) :(
            <div className='codefoliobg-gray p-6 rounded-md'>
                <h2 className='text-2xl codefolio-yellow mb-4'>Edit {field}</h2>
                
                <input
    type="text"
    value={value}  // Use the value state here
    onChange={(e) => setValue(e.target.value)}
    className='w-full py-2 mb-4 bg-transparent border-b outline-none focus:outline-none codefolio-white'
/>

        

                <button onClick={handleSave} className='w-full py-2 codefoliobg-yellow rounded-md text-center text-black mb-2'>Save</button>
                <button onClick={onClose} className='w-full py-2 codefolio-white-border rounded-md text-center'>Cancel</button>
            </div>
      )}
        </div>
    </div>
  )
}

export default EditGithubPopup
