import { Button, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"

const List = () => {
  const [counter, setCounter] = useState(0)

  // componentDidMount
  // Ketrigger setelah component mount pertama kali
  useEffect(() => {
    alert("Hello")
  }, [])

  // componentDidUpdate
  // Ketrigger setelah component mount pertama kali DAN
  // Ketrigger setelah component mengalami update (props / state)
  useEffect(() => {
    alert("Counter berubah menjadi " + counter)
  }, [counter])
  // tiap kali `counter` ada perubahan, function ter-execute

  // componentWillUnmount
  // Ketrigger sebelum component di-destroy
  useEffect(() => {
    return () => {
      alert("Goodbye")
    }
  }, [])

  return (
    <>
      <Text fontWeight="bold" fontSize="2xl" textAlign={"center"}>
        List Page
      </Text>
      <Button onClick={() => setCounter(counter + 1)} bgColor={"green"}>
        Tambah
      </Button>
    </>
  )
}

export default List
