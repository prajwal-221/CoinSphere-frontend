import { Button, HStack, Icon, Stack, Tag, Text } from "@chakra-ui/react";
import React from "react";
import { AiOutlineInfoCircle, AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";

const PortfolioSection = () => {
  return (
    <HStack
      justify="space-between"
      bg="gray.800"
      borderRadius="2xl"
      p={6}
      flexDir={{ base: "column", xl: "row" }}
      spacing={{ base: 4, xl: 0 }}
      boxShadow="2xl"
    >
      <HStack
        spacing={{ base: 0, xl: 16 }}
        flexDir={{ base: "column", xl: "row" }}
        align={{ base: "flex-start", xl: "center" }}
      >
        <Stack spacing={1}>
          <HStack color="gray.400">
            <Text fontSize="sm">Total Portfolio Value</Text>
            <Icon as={AiOutlineInfoCircle} />
          </HStack>
          <Text fontSize="2xl" fontWeight="bold" bgClip="text" bgGradient="linear(to-r, purple.400, blue.400)">
            ₹ 112,312.24
          </Text>
        </Stack>

        <Stack spacing={1}>
          <HStack color="gray.400">
            <Text fontSize="sm">Wallet Balances</Text>
          </HStack>
          <HStack
            spacing={4}
            flexDir={{ base: "column", sm: "row" }}
            align={{ base: "flex-start", sm: "center" }}
          >
            <HStack>
              <Text fontSize="2xl" fontWeight="bold" color="white">
                22.39401000
              </Text>
              <Tag colorScheme="purple" fontWeight="medium" borderRadius="full">
                BTC
              </Tag>
            </HStack>
            <HStack>
              <Text fontSize="2xl" fontWeight="bold" color="white">
                ₹ 1,300.00
              </Text>
              <Tag colorScheme="purple" borderRadius="full">
                INR
              </Tag>
            </HStack>
          </HStack>
        </Stack>
      </HStack>

      <HStack spacing={3} mt={{ base: 4, xl: 0 }}>
        <Button
          leftIcon={<Icon as={AiOutlineArrowDown} />}
          bgGradient="linear(to-r, purple.500, blue.500)"
          color="white"
          borderRadius="xl"
          _hover={{ bgGradient: "linear(to-r, purple.600, blue.600)" }}
        >
          Deposit
        </Button>
        <Button
          leftIcon={<Icon as={AiOutlineArrowUp} />}
          bgGradient="linear(to-r, gray.700, gray.600)"
          color="white"
          borderRadius="xl"
          _hover={{ bgGradient: "linear(to-r, gray.800, gray.700)" }}
        >
          Withdraw
        </Button>
      </HStack>
    </HStack>
  );
};

export default PortfolioSection;
