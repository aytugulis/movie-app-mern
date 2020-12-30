import React, { useEffect,useState } from 'react'
import './favorite.css';
import axios from 'axios'
import {Popover} from 'antd'
import { IMAGE_URL } from '../../Config';

function FavoritePage() {

    const variables = {userFrom: localStorage.getItem('userId')}
    

    const [FavoritedMovies, setFavoritedMovies] = useState([])

    useEffect(() => {
        fetchFavoritedMovies();
    }, [])

    const fetchFavoritedMovies = () => {
        axios.post('/api/favorite/getFavoritedMovie',variables)
        .then(response=>{
            if(response.data.success){
                setFavoritedMovies(response.data.favorites)
            }else{
                alert('Failed to get favorited videos')
            }
        })
    }

    const onClickRemove = (movieId) => {

        const variable = {
            movieId: movieId ,
            userFrom: localStorage.getItem('userId')
        }

        axios.post('/api/favorite/removeFromFavorite',variable)
        .then(response=>{
            if(response.data.success){
                fetchFavoritedMovies();
            }else{
                alert('Failed to remove from favorite')
            }
        })

    }

    const renderTableBody = FavoritedMovies.map((movie,index)=>{
        
        const content = (
            <div>
                {movie.movieImage ?
                <img src={`${IMAGE_URL}w500${movie.movieImage}`} alt="moviePost"/>
                :
                "No Image"
                }
            </div>
        )

        return <tr>
            <Popover content={content} title={`${movie.movieTitle}`}>

            <td>{movie.movieTitle}</td>

            </Popover>
            <td>{movie.movieRunTime}</td>
            <td><button onClick={()=>onClickRemove(movie.movieId)}>Remove from the favorites</button></td>
        </tr>
    })

    return (
        <div style={{width:'85%', margin:'3rem auto'}}>
            <h3>Favorite Movies By Me</h3>
            <hr/>
            <table>
                <thead>
                    <tr>
                    <th>Movie Title</th>
                    <th>Movie Runtime</th>
                    <th>Remove from favorites.</th>
                    </tr>
                </thead>
                <tbody>
                    {renderTableBody}
                </tbody>
            </table>
        </div>
    )
}

export default FavoritePage
