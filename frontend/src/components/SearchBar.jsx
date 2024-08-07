import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isSearchPerformed, setIsSearchPerformed] = useState(false);
    const [results, setResults] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setIsSearchPerformed(false);
    },[]);
    const allSuggestions = [
        'React',
        'JavaScript',
        'CSS',
        'HTML',
        'Node.js',
        'Express',
        'MongoDB',
        'Python',
        'Django',
        'Flask'
    ];

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query.length > 0) {
            const filteredSuggestions = allSuggestions.filter(suggestion =>
                suggestion.toLowerCase().includes(query.toLowerCase())
            );
            setSuggestions([...filteredSuggestions]);
        } else {
            setSuggestions([]);
        }
    };

    const handleUserClick = (id) => {
        navigate(`/user/${id}`);
    }
    const handleSearchClick = async() => {

        try{
            const response = await fetch(`https://qp6k69ftsi.execute-api.eu-central-1.amazonaws.com/prod/api/search?q=${searchQuery}`,{
                method: 'GET'
            });
            if(response.ok){
                const data = await response.json();
                console.log(data);
                setResults(data.content);
                setIsSearchPerformed(true);
            }
        }catch(error){
            console.log(error);
        }
        setSearchQuery("");
    };

    return (
        <div className={`w-full h-screen codefoliobg-white`}>
            <div className={`w-full flex flex-col items-center ${isSearchPerformed ? ' h-1/4 ' : 'h-screen justify-center'}`}>
                <h1 className='text-6xl font-bold codefolio-gray mb-10'>Codefolio</h1>
                <div className="relative w-1/2 flex items-center h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
                    <div className="grid place-items-center h-full w-12 text-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                        type="text"
                        id="search"
                        placeholder="Search.."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
            
                    <button 
                        className="ml-2 px-4 py-4 codefoliobg-yellow text-white rounded-lg"
                        onClick={handleSearchClick}
                    >
                        Search
                    </button>
                </div>
            </div>     
            { isSearchPerformed && (
                <div className='h-3/4 w-full'>
                    {results.map((result, index) => (
                        <div key={index} className="w-full m-5 flex items-center bg-white shadow-lg rounded-lg p-4 hover:bg-gray-200"
                            onClick={() => handleUserClick(result.id)}
                        >
                            <img 
                                src={result.profile_photo || 'https://via.placeholder.com/150'}
                                alt={result.name}
                                className="w-16 h-16 rounded-full mr-4"
                            />
                            <div>
                                <h2 className="text-lg font-bold">{result.name}</h2>
                                <p className="text-gray-600">{result.location || ' '}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Home;
