import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const StyledHome = styled.section`
  display: flex;
  flex-direction: column;
  width: 600px;
  height: 100vh;
  overflow-y: scroll;
  justify-content: start;
  align-items: center;
  border-right: 1px solid #00000080;
  border-left: 1px solid #00000080;
`;

export const Selector = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(1, 1fr);
  width: 100%;
  justify-content: space-evenly;
  gap: 0px;
    border-bottom: 2px solid #e4e2dc;
`;

export const Page = styled(NavLink)`
    padding: 10px 0;
    border: none;
    text-align: center;
    text-decoration: none;
    font-weight: ${({theme}) => theme.weight.semibold};
    color: #6b6a66;

    &.active {
        border-bottom: 3px solid ${({theme}) => theme.colors.accent};
        font-weight: ${({theme}) => theme.weight.bold};
        color: ${({theme}) => theme.colors.accent};
    }
`

export const Posts = styled.ul`
    width: 100%;
`