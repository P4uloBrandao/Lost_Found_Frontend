import React from "react";
import "./Layout.css";
import Navbar from "../Layout/Layout.jsx";

// Pass the child props
export default function Layout({ children }) {
  return (
    <div>
      {/* Attaching all file components */}
      <Navbar />
      {children}
      {/* <Footer />  */}
    </div>
  );
}