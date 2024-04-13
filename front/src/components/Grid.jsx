import React from 'react'
import styled from 'styled-components'
import painting from '@/assets/painting.png'

const Container = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 2vw;

    @media (max-width: 900px) {
        grid-template-columns: repeat(2, 1fr);
    }

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
        background-color: rgba(0, 0, 0, 0.4); // Semi-transparent black overlay
        pointer-events: none; // Allows clicks to pass through
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

const Grid = () => {
  return (
    <Container>
      <Item>
        <ItemImage src={painting} />
        <TextContainer>
          <h1>Painting</h1>
          <p>Painted using oil and canvas by Jack O'Donnell</p>
          <h2>$65.00</h2>
        </TextContainer>
      </Item>
      <Item>
        <ItemImage src={painting} />
        <TextContainer>
          <h1>Painting</h1>
          <p>Painted using oil and canvas by Jack O'Donnell</p>
          <h2>$65.00</h2>
        </TextContainer>
      </Item>
      <Item>
        <ItemImage src={painting} />
        <TextContainer>
          <h1>Painting</h1>
          <p>Painted using oil and canvas by Jack O'Donnell</p>
          <h2>$65.00</h2>
        </TextContainer>
      </Item>
      <Item>
        <ItemImage src={painting} />
        <TextContainer>
          <h1>Painting</h1>
          <p>Painted using oil and canvas by Jack O'Donnell</p>
          <h2>$65.00</h2>
        </TextContainer>
      </Item>
    </Container>
  )
  
}

export default Grid