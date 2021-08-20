import React, { useState } from "react"
import StripeContainer from "./Stripe/StripeContainer"

export default function Dashboard() {
  const [showItem, setShowItem] = useState(false)
  return (
    <div className="App">
      <h1>The Spatula Store</h1>
      {showItem ? (
        <StripeContainer />
      ) : (
        <>
          <h3>$10.00</h3>
          <img
            src="https://images.dunelm.com/30216415.jpg?$standardplayerdefault$&img404=noimagedefault"
            alt="Spatula"
          ></img>
          <button onClick={() => setShowItem(true)}>Purchase Spatula</button>
        </>
      )}
    </div>
  )
}
