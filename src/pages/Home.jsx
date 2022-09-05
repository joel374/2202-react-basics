import { Text } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import Tweet from "../components/Tweet"

const Home = () => {
  return (
    <>
      <Text fontWeight="bold" fontSize="2xl">
        Home Page
      </Text>
      Ini ada sebuah link
      <Link to="/about">to About page</Link>
      <Tweet />
    </>
  )
}

export default Home
