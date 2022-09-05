import {
  Box,
  Button,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Toast,
  useToast,
} from "@chakra-ui/react"
import { useState, useEffect } from "react"
import axiosInstance from "../api"
import axios from "axios"
// API / Sumber data
// https://jsonplaceholder.typicode.com/users

const UserList = () => {
  const [users, setUsers] = useState([])
  const toast = useToast()
  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get("users")
      setUsers(response.data)
    } catch (err) {
      console.log(err)
      // toast({
      //   title: "Error",
      //   status: "I",
      // })
      // alert()
    }
  }

  const renderUsers = () => {
    return users.map((val) => {
      return (
        <Tr>
          <Td>{val.id}</Td>
          <Td>{val.username}</Td>
          <Td>{val.email}</Td>
        </Tr>
      )
    })
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <Box>
      <Text>User List</Text>
      <Button onClick={fetchUsers}>Fetch Data</Button>
      <Table>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Ussername</Th>
            <Th>Email</Th>
          </Tr>
        </Thead>
        <Tbody>{renderUsers()}</Tbody>
      </Table>
    </Box>
  )
}
export default UserList
