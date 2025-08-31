import { Box, Button, Divider, Flex, Grid, Icon, Stack, Text } from "@chakra-ui/react";
import { CustomCard } from "../../../chakra/CustomCard";
import { BsCurrencyRupee } from "react-icons/bs";
import { FaBtc } from "react-icons/fa";
import { Fragment } from "react";

const Transactions = () => {
  const transactions = [
    { id: "1", icon: BsCurrencyRupee, text: "INR Deposit", amount: "+ ₹81,123.10", timestamp: "2022-06-09 7:06 PM" },
    { id: "2", icon: FaBtc, text: "BTC Sell", amount: "- 12.48513391 BTC", timestamp: "2022-06-09 7:06 PM" },
    { id: "3", icon: BsCurrencyRupee, text: "INR Deposit", amount: "+ ₹81,123.10", timestamp: "2022-06-09 7:06 PM" },
  ];

  return (
    <CustomCard bg="gray.800" color="white" p={6} borderRadius="2xl" boxShadow="2xl" h="full">
      <Text mb={6} fontSize="sm" color="gray.400">
        Recent Transactions
      </Text>

      <Stack spacing={4}>
        {transactions.map((transaction, i) => (
          <Fragment key={transaction.id}>
            {i !== 0 && <Divider borderColor="gray.700" />}
            <Flex gap={4} align="center">
              <Grid placeItems="center" bg="gray.700" boxSize={10} borderRadius="full">
                <Icon as={transaction.icon} color="purple.400" boxSize={5} />
              </Grid>
              <Flex justify="space-between" w="full">
                <Stack spacing={0}>
                  <Text fontWeight="bold" color="white">
                    {transaction.text}
                  </Text>
                  <Text fontSize="sm" color="gray.400">
                    {transaction.timestamp}
                  </Text>
                </Stack>
                <Text fontWeight="bold" color={transaction.amount.startsWith("+") ? "green.400" : "red.400"}>
                  {transaction.amount}
                </Text>
              </Flex>
            </Flex>
          </Fragment>
        ))}
      </Stack>

      <Button
        w="full"
        mt={6}
        bgGradient="linear(to-r, purple.500, blue.500)"
        color="white"
        borderRadius="xl"
        _hover={{ bgGradient: "linear(to-r, purple.600, blue.600)" }}
      >
        View All
      </Button>
    </CustomCard>
  );
};

export default Transactions;
