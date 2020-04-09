import React from "react";
import { Link } from 'react-router-dom'

export default function Error() {
  return <section className="error-page selection">
    <div className="error-container">
      <h1>Oops! You've encountered what we like to call, "a dead end"</h1>
      <Link to="/" className="btn btn-primary">
        Back home
      </Link>
    </div>
  </section>
}