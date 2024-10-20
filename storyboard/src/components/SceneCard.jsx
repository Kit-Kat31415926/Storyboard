import React from 'react';
import grey from '../assets/greysquare.jpg';
import { Box, Text, Button, Image } from '@chakra-ui/react';
import { motion } from 'framer-motion';

export const SceneCard = ({ scene, isSelected, onSelect, onToggleDescription }) => (
  <Box
    as={motion.div}
    whileHover={{ scale: 1.02 }}
    p={4}
    bg={isSelected ? '#FADCEB' : 'white'}
    borderRadius="md"
    boxShadow="md"
    width="250px"
    height="300px"
    overflow="hidden"
    position="relative"
    onClick={onSelect}
  >
    <center>
    {scene.image ? (
      <Image
        src={scene.image}
        alt={scene.title}
        boxSize="150px"
        objectFit="cover"
        mb={2}
        borderRadius="md"
      />) : (
      <Image
        src={grey}
        alt={scene.title}
        boxSize="150px"
        objectFit="cover"
        mb={2}
        borderRadius="md"
      />
    )}
    </center>
    <Text fontSize="lg" fontWeight="bold" mb={1}>
      {scene.title}
    </Text>
    <Text fontSize="sm" color="gray.600" noOfLines={scene.expanded ? undefined : 2}>
      {scene.description}
    </Text>
    <Button
      size="xs"
      position="absolute"
      bottom={2}
      right={2}
      onClick={(e) => {
        e.stopPropagation();
        onToggleDescription(scene.id);
      }}
    >
      {scene.expanded ? 'Less' : 'More'}
    </Button>
  </Box>
);
