import styled from "styled-components";

export const StyledPost = styled.li`
  width: 100%;
  max-width: 600px;
  padding: 20px;
  border: none;
  border-bottom: 1px solid #00000080;
`;

export const Interactions = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  background: none;
  border: none;
  color: black;

  svg {
    fill: none;
    stroke: ${({ theme }) => theme.colors.accent};
    stroke-width: 2px;
    font-size: 20px;
  }

  &.active {
    color: ${({ theme }) => theme.colors.accent};
    svg {
      fill: ${({ theme }) => theme.colors.accent};
    }
  }
`;
