import React from 'react'
import {Col} from 'antd'


function GridCard(props) {

    if(props.actor){
        return (
            <Col lg={6} md={8} xs={24}>
                <div style={{position:'relative'}}>
                        <img style={{width:'100%', height:'410px'}} src={props.image} alt=""/>
                </div>
            </Col> 
        )
    }else{
        return (
            <Col lg={6} md={8} xs={24}>
                <div style={{position:'relative'}}>
                    <a href={`/movie/${props.movieId}`}>
                        <img style={{width:'100%', height:'410px'}} src={props.image} alt=""/>
                    </a>
                </div>
            </Col>
        )
    }


}

export default GridCard
