import React, { useState } from 'react';
import { Box, Button, Input, Heading, VStack, Text, Image, Textarea } from '@chakra-ui/react';
import mic from '../assets/microphone.png';

const SideBar = ({ onAddScene, title, setTitle, description, setDescription, saveCreate, scenes, setScenes, selectedSceneIndex, createNewScene }) => {
    // const [title, setTitle] = useState('');
    // const [description, setDescription] = useState('');
    
    const handleUpload = () => {
        // Upload logic here
        console.log("Upload Image");
    };
    const handleDelete = () => {
        const newScenes = scenes.filter((_, i) => i !== selectedSceneIndex);
        setScenes(newScenes);
        createNewScene();
    }
    return (
        <Box className="SideBar" h="full" w="300px" borderWidth="1px" borderRadius="lg" borderColor="gray.200" p={4} bg="gray.50">
            <Heading as="h2" size="md" mb={4}>Insert Title Here</Heading>
            <VStack spacing={4}>
                <Box w="full">
                    <Input 
                        placeholder="Enter scene title" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        mb={2}
                    />
                    <Textarea 
                        placeholder="Enter description" 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        mb={2}
                        resize="none" // Prevent resizing 
                        rows={5} // Start with 5 rows
                        minHeight="80px" // Minimum height
                        maxHeight="200px" // Set a maximum height
                    />
                </Box>
                <Text fontWeight="bold">Text</Text>
                <Image src={mic} alt="microphone" boxSize="50px" />
                <Text fontWeight="bold">Image</Text>
                <Button onClick={handleUpload} colorScheme="teal" w="full">Upload Image</Button>
                <VStack spacing={2} w="full">
                    {saveCreate === "Save" && (
                        <Button colorScheme="red" onClick={() => handleDelete()}>Delete</Button>
                        // <Button colorScheme="red" onClick={() => console.log("Delete")}>Delete</Button>
                    )}
                    <Button colorScheme="blue" onClick={() => onAddScene(title, description)}>{saveCreate}</Button>
                </VStack>
            </VStack>
        </Box>
    );
};

export default SideBar;
