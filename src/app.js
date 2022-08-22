import React from 'react';
import { useEffect,useState } from 'react';
import MovieCard from "./moviecard";
import Footer from "./footer";
import searchIcon from './search.svg';
import './App.css';

const API_URL = 'https://www.omdbapi.com?apikey=b5eae32a';

const App = () =>{
    const[searchTerm, setSearchTerm] = useState("");
    const[movies,setMovies] = useState([]);
    useEffect(() =>{
        searchMovies("batman");
    },[]);

    const searchMovies = async(title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        setMovies(data.Search);
    };
   
   
    return(
        <div className="app">

        <h1>Movie Search</h1>

            <div className="search">
            <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for movies"
             />
            <img
                src={searchIcon}
                alt="search"
                onClick={() => searchMovies(searchTerm)}
            />
            </div>

            {
                movies.length >0 
                ? (
                <div className="container">
                    {movies.map((movie)=>(
                        <MovieCard movie ={movie} onClick={() => searchMovies(searchTerm)} />
                    ))}
                </div>
            ):(
                <div className="empty">
                    <h2>No movies found</h2>
                </div>
            )}

            <Footer/>
        </div>
    );
};

export default App;