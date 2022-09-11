import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Toast,
  Tr,
  useToast,
} from "@chakra-ui/react"
import { useFormik } from "formik"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { jsonServerApi } from "../api"
import { loginEmployee } from "../features/employee/employeeSlice"
import * as Yup from "yup"

const EmployeeList = () => {
  const [showPassword, setShowPassword] = useState(false)
  const employeeSelector = useSelector((state) => state.employee)

  const dispatch = useDispatch()

  const toast = useToast()

  const fetchUsers = async () => {
    try {
      const response = await jsonServerApi.get(
        "employees?email=joellegifanimanisali@gmail.com&password=joellegifAni!1"
      )
      console.log(response)
    } catch (err) {
      console.log(err)
      // toast({
      //   title: "Error",
      //   status: "I",
      // })
      // alert()
    }
  }

  const renderEmployees = () => {
    return employeeSelector.data.map((val) => {
      return (
        <Tr>
          <Td>{val.name}</Td>
          <Td>{val.email}</Td>
          <Td>{val.password}</Td>
          <Td>
            <Button
              isDisabled={employeeSelector.currentEmployee.id === val.id}
              onClick={() => dispatch(loginEmployee(val))}
            >
              Login
            </Button>
          </Td>
        </Tr>
      )
    })
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const { email, password } = values
        const res = await jsonServerApi.get(
          `/employees?email=${email}&password=${password}`
        )
        if (res.data.length === 0) {
          return toast({ title: "Invalid Email or Password", status: "error" })
        }
        dispatch(loginEmployee(res.data[0]))
        console.log(res)
        // fetchEmployees()

        formik.setFieldValue("email", "")
        formik.setFieldValue("password", "")
        toast({ title: "Login Success", status: "success" })
      } catch (err) {
        toast({ title: "Login Failed", status: "error" })
        console.log(err)
        alert(err)
      }
    },
    validationSchema: Yup.object({
      email: Yup.string().required().email("User with email does not exist"),
      password: Yup.string()
        .required()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Wrong password"
        ),
    }),
    validateOnChange: false,
  })

  const handleFormChange = ({ target }) => {
    const { name, value } = target
    formik.setFieldValue(name, value)
  }

  return (
    <>
      {employeeSelector.currentEmployee.id ? null : (
        <>
          <Box
            width={"25%"}
            mx={"auto"}
            my={"40px"}
            padding={"20px"}
            bgColor={"teal.200"}
            borderRadius="7px"
          >
            <Stack spacing={4}>
              <Text fontSize="2xl" fontWeight="bold">
                Login Employee
              </Text>
              <FormControl isInvalid={formik.errors.email}>
                <FormLabel>Email</FormLabel>
                <Input
                  autoComplete="off"
                  value={formik.values.email}
                  bgColor={"#EDF2F6"}
                  name="email"
                  type={"email"}
                  onChange={handleFormChange}
                />
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={formik.errors.password}>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    value={formik.values.password}
                    bgColor={"#EDF2F6"}
                    name="password"
                    type={showPassword ? "text" : "password"}
                    pr="60px"
                    onChange={handleFormChange}
                  />
                  <InputRightElement width="56px" mr="4px">
                    <Button
                      onClick={() => setShowPassword(!showPassword)}
                      height="28px"
                      size="sm"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
              </FormControl>
              <Button
                alignSelf="center"
                bgColor={"#EDF2F6"}
                // isDisabled={employeeSelector.currentEmployee.id === val.id}
                // onClick={() => dispatch(loginEmployee(val))}
                onClick={formik.handleSubmit}
              >
                Login
              </Button>
            </Stack>
          </Box>
          <Box>
            <TableContainer width={"800px"} mx={"auto"} my={"40px"}>
              <Table variant="striped" colorScheme="teal">
                <Thead>
                  <Tr>
                    <Th>Name</Th>
                    <Th>Email</Th>
                    <Th>Password</Th>
                  </Tr>
                </Thead>
                <Tbody>{renderEmployees()}</Tbody>
              </Table>
            </TableContainer>
          </Box>
        </>
      )}
    </>
  )
}

export default EmployeeList
