import styled from "styled-components";

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: minmax(0px, 280px) minmax(0px, 600px) minmax(0, 280px);
  min-height: 100vh;
  gap: 32px;
  max-width: ${({ theme }) => theme.layout.desktop};
  margin: 0 auto;
  justify-content: center;
`;

export const Content = styled.main`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  width: 100%;
  justify-content: start;
  align-items: center;
  background-color: ${({theme}) => theme.colors.contentBg};
`;

export const RightSidebar = styled.aside`
  position: sticky;
  top: 0;
  align-self: start;
  height: 100vh;
  overflow-y: auto;
`;