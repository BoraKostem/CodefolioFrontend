import React, { useState } from 'react';

const Home = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    
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

    return (
        <div className='w-full h-screen flex flex-col items-center justify-center codefoliobg-white'>
            <h1 className='text-6xl font-bold codefolio-gray mb-10'>Codefolio</h1>
            <div className="relative flex items-center w-1/2 h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
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
                    onChange={handleSearchChange}
                />
            </div>
            {suggestions.length > 0 && (
                <ul className='mt-4 w-1/2 bg-white border rounded-lg max-h-60 overflow-y-auto'>
                    {suggestions.map((suggestion, index) => (
                        <li key={index} className='px-4 py-2 text-black hover:bg-gray-200 cursor-pointer'>
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Home;