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
    <Flex
      justifyContent="space-between"
      alignItems="center"
      p={4}
      bg="white"
      borderBottom="1px"
      borderColor="gray.200"
    >
      <Text fontSize="2xl" fontWeight="bold" fontFamily="'Poppins', sans-serif">
        StoryBoard
      </Text>
      <Flex alignItems="center">
        <Text mr={4} fontFamily="'Roboto', sans-serif">
          {selectedSceneIndex !== null ? `Scene #${selectedSceneIndex + 1}` : 'No scene selected'}
        </Text>
        <Button
          onClick={() => createNewScene()}
          colorScheme="blue"
          size="sm"
          _hover={{ transform: 'scale(1.05)' }}
          transition="all 0.2s"
        >
          Add
        </Button>
      </Flex>
    </Flex>
  )
};