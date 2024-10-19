import React from 'react';
import { Flex, Text, Button } from '@chakra-ui/react';

export const TitleBar = ({ selectedScene, onAddScene }) => (
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
        {selectedScene ? `Scene #${selectedScene}` : 'No scene selected'}
      </Text>
      <Button
        onClick={onAddScene}
        colorScheme="blue"
        size="sm"
        _hover={{ transform: 'scale(1.05)' }}
        transition="all 0.2s"
      >
        Add
      </Button>
    </Flex>
  </Flex>
);