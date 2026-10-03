import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { Home } from "./pages/Home/Home";
import { Login } from "./pages/Login/Login";
import { GlobalStyle } from "./components/GlobalStyle";
import { Register } from "./pages/Login/Register";
import MakePost from "./pages/MakePost/MakePost";
import { ProfileOrPost } from "./components/ProfileOrPost";
import { Following } from "./pages/Home/Following";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/following" element={<Following />} />
          <Route path="/:id" element={<ProfileOrPost />} />
          <Route path="/newpost" element={<MakePost />} />
          <Route path="*" element={<p>error</p>} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <GlobalStyle />
    </>
  );
}

export default App;
