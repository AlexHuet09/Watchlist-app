import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";

export default function Index () {

    //state to store the search bar input value
    const [formData, setFormData] = useState({
        search: "",
        title:"",
    })

    //state for the api we fetch
    const [apiData, setApiData] = useState([])

    //function to update the state with the input value
    function handleChange(event) {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
          ...prevFormData,
           [name]:value,
        }));

      }

      function handleSubmitSearch(e) {
        e.preventDefault();
        fetch(`http://www.omdbapi.com/?s=${formData.search}&apikey=c30e9c6c`)
        .then((response) => response.json())
        .then((data) => setApiData(data.Search));
        console.log(apiData)
      }
      function handleSubmitTitle(e) {
        e.preventDefault();
        fetch(`http://www.omdbapi.com/?t=${formData.title}&apikey=c30e9c6c`)
        .then((response) => response.json())
        .then((data) => console.log(data));
      }



      const list = apiData.map((object) => {
        return (
            <div key= {object.imdbID}>
                <h1>{object.Title}</h1>
                <img src={object.Poster}></img>
            </div>
        )
      })

      return (
        <div>
            <div>
            <form >
                <input
                    placeholder="wide search of movie"
                    className="search-input"
                    type="text"
                    name="search"
                    value={formData.search}
                    onChange={handleChange}
                ></input>
                <button onClick={handleSubmitSearch}>Search</button>
            <input
                    placeholder="type the exact movie title"
                    className="search-input"
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
            ></input>
            <button onClick={handleSubmitTitle}>Search</button>
            </form>
            </div>
        {apiData && (
            <div>{list}</div>
        )}
        </div>

      )
}