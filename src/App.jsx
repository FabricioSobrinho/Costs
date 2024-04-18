import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Contato from "./pages/Contact";
import Projects from "./pages/Projects";
import Empresa from "./pages/Empresa";
import NewProject from "./pages/NewProject";
import Project from "./pages/Project";

import Container from "./components/layout/Container";

import NavBar from "./components/layout/NavBar";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Container customClass="min-height">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/empresa" element={<Empresa />} />
            <Route path="/newproject" element={<NewProject />} />
            <Route path="/projects/:name" element={<Project />} />
          </Routes>
        </Container>
        <Footer></Footer>
      </Router>
    </div>
  );
}

export default App;
