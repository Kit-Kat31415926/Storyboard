import React, { useState } from 'react';
import { Box, Button, Input, Heading, VStack, Text, Image, Textarea } from '@chakra-ui/react';
import mic from '../assets/microphone.png';

const SideBar = ({ onAddScene, title, setTitle, description, setDescription, saveCreate, scenes, setScenes, selectedSceneIndex, createNewScene, file, setFile, imageUrl, setImageUrl }) => {
    const handleUpload = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageUrl(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const addScene = async (title, description) => {
        let newScene;

        if (saveCreate === "Create") {
            newScene = {
                id: `scene-${scenes.length + 1}`,
                title: title,
                description: description,
                image: imageUrl, 
                expanded: false,
            };
            setScenes([...scenes, newScene]);
            createNewScene();
        } else if (saveCreate === "Save") {
            scenes[selectedSceneIndex].title = title;
            scenes[selectedSceneIndex].description = description;
            if (imageUrl) {
                scenes[selectedSceneIndex].image = imageUrl; 
            }
            createNewScene();
        }
    };

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
                        resize="none" 
                        rows={5}
                        minHeight="80px"
                        maxHeight="200px"
                    />
                </Box>
                
                <Text fontWeight="bold">Text</Text>
                <Image src={mic} alt="microphone" boxSize="50px" />
                <Text fontWeight="bold">Image</Text>
                
                <Input type="file" accept="image/*" onChange={handleUpload} mb={2} />
                {imageUrl && (
                    <Image src={imageUrl} alt="Uploaded" boxSize="100px" objectFit="cover" mb={2} />
                )}
                
                <VStack spacing={2} w="full">
                    <Button colorScheme="blue" onClick={() => addScene(title, description)}>{saveCreate}</Button>
                </VStack>
            </VStack>
        </Box>
    );
};

export default SideBar;
