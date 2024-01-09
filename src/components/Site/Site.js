import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./Header";
import Pricing from "./Pricing";
import Home from "./Home";
import Footer from "./Footer";

export default function Site() {
  return (
    <div>
      <Header />
      <main className="flex-1 relative overflow-y-auto focus:outline-none">
        <div className="w-screen">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/pricing" element={<Pricing />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  );
}
