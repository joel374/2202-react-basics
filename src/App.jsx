// import Profile from "./components/Profile/"
import { Routes, Route, Link, NavLink } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Counter from "./pages/Counter"
import TextPage from "./pages/Text"
import List from "./pages/List"
import Filter from "./pages/Filter"
import {
  Box,
  Button,
  Grid,
  GridItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Table,
  Tbody,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react"
import Register from "./pages/Register"
import ReduxCounter from "./pages/ReduxCounter"
import StudentForm from "./pages/StudentForm"
import UserList from "./pages/UserList"
import ProductList from "./pages/ProductList"
import ProductEdit from "./pages/ProductEdit"
import EmployeeRegister from "./pages/EmployeeRegister"
import EmployeeList from "./pages/EmployeeList"
import Render from "./pages/Latihan"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import {
  fillEmployeeList,
  loginEmployee,
  logoutEmployee,
} from "./features/employee/employeeSlice"
import { jsonServerApi } from "./api"

function App() {
  const [login, setLogin] = useState("")
  const employeeSelector = useSelector((state) => state.employee)

  const dispatch = useDispatch()

  const fetchEmployees = async () => {
    try {
      const response = await jsonServerApi.get("/employees")

      dispatch(fillEmployeeList(response.data))
      // fetchEmployees()
    } catch (err) {
      console.log(err)
      alert("Server errors")
    }
  }

  useEffect(() => {
    fetchEmployees()
  }, [])

  return (
    <Box>
      <Grid templateColumns={"repeat(4, 1fr)"} bgColor="#EDF2F6">
        <GridItem>
          <Menu>
            <MenuButton
              size={"xs"}
              as={Button}
              // rightIcon={<ChevronDownIcon />}
            >
              Menu
            </MenuButton>
            <MenuList>
              <MenuItem>
                <Link to={"/home"}>Home</Link>
              </MenuItem>
              <MenuItem>
                <Link to={"/about"}>About</Link>
              </MenuItem>
              <MenuItem>
                <Link to={"/counter"}>Counter</Link>
              </MenuItem>
              <MenuItem>
                <Link to={"/text"}>Text</Link>
              </MenuItem>
              <MenuItem>
                <Link to={"/list"}>List</Link>
              </MenuItem>
              <MenuItem>
                <Link to={"/filter"}>Filter</Link>
              </MenuItem>
              <MenuItem>
                <Link to={"/register"}>Register</Link>
              </MenuItem>
              <MenuItem>
                <Link to={"/redux/counter"}>Redux Counter</Link>
              </MenuItem>
              <MenuItem>
                <Link to={"/redux/student"}>Redux Student</Link>
              </MenuItem>
              <MenuItem>
                <Link to={"/users"}>User List</Link>
              </MenuItem>
              <MenuItem>
                <Link to={"/productlist"}>Product List</Link>
              </MenuItem>
              <MenuItem>
                <Link to={"/productlist/:id"}>Product List 2</Link>
              </MenuItem>
              <MenuItem>
                <Link to={"/employees/register"}>Employee Register</Link>
              </MenuItem>
              <MenuItem>
                <Link to={"/employees/list"}>Employees List</Link>
              </MenuItem>
              <MenuItem>
                <Link to={"/employees/login"}>Employees Login</Link>
              </MenuItem>
            </MenuList>
          </Menu>
        </GridItem>
        <GridItem></GridItem>
        <GridItem></GridItem>
        <GridItem>
          <Text
            onChange={() => setLogin(!login)}
            height="28px"
            size="sm"
            color={"black"}
          >
            {login
              ? // <Link to={"/employees/list"}>Login</Link>
                "Login"
              : employeeSelector.currentEmployee.name}
          </Text>
        </GridItem>
      </Grid>

      {/* Navbar exercise */}
      <Grid
        templateColumns="1.2fr 1fr"
        gap={4}
        bgColor="#008081"
        padding={"10px"}
      >
        <GridItem>
          <Box borderRadius={"7px"} p={"15px"} bgColor={"teal.200"}>
            <Grid templateRows={"repeat(3, 1fr"}>
              <GridItem>
                <Text fontSize={"20px"} fontWeight={"bold"}>
                  Current Employee
                </Text>
              </GridItem>

              <GridItem>
                <Table bgColor={"teal.200"}>
                  <Tbody>
                    <Tr>
                      <Td>ID</Td>
                      <Td>: {employeeSelector.currentEmployee.id}</Td>
                    </Tr>
                    <Tr>
                      <Td>Name</Td>
                      <Td>: {employeeSelector.currentEmployee.name}</Td>
                    </Tr>
                    <Tr>
                      <Td>Email</Td>
                      <Td>: {employeeSelector.currentEmployee.email}</Td>
                    </Tr>
                    <Tr>
                      <Td>Password</Td>
                      <Td>: {employeeSelector.currentEmployee.password}</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </GridItem>

              <GridItem textAlign={"center"} mt={"15px"}>
                {employeeSelector.currentEmployee.id ? (
                  <Button onClick={() => dispatch(logoutEmployee())}>
                    Logout
                  </Button>
                ) : null}
              </GridItem>
            </Grid>
          </Box>
        </GridItem>

        <GridItem w="100%" my={"auto"}>
          <Box
            bg="white"
            textAlign={"center"}
            borderRadius={"5px"}
            alignItems={"center"}
          >
            <Text fontSize={33} fontWeight={"bold"}>
              Network Call Practice
            </Text>
          </Box>
          <Box
            bg="white"
            textAlign={"center"}
            alignSelf={""}
            borderRadius={"5px"}
            alignItems={"center"}
            mt={"10px"}
          >
            <Text fontSize={33} fontWeight={"bold"}>
              Total Employee:{employeeSelector.data.length}
            </Text>
          </Box>
          <Box
            bg="white"
            textAlign={"center"}
            alignSelf={""}
            borderRadius={"5px"}
            alignItems={"center"}
            mt={"10px"}
          >
            <Text fontSize={33} fontWeight={"bold"}>
              <Link to={"/employees/list"}>Users</Link>
            </Text>
          </Box>

          <Box
            bg="white"
            textAlign={"center"}
            alignSelf={""}
            borderRadius={"5px"}
            alignItems={"center"}
            mt={"10px"}
          >
            <Text fontSize={33} fontWeight={"bold"}>
              <Link to={"/employees/register"}>Register</Link>
            </Text>
          </Box>
        </GridItem>
      </Grid>

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/counter" element={<Counter />} />
        <Route path="/text" element={<TextPage />} />
        <Route path="/list" element={<List />} />
        <Route path="/filter" element={<Filter />} />
        <Route path="/register" element={<Register />} />
        <Route path="/redux/counter" element={<ReduxCounter />} />
        <Route path="/redux/student" element={<StudentForm />} />
        <Route path="/users" element={<UserList />} />

        {/* proudct */}
        <Route path="/productlist" element={<ProductList />} />
        <Route path="/productlist/:id" element={<ProductEdit />} />
        {/* employee  */}
        <Route path="/employees/register/" element={<EmployeeRegister />} />
        <Route path="/employees/list" element={<EmployeeList />} />
        <Route path="/employees/login" element={<Render />} />
        {/* /: adalah params */}
      </Routes>
    </Box>
  )
}

export default App
