import { Route, Routes } from "react-router-dom"
import { Layout } from "./components/Layout/Layout"
import { Home } from "./pages/Home"
import { Login } from "./pages/Login/Login"
import { GlobalStyle } from "./components/GlobalStyle"
import { Register } from "./pages/Login/Register"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
        <Route  path="/login" element={<Login />} />
        <Route  path="/register" element={<Register />} />
      </Routes>
      <GlobalStyle />
    </>
  )
}

export default App
