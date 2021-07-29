import axios from 'axios'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import Photo from './Photo'
import React, { useState, useEffect, useRef } from 'react'
import SearchBar from './SearchBar'
import styled from 'styled-components'


const PhotoViewerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    align-items: center;
`

const SearchBarWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
`

const CarouselWrapper = styled.div`
    display: flex;
    flex-direction: row;
    height: 100%;
    width: 80%;

`

const Carousel = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    height: 100%;
    width: 100%;

`

const Button = styled.button`
    background: ${props => props.pageButton ? 'none' : 'lightblue'};
    justify-content: center;
    border: none;
    text-decoration: underline;
    :hover {
        opacity: 0.3;
        cursor: grab;
    }
`

const PaginationButton = styled(Button)`
    font-weight: ${props => props.isCurrentPage ? 'bold' : 'normal'}
`

const PageNumbers = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
`

//search bar sends back query results
//in photoviewer, set query state to query results
//pass page num to getPageNumberRequested to invoke fetchSearchResults
//arrow key onclick invokes getPageNumber Requested function
//getPageNumberRequested checks if query state is not empty
//if not empty, invoke fetchSearchResults function and pass in page num
//fetchSearchResults sends query to search endpoint and passes in query state and page num as params
// query returns search response
// setPhotos key= page num, value = response.data.photos
// setPageNum to page num


//pagination
//update api calls to return back total pages
//create pageNumbersToDisplay state
//update pageNumbersToDisplay when pageNum changes
    //if array size > 5, slice and keep last 5 
//iterate over pageNumbersToDisplay array and render the numbers



function PhotoViewer(props) {
    const [pageNum, setPageNum] = useState(1)
    const [query, setQuery] = useState('')
    const [photosByPage, setPhotos] = useState({ '': { 1: props.photos } })
    const [newSearchStatus, setSearchStatus] = useState(false)
    const [totalPages, setTotalPages] = useState(props.totalPages)

    const usePrevious = (query) => {
        const ref = useRef()
        useEffect(() => {
            ref.current = query
        })
        return ref.current
    }

    const prevQuery = usePrevious(query)

    function getSearchResults(queryResults) {
        setQuery(queryResults)
    }

    useEffect(() => {
        if (query !== prevQuery) {
            getPageNumberRequested(1)
        }
    })

    useEffect(() => {
    }, [newSearchStatus])

    const getPageNumbersToDisplay = () => {
        let pageNumbersToDisplay = []

        for (let numToAdd = -2; numToAdd < 3; numToAdd++) {
            const pageToDisplay = pageNum + numToAdd
            if (1 <= pageToDisplay && pageToDisplay <= totalPages) {
                pageNumbersToDisplay.push(pageToDisplay)
            }
        }
        return pageNumbersToDisplay
    }

    const pageNumbersToDisplay = getPageNumbersToDisplay()

    async function fetchSearchResults(pageNumber) {
        try {
            if (!photosByPage[query] || !photosByPage[query][pageNumber]) {
                const response = await axios.get('/api/photos/search', {
                    params: {
                        'query': query,
                        'page_num': pageNumber
                    }
                });
                if (!photosByPage[query]) {
                    photosByPage[query] = {}
                }
                photosByPage[query][pageNumber] = response.data.photos['photo_info']
                setPhotos(photosByPage)
                setSearchStatus(true)
                setTotalPages(response.data.photos['total_pages'])
            }
            setPageNum(pageNumber)
        } catch (error) {
            console.error(error);
        }
    }

    async function fetchCuratedResults(pageNumber) {
        try {
            if (!photosByPage[query][pageNumber]) {
                const response = await axios.get('/api/photos/curated', {
                    params: {
                        'page_num': pageNumber
                    }
                });
                photosByPage[query][pageNumber] = response.data.photos['photo_info']
                setPhotos(photosByPage)
                setSearchStatus(true)
                setTotalPages(response.data.photos['total_pages'])
            }
            setPageNum(pageNumber)
        } catch (error) {
            console.error(error);
        }
    }

    const getPageNumberRequested = (num, direction) => {
        const pageNumber = num ? num : pageNum + direction

        if (pageNumber <= 0) return null

        if (query.length > 0) {
            fetchSearchResults(pageNumber)
        }
        else {
            fetchCuratedResults(pageNumber)
        }
    }

    const photosToDisplay = photosByPage[query] ? (photosByPage[query][pageNum] || []) : []

    return (
        <PhotoViewerWrapper>
            <SearchBarWrapper>
                <SearchBar pageNum={pageNum} searchResults={getSearchResults} />
            </SearchBarWrapper>
            <CarouselWrapper>
                <Carousel>
                    {photosToDisplay.length !== 0 && (
                        photosToDisplay.map(photo => (
                            <Photo url={photo['url']} photographer={photo['photographer']} />
                        ))
                    )}
                </Carousel>
            </CarouselWrapper>
            <PageNumbers>
                <Button onClick={()=> getPageNumberRequested(null, -1)} pageButton><FaAngleLeft /></Button>
                {pageNumbersToDisplay.length >= 1 && pageNumbersToDisplay.map(displayNum => (
                    <PaginationButton
                        onClick={() => getPageNumberRequested(displayNum, null)}
                        pageButton
                        isCurrentPage={displayNum === pageNum}>
                        {displayNum}
                    </PaginationButton>
                ))}
                <Button onClick={() => getPageNumberRequested(null, 1)} pageButton><FaAngleRight /></Button>
            </PageNumbers>
        </PhotoViewerWrapper>
    )
}

export default PhotoViewer