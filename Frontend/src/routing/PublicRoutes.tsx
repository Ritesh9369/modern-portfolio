import { Routes, Route } from "react-router-dom";

import MainLayout from "../layout/public_layout/MainLayout";

import Home from "../pages/Public_Pages/Home/Home";
import About from "../pages/Public_Pages/About/About";
import Skills from "../pages/Public_Pages/Skills/Skills";
import Projects from "../pages/Public_Pages/Projects/Projects";
import Contact from "../pages/Public_Pages/Contact/Contact";

const PublicRoutes = () => {
  return (
    <Routes>

      <Route path="/" element={<MainLayout />}>

        <Route index element={<Home />} />

        <Route path="about" element={<About />} />

        <Route path="skills" element={<Skills />} />

        <Route path="projects" element={<Projects />} />

        <Route path="contact" element={<Contact />} />

      </Route>

    </Routes>
  );
};

export default PublicRoutes;