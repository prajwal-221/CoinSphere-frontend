import {
  Center,
  Container,
  FormControl,
  FormLabel,
  Stack,
  Text,
  Input,
  Checkbox,
  Button,
  FormErrorMessage,
  HStack,
  VStack,
  useToast,
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
      if (token) login(token);
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
              Bitcoin App
            </Text>
            <Text color="gray.400" fontSize="md">
              Enter your credentials to access your account.
            </Text>
          </VStack>

          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values) => mutate(values)}
            validationSchema={signinValidationSchema}
          >
            {() => (
              <Form>
                <Stack spacing={5}>
                  <Field name="email">
                    {({ field, meta }) => (
                      <FormControl isInvalid={!!(meta.error && meta.touched)}>
                        <FormLabel color="gray.300">Email</FormLabel>
                        <Input
                          {...field}
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

                  <HStack justify="space-between">
                    <Checkbox colorScheme="purple">Remember me</Checkbox>
                    <Link to="/forgot-password">
                      <Text fontSize="sm" color="purple.400">
                        Forgot password?
                      </Text>
                    </Link>
                  </HStack>

                  <Button
                    isLoading={isLoading}
                    type="submit"
                    w="full"
                    bgGradient="linear(to-r, purple.500, blue.500)"
                    color="white"
                    borderRadius="xl"
                    _hover={{ bgGradient: "linear(to-r, purple.600, blue.600)" }}
                  >
                    Login
                  </Button>

                  <Link to="/signup">
                    <Button
                      variant="outline"
                      mt={3}
                      w="full"
                      borderColor="purple.400"
                      color="purple.400"
                      borderRadius="xl"
                      _hover={{ bg: "gray.700" }}
                    >
                      Create Account
                    </Button>
                  </Link>
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
