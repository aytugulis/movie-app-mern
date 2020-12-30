import React, { useEffect ,useState} from 'react'
import {Badge, Button} from 'antd'
import axios from 'axios'
import '../MovieDetailPage'

function Favorite(props) {

    const [FavoriteNumber, setFavoriteNumber] = useState(0)
    const [Favorited, setFavorited] = useState(false)

    const variable = {
        userFrom: props.userFrom ,
        movieId: props.movieId,
        movieTitle: props.movieInfo.original_title,
        movieImage: props.movieInfo.backdrop_path,
        movieRunTime: props.movieInfo.runtime,
    }

    useEffect(() => {

        axios.post('/api/favorite/favoriteNumber',variable)
            .then(response => {
                if(response.data.success){
                    setFavoriteNumber(response.data.favoriteNumber)
                }
            })

        axios.post('/api/favorite/favorited',variable)
        .then(response => {
            if(response.data.success){
                setFavorited(response.data.favorited)
            }
        })

    }, [])

    const onClickFavorite = () => {
        if(Favorited) {
            axios.post('/api/favorite/removeFromFavorite', variable)
            .then((response) => {
                if(response.data.success) {
                    setFavoriteNumber(FavoriteNumber-1)
                    setFavorited(!Favorited)  
                }else{
                    alert('Please login first.')
                }
            })
        }else{
            axios.post('/api/favorite/addToFavorite', variable)
                .then(response => {
                    if(response.data.success) {
                        setFavoriteNumber(FavoriteNumber+1)
                        setFavorited(!Favorited)
                    }else{
                        alert('Please login first.')
                    }
                })
        }
    }
    
    return (
        <div>
            <Button onClick={onClickFavorite}>{Favorited ? "Remove From Favorite": "Add To Favorite"}</Button>
            <Badge style={{ backgroundColor: '#46B9FF' }} className="favorite-badge" count={FavoriteNumber} showZero />
        </div>
    )
}

export default Favorite