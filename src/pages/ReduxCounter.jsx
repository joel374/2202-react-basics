import { Box, Button, FormControl, Input, Text } from "@chakra-ui/react"
import { useSelector, useDispatch } from "react-redux"
import {
  decrement,
  increment,
  reset,
  confirm,
} from "../features/counter/counterSlice"
import { useState } from "react"

const ReduxCounter = () => {
  const counterSelector = useSelector((state) => {
    return state.counter
  })
  const dispatch = useDispatch()

  //   const incrementBtnHandler = () => {
  //     dispatch(increment())
  //   }

  //   const decrementtBtnHandler = () => {
  //     dispatch(decrement())
  //   }

  //   const resetBtnHandler = () => {
  //     dispatch(reset())
  //   }

  const [num, setnum] = useState("")

  const confirmBtnHandler = () => {
    dispatch(confirm(Number(num)))
  }
  return (
    <Box>
      <Text fontWeight="bold" fontSize="2xl" textAlign={"center"}>
        Redux Counter Page
      </Text>
      <Text fontSize={"4xl"} fontWeight={"bold"}>
        {counterSelector.value}
      </Text>
      {/* <Button onClick={incrementBtnHandler} mr={1} bgColor={"lightblue"}>
        Increment
      </Button>
      <Button onClick={decrementtBtnHandler} mr={1} bgColor={"lightblue"}>
        Decrement
      </Button>
      <Button onClick={resetBtnHandler} mr={1} bgColor={"lightblue"}>
        Reset
      </Button> */}
      <br />
      <FormControl>
        <Input
          value={counterSelector.value}
          //   value={num}
          onChange={(event) => dispatch(confirm(event.target.value))}
          //   onChange={(event) => setnum(event.target.value)}
          type="Number"
        ></Input>
      </FormControl>
      <Button onClick={confirmBtnHandler}>Confirm</Button>
    </Box>
  )
}

export default ReduxCounter
