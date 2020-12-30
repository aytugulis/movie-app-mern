import React, {useEffect,useState} from 'react';
import { API_KEY, API_URL, IMAGE_URL } from '../../Config';
import {Typography, Row, BackTop} from 'antd';
import GridCard from './Sections/GridCard';
import MainImage from './Sections/MainImage';

const {Title} = Typography;

function LandingPage() {

    const [Movies, setMovies] = useState([])
    const [CurrentPage, setCurrentPage] = useState(0)

    useEffect(()=>{
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        fetchMovies(endpoint)
    },[])

    const fetchMovies = (path) => {
        fetch(path)
        .then(response => response.json())
        .then((response) => {
            console.log(response);
            setMovies([...Movies, ...response.results])
            setCurrentPage(response.page)
        })
    }

    const handleClick = () => {
        let endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage+1}`
        fetchMovies(endpoint)
    }

    const style = {
        height: 40,
        width: 40,
        lineHeight: '40px',
        borderRadius: '100%',
        backgroundColor: '#46b9ff',
        color: '#fff',
        textAlign: 'center',
        fontSize: 14
      };
    
    return (
        <div style={{width:'100%', margin: 0}}>

        {Movies[0]&&  
            <MainImage
            
            image={`${IMAGE_URL}/w1280${Movies[0].backdrop_path && Movies[0].backdrop_path}`} 
            title={Movies[0].original_title} 
            text={Movies[0].overview} 
            />
        }

            
            {/* BODY */}
            <div style={{width:'85%',margin:'1rem auto'}}>
                <Title level={2}>Movies by latest</Title>
                <hr/>
                {/* GRID CARDS */}
                <Row gutter={[16,16]}>
                    {Movies && Movies.map((movie,index)=>(
                        <React.Fragment key={index}>
                            <GridCard 
                                image={movie.poster_path && `${IMAGE_URL}w500${movie.poster_path}`}
                                movieId={movie.id}
                            />
                        </React.Fragment>
                    ))}
                </Row>

                {/* LOAD MORE BUTTON */}
                <br/>
                <div style={{display:'flex', justifyContent:'center'}}>
                    <button onClick={handleClick}>Load More</button>
                </div>

            </div>
            <BackTop>
                <div style={style}>UP</div>
            </BackTop>

        </div>
    )
}

export default LandingPage
