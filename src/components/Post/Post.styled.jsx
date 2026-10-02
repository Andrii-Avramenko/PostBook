import styled from "styled-components";

export const StyledPost = styled.li`
  padding: 20px;
  border: 1px solid #00000080;
  border-radius: 20px;
`;

export const Interactions = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
`

export const LikeButton = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  background: none;
  border: none;
  color: black;

  svg {
    fill: none;
    stroke: red;
    stroke-width: 1px;
    font-size: 20px;
  }

  &.liked {
    color: red;
    svg {
      fill: red;
    }
  }
`;

export const Bookmark = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  background: none;
  border: none;
  color: black;

  svg {
    fill: none;
    stroke: orange;
    stroke-width: 1px;
    font-size: 20px;
  }

  &.saved {
    color: orange;
    svg {
      fill: orange;
    }
  }
`;
