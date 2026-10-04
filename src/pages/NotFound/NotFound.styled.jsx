import styled from "styled-components";

export const StyledNotFound = styled.div`
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    gap: 10px;
    justify-content: center;
    align-items: center;
    text-align: center;
    
    h1 {color: ${({theme}) => theme.colors.accent};}

    svg {
        max-width: 250px;
        width: 100%;
        fill: ${({theme}) => theme.colors.accent}
    }
`

export const ErrorCode = styled.code`
    font-size: 14px;
    color: black;
`