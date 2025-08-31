import {
  Center,
  Container,
  FormControl,
  FormLabel,
  Stack,
  Text,
  Input,
  Flex,
  Checkbox,
  Button,
  FormErrorMessage,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { object, string, ref } from "yup";
import Card from "../../../components/Card";
import { useMutation } from "react-query";
import { signupUser } from "../../../api/query/userQuery";
import { useState } from "react";

const signupValidationSchema = object({
  name: string().required("Name is required"),
  surname: string().required("Surname is required"),
  email: string().email("Email is invalid").required("Email is required"),
  password: string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  repeatPassword: string()
    .oneOf([ref("password"), null], "Passwords must match")
    .required("Repeat password is required"),
});

const Signup = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  const { mutate, isLoading } = useMutation({
    mutationKey: ["signup"],
    mutationFn: signupUser,
    onSuccess: () => {
      if (email) navigate(`/register-email-verify/${email}`);
    },
    onError: (error) => {
      toast({
        title: "SignUp Error",
        description: error.message,
        status: "error",
      });
    },
  });

  return (
    <Container bg="gray.900">
      <Center minH="100vh">
        <Card p={10} borderRadius="2xl" boxShadow="2xl" bg="gray.800">
          <VStack spacing={4} textAlign="center" mb={6}>
            <Text
              fontWeight="bold"
              fontSize="3xl"
              bgGradient="linear(to-r, purple.400, blue.400)"
              bgClip="text"
            >
              Ethereum App
            </Text>
            <Text color="gray.400" fontSize="md">
              Create a free account by filling in the data below.
            </Text>
          </VStack>

          <Formik
            initialValues={{ name: "", surname: "", email: "", password: "", repeatPassword: "" }}
            onSubmit={(values) => {
              setEmail(values.email);
              mutate({
                firstName: values.name,
                lastName: values.surname,
                email: values.email,
                password: values.password,
              });
            }}
            validationSchema={signupValidationSchema}
          >
            {() => (
              <Form>
                <Stack spacing={5}>
                  <Flex gap={4}>
                    <Field name="name">
                      {({ field, meta }) => (
                        <FormControl isInvalid={!!(meta.error && meta.touched)}>
                          <FormLabel color="gray.300">Name</FormLabel>
                          <Input
                            {...field}
                            placeholder="Enter your name"
                            borderRadius="lg"
                            borderColor="gray.600"
                            bg="gray.700"
                            _focus={{ borderColor: "purple.400", bg: "gray.700" }}
                            color="white"
                          />
                          <FormErrorMessage>{meta.error}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="surname">
                      {({ field, meta }) => (
                        <FormControl isInvalid={!!(meta.error && meta.touched)}>
                          <FormLabel color="gray.300">Surname</FormLabel>
                          <Input
                            {...field}
                            placeholder="Enter your surname"
                            borderRadius="lg"
                            borderColor="gray.600"
                            bg="gray.700"
                            _focus={{ borderColor: "purple.400", bg: "gray.700" }}
                            color="white"
                          />
                          <FormErrorMessage>{meta.error}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Flex>

                  <Field name="email">
                    {({ field, meta }) => (
                      <FormControl isInvalid={!!(meta.error && meta.touched)}>
                        <FormLabel color="gray.300">Email</FormLabel>
                        <Input
                          {...field}
                          type="email"
                          placeholder="Enter your email"
                          borderRadius="lg"
                          borderColor="gray.600"
                          bg="gray.700"
                          _focus={{ borderColor: "purple.400", bg: "gray.700" }}
                          color="white"
                        />
                        <FormErrorMessage>{meta.error}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="password">
                    {({ field, meta }) => (
                      <FormControl isInvalid={!!(meta.error && meta.touched)}>
                        <FormLabel color="gray.300">Password</FormLabel>
                        <Input
                          {...field}
                          type="password"
                          placeholder="Enter your password"
                          borderRadius="lg"
                          borderColor="gray.600"
                          bg="gray.700"
                          _focus={{ borderColor: "purple.400", bg: "gray.700" }}
                          color="white"
                        />
                        <FormErrorMessage>{meta.error}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="repeatPassword">
                    {({ field, meta }) => (
                      <FormControl isInvalid={!!(meta.error && meta.touched)}>
                        <FormLabel color="gray.300">Repeat Password</FormLabel>
                        <Input
                          {...field}
                          type="password"
                          placeholder="Repeat your password"
                          borderRadius="lg"
                          borderColor="gray.600"
                          bg="gray.700"
                          _focus={{ borderColor: "purple.400", bg: "gray.700" }}
                          color="white"
                        />
                        <FormErrorMessage>{meta.error}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Checkbox colorScheme="purple">
                    I agree with{" "}
                    <Text as="span" color="purple.400">
                      Terms and Conditions
                    </Text>
                  </Checkbox>

                  <Button
                    isLoading={isLoading}
                    type="submit"
                    w="full"
                    bgGradient="linear(to-r, purple.500, blue.500)"
                    color="white"
                    borderRadius="xl"
                    _hover={{ bgGradient: "linear(to-r, purple.600, blue.600)" }}
                  >
                    Create Account
                  </Button>

                  <Text color="gray.400" textAlign="center">
                    Already have an account?{" "}
                    <Link to="/signin">
                      <Text as="span" color="purple.400">
                        Login
                      </Text>
                    </Link>
                  </Text>
                </Stack>
              </Form>
            )}
          </Formik>
        </Card>
      </Center>
    </Container>
  );
};

export default Signup;
