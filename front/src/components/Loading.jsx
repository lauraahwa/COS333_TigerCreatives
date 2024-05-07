import React from "react";
import styled from 'styled-components'
import loading from "@/assets/loading.svg";

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Loading = () => (
    <Container>
        <div className="spinner">
            <img src={loading} alt="Loading" />
        </div>
    </Container>
);

export default Loading;