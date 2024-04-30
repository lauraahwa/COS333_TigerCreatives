import React from 'react'
import styled from 'styled-components'

const Container = styled.button`
    padding: 12px 39px;
    border: 1px solid #3A3A3A;
    border-radius: 15px;
    background-color: #FFF;
    font-size: 1.5rem;
    font-weight: 400;
    width: auto;


    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    flex-shrink: 0;

    &:active {
        box-shadow: inset 0px 2px 5px rgba(0, 0, 0, 0.2); /* Adjust for active/clicked state */
    }

`

const Button = ({ className, text, onClick }) => {
  return (
    <Container onClick={onClick} className={className}>
        {text}
    </Container>
  )
}

export default Button