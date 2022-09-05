import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { jsonServerApi } from "../api"
import { useFormik } from "formik"
import * as Yup from "yup"
import { Link } from "react-router-dom"

const ProductList = () => {
  const [users, setUsers] = useState([])
  //   const toast = useToast()

  const fetchProduct = async () => {
    try {
      toast({
        title: "Success Fetch data",
        status: "success",
      })
      const response = await jsonServerApi.get("/products")
      setUsers(response.data)
    } catch (err) {
      console.log(err)
      toast({
        title: "Failed Fetch data",
        status: "error",
      })
    }
  }

  const deleteBtnHandler = async (id) => {
    try {
      await jsonServerApi.delete(`/products/${id}`)
      fetchProduct()
      toast({ title: "Product Deleted", status: "info" })
    } catch (err) {
      console.log(err)
    }
  }

  const renderProduct = () => {
    return users.map((val) => {
      return (
        <Tr>
          {/* <Td>{val.id}</Td> */}
          <Td>{val.product_name}</Td>
          <Td>
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(val.price)}
          </Td>
          <Td>{val.stock}</Td>
          <Td>
            <Link to={`/productlist/${val.id}`}>
              <Button mx={"1"} colorScheme="green">
                Edit
              </Button>
            </Link>
            <Button
              colorScheme={"red"}
              mx="1"
              onClick={() => deleteBtnHandler(val.id)}
            >
              Delete
            </Button>
          </Td>
        </Tr>
      )
    })
  }

  useEffect(() => {
    fetchProduct()
  }, [])

  const formik = useFormik({
    initialValues: {
      product_name: "",
      price: 0,
      stock: 0,
    },
    onSubmit: async (values) => {
      try {
        const { product_name, price, stock } = values
        let newProduct = {
          product_name,
          price,
          stock,
        }
        await jsonServerApi.post("/products", newProduct)
        fetchProduct()
        toast({ title: "Product Added", status: "success" })
      } catch (err) {
        toast({ title: "Network Error", status: "error" })
        console.log(err)
      }
    },
    validationSchema: Yup.object({
      product_name: Yup.string().required("Nama Produk harus di isi"),
      price: Yup.number()
        .required()
        .min(1000, "Minimun harga adalah 1000")
        .max(100000),
      stock: Yup.number().required().min(1),
    }),
    validateOnChange: false,
  })

  const formChangeHandler = ({ target }) => {
    const { name, value } = target
    formik.setFieldValue(name, value)
  }

  const toast = useToast()

  return (
    <>
      <Text fontWeight={"bold"} fontSize={"4xl"} mb={"16"} textAlign={"center"}>
        Product List
      </Text>
      <Grid templateColumns={"repeat(4, 1fr)"} gap={"4"}>
        <GridItem>
          <FormControl isInvalid={formik.errors.product_name}>
            <FormLabel>Product Name</FormLabel>
            <Input
              name="product_name"
              onChange={formChangeHandler}
              //   onChange={(event) =>
              //     formik.setFieldValue("product_name", event.target.value)
              //   }
            />
            <FormErrorMessage>{formik.errors.product_name}</FormErrorMessage>
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl isInvalid={formik.errors.price}>
            <FormLabel>Product Price</FormLabel>
            <Input type={"number"} name="price" onChange={formChangeHandler} />
            <FormErrorMessage>{formik.errors.price}</FormErrorMessage>
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl isInvalid={formik.errors.stock}>
            <FormLabel>Product Stock</FormLabel>
            <Input type={"number"} name="stock" onChange={formChangeHandler} />
            <FormErrorMessage>{formik.errors.stock}</FormErrorMessage>
          </FormControl>
        </GridItem>
        <GridItem>
          <Button
            disabled={formik.isSubmitting}
            my={4}
            colorScheme={"teal"}
            onClick={formik.handleSubmit}
          >
            Add Product
          </Button>
        </GridItem>
      </Grid>

      <Table>
        <Thead>
          <Tr>
            <Th>Product Name</Th>
            <Th>Price</Th>
            <Th>Stock</Th>
            <Th>action</Th>
          </Tr>
        </Thead>
        <Tbody>{renderProduct()}</Tbody>
      </Table>
      {/* <Container>
    </Container> */}
    </>
  )
}

export default ProductList
