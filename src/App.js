import { Route, Routes } from "react-router-dom";
import "./App.styled.js";
import { AppContainer, GlobalStyles } from "./App.styled.js";
import RequireAuth from "./components/Auth/RequireAuth.js";
import Books from "./components/Books/index.js";
import Authors from "./components/Authors/index.js";
import Publishers from "./components/Publishers/index.js";
import Header from "./components/Header/index.js";
import Login from "./components/Login/index.js";
import AuthContextProvider from "./components/Contexts/AuthContextProvider.js";

/**
 *  Creates App component
 *  @returns {component} App component containing all components and routes of the page
 */
function App() {
  return (
    <AppContainer>
      <GlobalStyles />

      <AuthContextProvider>
        <Header />

        <Routes>
          {/* PUBLIC ROUTE */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Login register />} />

          {/* PROTECTED ROUTE */}
          <Route element={<RequireAuth />}>
            <Route path="/books" element={<Books />} />
            <Route path="/authors" element={<Authors />} />
            <Route path="/publishers" element={<Publishers />} />
          </Route>
        </Routes>
      </AuthContextProvider>
    </AppContainer>
  );
}

export default App;
