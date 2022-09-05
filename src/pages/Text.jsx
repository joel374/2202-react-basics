import { Text } from "@chakra-ui/react"
import Tweet from "../components/Tweet"

const TextPage = () => {
  return (
    <div>
      <Text fontWeight="bold" fontSize="2xl" textAlign={"center"}>
        Text Page
      </Text>
      <Tweet />
    </div>
  )
}

export default TextPage
