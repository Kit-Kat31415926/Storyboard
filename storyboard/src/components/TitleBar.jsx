// import React from 'react';
// import { Button, Flex } from '@chakra-ui/react';

// const TitleBar = ({ onCreate, onSave }) => {
//     return (
//         <Flex justifyContent="space-between" p={4} bg="gray.200">
//             <h1>Your Title</h1>
//             <div>
//                 <Button onClick={onCreate} colorScheme="teal">Create</Button>
//                 <Button onClick={onSave} colorScheme="blue">Save</Button>
//             </div>
//         </Flex>
//     );
// };

// export default TitleBar;

import React from 'react';
import { Flex, Text, Button } from '@chakra-ui/react';

export const TitleBar = ({ scenes, selectedSceneIndex, createNewScene }) => { 
  return (
    <div className="font-inknut">
    <Flex
      justifyContent="space-between"
      alignItems="center"
      p={4}
      bg="white"
      borderBottom="1px"
      borderColor="gray.200"
    >
      <Text fontSize="2xl" fontWeight="bold">
        StoryBoard
      </Text>
      <Flex alignItems="center">
        <Text mr={4}>
          {selectedSceneIndex !== null ? `Scene #${selectedSceneIndex + 1}` : 'No scene selected'}
        </Text>
        <Button
          onClick={() => createNewScene()}
          colorScheme="blue"
          size="lg"
          fontSize={40}
          marginLeft={10}
          _hover={{ transform: 'scale(1.05)' }}
          transition="all 0.2s"
        >
          +
        </Button>
      </Flex>
    </Flex>
    </div>
  )
};