import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-image: url("https://images.unsplash.com/photo-1635094550905-c91409133300?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
  background-size: cover;
  background-position-y: center;
`;

export const ColorOverlay = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.accent};
  opacity: 0.5;
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 0 50px;
  height: 100vh;
  justify-content: center;
  align-items: center;
  border-left: 5px solid ${({ theme }) => theme.colors.accent};
  background-color: #fff;
`;

export const Input = styled.input`
  display: block;
  width: 200px;
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  font-size: 14px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 3px 10px 3px;

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
  }
`;

export const SubmitBtn = styled.button`
  padding: 10px 60px;
  border: none;
  border-radius: 20px;
  font-size: 14px;
  background-color: ${({ theme }) => theme.colors.accent};
  color: #fff;
  transition: box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1);

  &:hover,
  &:focus {
    box-shadow: rgba(0, 0, 0, 0.25) 0px 2px 10px 2px;
  }
`;
