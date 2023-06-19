import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import Home from "./components/pages/Home"
import Contato from "./components/pages/Contact"
import Company from "./components/pages/Company"
import NewProject from "./components/pages/NewProject"

import Container from "./components/layout/Container"

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Link to="/">Home</Link>
          <Link to="/company">company</Link>
          <Link to="/contato">Contact</Link>
          <Link to="/newproject">Novo projeto</Link>
        </div>
        <ul>
          <li>Home</li>
          <li>Contato</li>
        </ul>
        <Container customClass="min-height">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/company" element={<Company />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/newproject" element={<NewProject />} />
          </Routes>
        </Container>
        
      </Router>
    </div>
  )
}

export default App
