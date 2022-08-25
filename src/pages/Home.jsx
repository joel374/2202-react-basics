import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <Link to="/about">to About</Link>
    </div>
  )
}

export default Home

