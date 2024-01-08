import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Container from "./components/layout/container/Container";
import Footer from "./components/layout/footer/Footer";
import NavBar from "./components/layout/nav-bar/NavBar";
import Company from "./components/pages/company/Company";
import Contact from "./components/pages/contact/Contact";
import Home from "./components/pages/home/Home";
import NewProject from "./components/pages/new-project/NewProject";
import Projects from "./components/pages/projects/Projects";

function App() {
  return (
    <Router>
      <NavBar />
      <Container customClass="min-height">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/company" element={<Company />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/newproject" element={<NewProject />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
