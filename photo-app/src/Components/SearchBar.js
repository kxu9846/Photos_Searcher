import React, { useState } from 'react'
import styled from 'styled-components'

const SearchBarContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
`
const Form = styled.form`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 1%;
    width: 40%;
`

const Input = styled.input`
    ccolor: grey;
    border-radius: 5px;
    padding-left: 20px;
    border: 1px solid lightblue;
    height:48px;
    font-size: 12pt;
    font-weight: lighter;
    width: 75%;
    outline: none;
`
const SubmitButton = styled.button`
    height:48px;
    background-color: lightblue;
    color: white;
    border-radius: 5px;
    border: none;
    font-size: 12pt;
    width: 20%;
    &:hover {
        opacity: 0.7;
        cursor: grab;
      }
`

function SearchBar(props) {
    const [inputValue, setInputValue] = useState("What are you searching for?")

    const changeHandler = (e) => {
        setInputValue(e.target.value)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        props.searchResults(inputValue)
    }

    return (
        <SearchBarContainer>
            <Form action="/" method="get" onSubmit={submitHandler}>
                <Input
                    type="text"
                    placeholder = {inputValue}
                    onChange={changeHandler}
                    inputField
                />
                <SubmitButton type="submit" submitButton>
                    Search
                </SubmitButton>
            </Form>
        </SearchBarContainer>
    )
}

export default SearchBar
