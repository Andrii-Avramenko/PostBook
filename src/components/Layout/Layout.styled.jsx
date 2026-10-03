import styled from "styled-components";

export const Wrapper = styled.main`
  display: flex;
  gap: 32px;
  max-width: ${({ theme }) => theme.layout.desktop};
  margin: 0 auto;
  justify-content: center;
  align-items: center;
`;
