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
  useToast,
  VStack,
  Box,
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
      if (email) {
        navigate(`/register-email-verify/${email}`);
      }
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
    <Container bg="gray.50">
      <Center minH="100vh">
        <Card
          p={10}
          borderRadius="3xl"
          boxShadow="xl"
          bgGradient="linear(to-br, purple.50, blue.50)"
        >
          <VStack spacing={4} textAlign="center" mb={6}>
            <Text
              fontWeight="bold"
              fontSize="3xl"
              bgClip="text"
              bgGradient="linear(to-r, purple.500, blue.500)"
            >
              Ethereum App
            </Text>
            <Text color="gray.600" fontSize="md">
              Create a free account by filling in the data below.
            </Text>
          </VStack>

          <Formik
            initialValues={{
              name: "",
              surname: "",
              email: "",
              password: "",
              repeatPassword: "",
            }}
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
                          <FormLabel htmlFor="name" color="gray.700">
                            Name
                          </FormLabel>
                          <Input
                            {...field}
                            name="name"
                            placeholder="Enter your name"
                            borderRadius="lg"
                            borderColor="gray.300"
                            focusBorderColor="purple.400"
                          />
                          <FormErrorMessage>{meta.error}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="surname">
                      {({ field, meta }) => (
                        <FormControl isInvalid={!!(meta.error && meta.touched)}>
                          <FormLabel htmlFor="surname" color="gray.700">
                            Surname
                          </FormLabel>
                          <Input
                            {...field}
                            name="surname"
                            placeholder="Enter your surname"
                            borderRadius="lg"
                            borderColor="gray.300"
                            focusBorderColor="purple.400"
                          />
                          <FormErrorMessage>{meta.error}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Flex>

                  <Field name="email">
                    {({ field, meta }) => (
                      <FormControl isInvalid={!!(meta.error && meta.touched)}>
                        <FormLabel htmlFor="email" color="gray.700">
                          Email
                        </FormLabel>
                        <Input
                          {...field}
                          name="email"
                          type="email"
                          placeholder="Enter your email"
                          borderRadius="lg"
                          borderColor="gray.300"
                          focusBorderColor="purple.400"
                        />
                        <FormErrorMessage>{meta.error}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="password">
                    {({ field, meta }) => (
                      <FormControl isInvalid={!!(meta.error && meta.touched)}>
                        <FormLabel htmlFor="password" color="gray.700">
                          Password
                        </FormLabel>
                        <Input
                          {...field}
                          name="password"
                          type="password"
                          placeholder="Enter your password"
                          borderRadius="lg"
                          borderColor="gray.300"
                          focusBorderColor="purple.400"
                        />
                        <FormErrorMessage>{meta.error}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="repeatPassword">
                    {({ field, meta }) => (
                      <FormControl isInvalid={!!(meta.error && meta.touched)}>
                        <FormLabel htmlFor="repeatPassword" color="gray.700">
                          Repeat Password
                        </FormLabel>
                        <Input
                          {...field}
                          name="repeatPassword"
                          type="password"
                          placeholder="Repeat your password"
                          borderRadius="lg"
                          borderColor="gray.300"
                          focusBorderColor="purple.400"
                        />
                        <FormErrorMessage>{meta.error}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Checkbox colorScheme="purple">
                    I agree with{" "}
                    <Text as="span" color="purple.500">
                      Terms and Conditions
                    </Text>
                  </Checkbox>

                  <Button
                    isLoading={isLoading}
                    type="submit"
                    w="full"
                    bgGradient="linear(to-r, purple.500, blue.500)"
                    color="white"
                    _hover={{ bgGradient: "linear(to-r, purple.600, blue.600)" }}
                    borderRadius="lg"
                    boxShadow="md"
                  >
                    Create Account
                  </Button>

                  <Text color="gray.600" textAlign="center">
                    Already have an account?{" "}
                    <Link to="/signin">
                      <Text as="span" color="purple.500">
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
