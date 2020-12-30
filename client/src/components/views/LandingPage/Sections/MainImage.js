import { Typography } from 'antd'
import React from 'react'

const {Title} = Typography

function MainImage(props) {
    return (
        <div style={{
        background:`url('${props.image}'), #1c1c1c`,
        height: '500px',
        backgroundSize: '100%, cover',
        backgroundRepeat:'no-repeat',
        backgroundPosition: 'center, center',
        width: '94.5%',
        position: 'relative',
        margin:'0px auto'}}>

            <div>
                <div style={{ position:'absolute', maxWidth:'500px', bottom:'2rem',marginLeft:'2rem'}}>
                    <Title style={{color:'white'}} level={2}>{props.title}</Title>
                    <p style={{color:'white', fontSize:'1rem'}}>{props.text}</p>
                </div>
            </div>

        </div>
    )
}

export default MainImage
