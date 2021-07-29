import React from 'react'
import styled from 'styled-components'


const ImageWrapper = styled.div`
    width: 17%;
    height: 300px;
    margin: 10px;
`

const PhotoDescription = styled.div`
    display:none;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    background: 'green';
    text-align: center;
    padding: 30% 0;
    height: 50%;
    position: relative;
    top: -300px;
    z-index: -1;
`

const Image = styled.img`
    height: 100%;
    width: 100%;
`

const Link = styled.a`
    :hover + ${PhotoDescription} {
        display: block;
        cursor: grab;
    }
    :hover {
        opacity: 0.3;
    }
`

function Photo(props) {
    const url = props.url
    const photographer = props.photographer

    return (
        <ImageWrapper>
            <Link href={url} target="_blank">
                <Image src={url} alt={photographer} />
            </Link>
            <PhotoDescription>
                <h3>Photographer:</h3>
                <span>{photographer}</span>
            </PhotoDescription>
       </ImageWrapper>
    )
}

export default Photo
