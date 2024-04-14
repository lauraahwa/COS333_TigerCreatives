import React from 'react'
import styled from 'styled-components'
import painting from '@/assets/painting.png'
import Button from './Button'

const Container = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 2vw;

    @media (max-width: 900px) {
        grid-template-columns: repeat(2, 1fr);
    }

`
const StyledButton = styled(Button)`
  visibility: hidden;
  padding: 6px 17px;
  opacity: 0;
  transition: opacity 0.3s ease;
  position: absolute;
  bottom: 50%;
  left: 50%;
  font-size: 0.7rem;
  transform: translateX(-50%);
  z-index: 3;
`

const Item = styled.div`
    position: relative;
    transition: background-color 0.3s ease;
    background-color: var(--container-color);
  
    &:hover::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.4);
        pointer-events: none;
        z-index: 2;
    }

    &:hover ${StyledButton} {
      visibility: visible;
      opacity: 1;
      transition: visibility 0s, opacity 0.3s ease;
    }
  
  h1 {
    font-weight: 600;
    font-size: 1.5rem;
  }

  h2 {
    font-weight: 500;
    margin-top: 14px;
    margin-bottom: 17px;
    font-size: 1.25rem;
  }

  p {
    font-weight: 400;
    margin-top: 6px;
    font-size: 1rem;
    line-height: 1.2rem;
  }

  a {
    text-decoration: none;
  }

`

const TextContainer = styled.div`
    padding-left: 12px;
    padding-right: 12px;
`

const ItemImage = styled.img`
  width: 100%;
  height: auto;

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
`

const Grid = ({ isLanding, data }) => {
  const length = isLanding ? 8 : 16

  return (
    <>
      <Container>
        {data.map((item, index) => (
          <Item>
            <ItemImage src={item.image_url} />
            <TextContainer>
              <h1>{item.title}</h1>
              <p>{item.description}</p>
              <h2>${item.price}</h2>
            </TextContainer>
            <a href="/listing">
              <StyledButton text="view details" />
            </a>
          </Item>
        ))}
        {data.map((item, index) => (
          <Item>
            <ItemImage src={item.image_url} />
            <TextContainer>
              <h1>{item.title}</h1>
              <p>{item.description}</p>
              <h2>${item.price}</h2>
            </TextContainer>
            <a href="/listing">
              <StyledButton text="view details" />
            </a>
          </Item>
        ))}

      </Container>

    </>
  )
  
}

export default Grid