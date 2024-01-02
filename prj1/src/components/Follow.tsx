import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";

const Follow = () => {
  return (
    <>
      <Box>
        <h1 className="font-bold mt-7 mb-5">Follow</h1>
        <Tabs>
          <TabList>
            <Tab width="50%" color={"green.500"}>
              Follower
            </Tab>
            <Tab width={"50%"} color={"green.500"}>
              Following
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <p>Content 1</p>
            </TabPanel>
            <TabPanel>
              <p>Content 2</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
};
export default Follow;
