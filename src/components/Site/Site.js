import React from "react"
import { Route, Switch } from "react-router-dom"
import Header from "./Header"
import Pricing from "./Pricing"
import Home from "./Home"

export default function Site() {
  return (
    <div>
      <Header />
      <main className="flex-1 relative overflow-y-auto focus:outline-none">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/pricing" component={Pricing} />
            </Switch>
          </div>
        </div>
      </main>
    </div>
  )
}
