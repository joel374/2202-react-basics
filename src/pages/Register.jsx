import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Radio,
  RadioGroup,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react"
import { useState } from "react"
import RegisterModal from "../components/RegisterModal"

// Condition form
// 1. username harus 3 karakter atau lebih
// 2. email harus terisi
// 3. password harus 8 karakter atau lebih
// 4. gender harus terisi

// jika condition form tidak terpenuhi dan button
// register di-click, tampilkan sebuah "TOAST" dengan
// warna/scheme "error"

// jika condition form terpenuhi, tampilkan modal

//

const Register = () => {
  const [showPassword, setShowPassword] = useState(false)

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [gender, setGender] = useState("")

  const [modalIsOpen, setModalIsOpen] = useState(false)

  const toast = useToast()

  const togglePassword = () => {
    setShowPassword(!showPassword)
  }

  const registerBtnHandler = () => {
    if (username.length >= 3 && email && password.length >= 8 && gender) {
      setModalIsOpen(true)
    } else {
      toast({
        title: "Form is still invalid",
        status: "error",
      })
    }
  }

  const closeModal = () => {
    setModalIsOpen(false)
  }

  return (
    <>
      <Box>
        <Text fontSize="3xl" fontWeight="bold">
          Register Page
        </Text>
        <Box
          padding="4"
          border="1px solid black"
          maxWidth="480px"
          borderRadius="8px"
        >
          <Stack spacing={4}>
            <Text fontSize="2xl" fontWeight="black">
              Register
            </Text>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="email"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  type={showPassword ? "text" : "password"}
                  pr="60px"
                />
                <InputRightElement width="56px" mr="4px">
                  <Button onClick={togglePassword} height="28px" size="sm">
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <RadioGroup onChange={(value) => setGender(value)} value={gender}>
              <FormLabel>Gender</FormLabel>
              <HStack>
                <Radio value="Male">Male</Radio>
                <Radio value="Female">Female</Radio>
              </HStack>
            </RadioGroup>
            <Button
              onClick={registerBtnHandler}
              alignSelf="center"
              colorScheme="green"
            >
              Register
            </Button>
          </Stack>
        </Box>
        <Box border="1px solid black" padding="4">
          <Text>Username: {username}</Text>
          <Text>Email: {email}</Text>
          <Text>Password: {password}</Text>
          <Text>Gender: {gender}</Text>
          <Button colorScheme="red">Delete</Button>
        </Box>
      </Box>
      <RegisterModal
        isOpen={modalIsOpen}
        closeModal={closeModal}
        username={username}
        email={email}
        gender={gender}
        password={password}
      />
    </>
  )
}

export default Register

