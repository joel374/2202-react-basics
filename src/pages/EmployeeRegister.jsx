import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react"
import { useFormik } from "formik"
import { useState } from "react"
import { jsonServerApi } from "../api"
import * as Yup from "yup"
import { useDispatch } from "react-redux"
import { fillEmployeeList } from "../features/employee/employeeSlice"

const EmployeeRegister = () => {
  const [showPassword, setShowPassword] = useState(false)

  const dispatch = useDispatch()

  const toast = useToast()

  const fetchEmployees = async () => {
    try {
      const response = await jsonServerApi.get("/employees")

      dispatch(fillEmployeeList(response.data))
    } catch (err) {
      console.log(err)
      alert("Server error")
    }
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const { name, email, password } = values
        let newRegister = {
          name,
          email,
          password,
        }
        await jsonServerApi.post("/employees/", newRegister)

        fetchEmployees()
        formik.setFieldValue("name", "")
        formik.setFieldValue("email", "")
        formik.setFieldValue("password", "")
        toast({ title: "Register Success", status: "success" })
      } catch (err) {
        toast({ title: "Register Failed", status: "error" })
        console.log(err)
        alert(err)
      }
    },
    validationSchema: Yup.object({
      name: Yup.string().required().min(6),
      email: Yup.string().required().email(),
      password: Yup.string()
        .required()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
    }),
    validateOnChange: false,
  })

  const handleFormChange = ({ target }) => {
    const { name, value } = target

    formik.setFieldValue(name, value)
  }

  const togglePassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <>
      <Box>
        <Grid
          templateColumns="repeat(1, 1fr)"
          gap={4}
          width={"25%"}
          mx={"auto"}
          my={"40px"}
          padding={"20px"}
        >
          <GridItem>
            <Box padding="6" bgColor={"#ADD9E6"} borderRadius="8px">
              <Stack spacing={4}>
                <Text fontSize="2xl" fontWeight="black">
                  Page Register
                </Text>
                <FormControl isInvalid={formik.errors.name}>
                  <FormLabel>Name</FormLabel>
                  <Input
                    value={formik.values.name}
                    bgColor={"#EDF2F6"}
                    name="name"
                    onChange={handleFormChange}
                  />
                  <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={formik.errors.email}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    value={formik.values.email}
                    bgColor={"#EDF2F6"}
                    name="email"
                    onChange={handleFormChange}
                    type="email"
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
                      onChange={handleFormChange}
                      type={showPassword ? "text" : "password"}
                      pr="60px"
                    />
                    <InputRightElement width="56px" mr="4px">
                      <Button onClick={togglePassword} height="28px" size="sm">
                        {showPassword ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                </FormControl>
                <Button
                  onClick={formik.handleSubmit}
                  alignSelf="center"
                  bgColor={"#EDF2F6"}
                >
                  Submit
                </Button>
              </Stack>
            </Box>
          </GridItem>
        </Grid>
      </Box>
    </>
  )
}

export default EmployeeRegister
