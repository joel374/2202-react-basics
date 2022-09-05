import {
  Box,
  Button,
  Grid,
  GridItem,
  HStack,
  Input,
  Radio,
  RadioGroup,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"
import { useSelector, useDispatch } from "react-redux"
import { useState } from "react"
import { addStudent } from "../features/student/studentSlice"

const StudentForm = () => {
  const studentSelector = useSelector((state) => state.student)
  const dispatch = useDispatch()

  const renderStudent = () => {
    return studentSelector.data.map((value) => {
      return (
        <Tr width={"100%"}>
          <Td>{value.name}</Td>
          <Td>{value.gender}</Td>
          <Td>{value.course}</Td>
          <Td>
            {" "}
            <Button colorScheme="red">Delete</Button>
          </Td>
        </Tr>
      )
    })
  }
  // setUsers([...users, newUser])

  const [username, setUsername] = useState("")
  const [gender, setGender] = useState("")
  const [course, setCourse] = useState("")

  const addBtnHandler = () => {
    let newUser = {
      username: username,
      gender: gender,
      course: course,
    }
    dispatch(addStudent(newUser))
  }
  // const deleteUserBtnHandler = (idx) => {
  //   let tempUsers = [...data]
  //   tempUsers.splice(idx, 1)
  return (
    // NavBar
    <>
      <Grid
        templateColumns="repeat(2, 1fr)"
        gap={6}
        bgColor="#008081"
        padding={"20px"}
      >
        <GridItem w="100%" h="12">
          <Box
            bg="white"
            textAlign={"center"}
            borderRadius={"5px"}
            alignItems={"center"}
          >
            <Text fontSize={33} fontWeight={"bold"}>
              State Management Practice
            </Text>
          </Box>
        </GridItem>
        <GridItem w="100%" h="12">
          <Box
            bg="white"
            textAlign={"center"}
            alignSelf={""}
            borderRadius={"5px"}
            width={"50%"}
            alignItems={"center"}
          >
            <Text fontSize={33} fontWeight={"bold"}>
              Total User : {studentSelector.data.length}
            </Text>
          </Box>
        </GridItem>
      </Grid>
      {/* // NavBar selesai // Tabel */}
      <Grid templateColumns={"repeat(4, 1fr)"} gap={8}>
        <GridItem>NAME</GridItem>
        <GridItem>GENDER</GridItem>
        <GridItem>COURSE</GridItem>
        <GridItem />
      </Grid>
      <TableContainer
        display={"block"}
        maxWidth="full"
        maxHeight="280px"
        overflowY={"scroll"}
      >
        <Table variant="striped" colorScheme="teal">
          <Tbody>{renderStudent()}</Tbody>
        </Table>
      </TableContainer>
      <Grid templateColumns={"repeat(4, 1fr)"} gap={8}>
        <GridItem>
          <Input
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder={"Input Name"}
          />
        </GridItem>
        <GridItem>
          <RadioGroup onChange={(value) => setGender(value)} value={gender}>
            <HStack>
              <Radio value="Male">Male</Radio>
              <Radio value="Female">Female</Radio>
            </HStack>
          </RadioGroup>
        </GridItem>
        <GridItem>
          <Select
            placeholder="Select Course"
            onChange={(event) => setCourse(event.target.value)}
            value={course}
          >
            <option>Full Stack</option>
            <option>Digital Marketing</option>
            <option>Data Scientist</option>
            <option>UI/UX</option>
          </Select>
        </GridItem>
        <GridItem>
          <Button onClick={addBtnHandler}>Add New User</Button>
        </GridItem>
      </Grid>
      {/* 
      <Box><Text>{studentSelector.data[0].name}</Text></Box> */}
    </>
  )
}

export default StudentForm
