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
  Text,
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
import { useEffect } from "react"
import {
  fillEmployeeList,
  logoutEmployee,
  takeEmployee,
} from "./features/employee/employeeSlice"
import { jsonServerApi } from "./api"

function App() {
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
              Actions
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
        <GridItem></GridItem>
      </Grid>
      {/* Navbar exercise */}
      <Grid
        templateColumns="repeat(4, 1fr)"
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
              Network Call Practice
            </Text>
          </Box>
        </GridItem>
        <GridItem mx={"auto"}>
          <Text color={"white"}>
            <Link to={"/employees/list"}>Users</Link>
          </Text>
          <Text>Current Employee</Text>
          <Text>ID:{employeeSelector.currentEmployee.id}</Text>
          <Text>Name:{employeeSelector.currentEmployee.name}</Text>
          <Text>Email:{employeeSelector.currentEmployee.email}</Text>
          <Text>Password:{employeeSelector.currentEmployee.password}</Text>
          <Button onClick={() => dispatch(takeEmployee())}>Logout</Button>
        </GridItem>
        <GridItem mx={"auto"}>
          <Text color={"white"}>
            <Link to={"/employees/register"}>Register</Link>
          </Text>
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
              Total Employee : {employeeSelector.data.length}
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
