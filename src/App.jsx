// Rotas da aplicacao
import { BrowserRouter as Router, Routes, Route } from "react-router-dom" 

//importação das páginas
import Home from "./components/pages/Home"
import Contato from "./components/pages/Contact"
import Projects from "./components/pages/Projects"
import Empresa from "./components/pages/Empresa"
import NewProject from "./components/pages/NewProject"
import Project from "./components/pages/Project"

//Container de organização
import Container from "./components/layout/Container"

//Elementos fixos das páginas
import NavBar from "./components/layout/NavBar"
import Footer from "./components/layout/Footer"

function App() {
  return (
    <div className="App">
      <Router> {/*Rotas da apllicação e definição de elementos fixos no site*/}
        <NavBar></NavBar>
        <Container customClass="min-height">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/empresa" element={<Empresa />} />
            <Route path="/newproject" element={<NewProject/>}/>
            <Route path="/projects/:id" element={<Project />} />
          </Routes>
        </Container>
        <Footer></Footer>
      </Router>
    </div>
  )
}

export default App
