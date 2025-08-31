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
  HStack,
  Box,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { object, string } from "yup";
import Card from "../../../components/Card";
import { useMutation } from "react-query";
import { signinUser } from "../../../api/query/userQuery";
import useAuth from "../../../hooks/useAuth";

const signinValidationSchema = object({
  email: string().email("Email is invalid").required("Email is required"),
  password: string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Signin = () => {
  const toast = useToast();
  const { login } = useAuth();
  const { mutate, isLoading } = useMutation({
    mutationKey: ["signin"],
    mutationFn: signinUser,
    onSuccess: (data) => {
      const { token } = data;

      if (token) {
        login(token);
      }
    },
    onError: (error) => {
      toast({
        title: "Signin Error",
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
            <Text fontWeight="bold" fontSize="3xl" bgClip="text" bgGradient="linear(to-r, purple.500, blue.500)">
              Ethereum App
            </Text>
            <Text color="gray.600" fontSize="md">
              Enter your credentials to access your Ethereum account.
            </Text>
          </VStack>

          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={(values) => {
              mutate(values);
            }}
            validationSchema={signinValidationSchema}
          >
            {() => (
              <Form>
                <Stack spacing={5}>
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

                  <HStack justify="space-between" pt={2}>
                    <Checkbox colorScheme="purple">Remember me</Checkbox>
                    <Link to="/forgot-password">
                      <Text fontSize="sm" color="purple.500">
                        Forgot password?
                      </Text>
                    </Link>
                  </HStack>

                  <Box pt={4}>
                    <Button
                      isLoading={isLoading}
                      w="full"
                      type="submit"
                      bgGradient="linear(to-r, purple.500, blue.500)"
                      color="white"
                      _hover={{ bgGradient: "linear(to-r, purple.600, blue.600)" }}
                      borderRadius="lg"
                      boxShadow="md"
                    >
                      Login
                    </Button>
                    <Link to="/signup">
                      <Button
                        variant="outline"
                        mt={3}
                        w="full"
                        borderColor="purple.500"
                        color="purple.500"
                        borderRadius="lg"
                        _hover={{ bg: "purple.50" }}
                      >
                        Create Account
                      </Button>
                    </Link>
                  </Box>
                </Stack>
              </Form>
            )}
          </Formik>
        </Card>
      </Center>
    </Container>
  );
};

export default Signin;
