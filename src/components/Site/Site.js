import React from "react"
import { Route, Switch } from "react-router-dom"
import Header from "./Header"
import Pricing from "./Pricing"
import Home from "./Home"
import Footer from "./Footer"

export default function Site() {
  return (
    <div>
      <Header />
      <main className="flex-1 relative overflow-y-auto focus:outline-none">
        <div className="w-screen">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/pricing" component={Pricing} />
          </Switch>
        </div>
      </main>
      <Footer />
    </div>
  )
}
