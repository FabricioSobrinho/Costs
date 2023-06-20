import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./components/pages/Home"
import Contato from "./components/pages/Contact"
import Company from "./components/pages/Company"
import NewProject from "./components/pages/NewProject"

import Container from "./components/layout/Container"

import NavBar from "./components/layout/NavBar"
import Footer from "./components/layout/Footer"

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar></NavBar>
        <Container customClass="min-height">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/company" element={<Company />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/newproject" element={<NewProject />} />
          </Routes>
        </Container>
        <Footer></Footer>
      </Router>
    </div>
  )
}

export default App
