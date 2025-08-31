import { Button, Flex, HStack, Icon, Image, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import { CustomCard } from "../../../chakra/CustomCard";
import { BsArrowUpRight } from "react-icons/bs";
import { AiFillPlusCircle, AiOutlineMinusCircle } from "react-icons/ai";

const PriceSection = () => {
  const timestamps = ["7:15 PM", "7:55 PM", "8:55 PM", "9:55 PM", "10:55 PM"];

  return (
    <CustomCard bg="gray.800" color="white" p={6} borderRadius="2xl" boxShadow="2xl">
      <Flex justify="space-between" align="start" mb={4}>
        <Stack spacing={1}>
          <HStack color="gray.400">
            <Text fontSize="sm">Wallet Balances</Text>
          </HStack>
          <HStack
            spacing={2}
            align={{ base: "flex-start", sm: "center" }}
            flexDir={{ base: "column", sm: "row" }}
          >
            <HStack>
              <Text fontSize="2xl" fontWeight="bold">
                22.39401000
              </Text>
              <HStack fontWeight="medium" color="green.400">
                <Icon as={BsArrowUpRight} />
                <Text fontSize="sm" fontWeight="medium">
                  22%
                </Text>
              </HStack>
            </HStack>
          </HStack>
        </Stack>

        <HStack spacing={3}>
          <Button
            leftIcon={<Icon as={AiFillPlusCircle} />}
            bgGradient="linear(to-r, purple.500, blue.500)"
            color="white"
            borderRadius="xl"
            _hover={{ bgGradient: "linear(to-r, purple.600, blue.600)" }}
          >
            Buy
          </Button>
          <Button
            leftIcon={<Icon as={AiOutlineMinusCircle} />}
            bgGradient="linear(to-r, gray.700, gray.600)"
            color="white"
            borderRadius="xl"
            _hover={{ bgGradient: "linear(to-r, gray.800, gray.700)" }}
          >
            Sell
          </Button>
        </HStack>
      </Flex>

      <Tabs variant="soft-rounded">
        <Flex justify="end" mb={2}>
          <TabList bg="gray.700" p="3px" borderRadius="lg">
            {["1H", "1D", "1W", "1M"].map((tab) => (
              <Tab
                _selected={{ bg: "purple.400", color: "white" }}
                key={tab}
                fontSize="sm"
                p="6px"
                borderRadius="md"
              >
                {tab}
              </Tab>
            ))}
          </TabList>
        </Flex>

        <TabPanels>
          <TabPanel>
            <Image w="100%" src="/graph.svg" mt="3rem" borderRadius="md" />
            <HStack justify="space-between" mt={3}>
              {timestamps.map((timestamp) => (
                <Text key={timestamp} fontSize="sm" color="gray.400">
                  {timestamp}
                </Text>
              ))}
            </HStack>
          </TabPanel>
          <TabPanel>
            <Text color="gray.400">two!</Text>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </CustomCard>
  );
};

export default PriceSection;
