import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Site() {
  return (
    <div>
      <Header />
      <main className="flex-1 relative overflow-y-auto focus:outline-none">
        <div className="w-screen">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}
