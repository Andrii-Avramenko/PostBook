import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  gap: 32px;
  max-width: ${({ theme }) => theme.layout.desktop};
  margin: 0 auto;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.main`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  justify-content: start;
  align-items: center;
`;
