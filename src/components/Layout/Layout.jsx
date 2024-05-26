import React from "react";
import "./Layout.css";
import Navbar from "../NavBar/index.jsx"; // Corrigir o caminho conforme necessário
import WelcomeHeaderComponent from "../headerWithNameComponent/welcomeHeader.jsx";
import Footer from "../FooterComponent/index.jsx";

export default function Layout({ children }) { // Corrigido para 'children'
  return (
    <div className="layoutContainer">
      <Navbar />
      <div className="contentContainer">
        {children} {/* Corrigido para usar a propriedade 'children' corretamente */}
      </div>
      <Footer/>
    </div>
  );
}
