import React, { useState, useRef } from 'react';
import { Box, Button, Input, Heading, Stack, VStack, Text, Image, Textarea, Select } from '@chakra-ui/react';
import mic from '../assets/microphone.png';

const SideBar = ({ title, setTitle, description, setDescription, saveCreate, scenes, setScenes, selectedSceneIndex, createNewScene }) => {
    const [file, setFile] = useState(null); // Store the uploaded file
    const [imageUrl, setImageUrl] = useState(null); // Preview of the uploaded image
    const fileInputRef = useRef(null); // Create a ref for the file input
    const [isRecording, setIsRecording] = useState(false);
    const socketRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const [selectedStyle, setSelectedStyle] = useState("Cartoon");

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

    const handleDelete = () => {
        const newScenes = scenes.filter((_, i) => i !== selectedSceneIndex);
        setScenes(newScenes);
        createNewScene();
    }

    const addScene = async (title, description) => {
        let newScene;

        if (saveCreate === "Create") {
            newScene = {
                id: `scene-${scenes.length + 1}`,
                title: title,
                description: description,
                image: imageUrl, // Save the image URL for preview
                expanded: false,
            };
            setScenes([...scenes, newScene]);
            createNewScene();
        } else if (saveCreate === "Save") {
            scenes[selectedSceneIndex].title = title;
            scenes[selectedSceneIndex].description = description;
            if (imageUrl) {
                scenes[selectedSceneIndex].image = imageUrl; // Update image URL if provided
            }
            createNewScene();
        }
        setImageUrl(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = ''; // Reset the file input
        }
    };

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);

            socketRef.current = new WebSocket('wss://api.deepgram.com/v1/listen', [
                'token',
                // '9875dadae086cdde31110771b8f1e05891ba780b'
                process.env.REACT_APP_DEEPGRAM_API_KEY, // Deepgram API key
            ]);

            socketRef.current.onopen = () => {
                console.log('WebSocket connection established');
                mediaRecorderRef.current.start(250);
                setIsRecording(true);
            };

            socketRef.current.onmessage = (event) => {
                const result = JSON.parse(event.data);
                if (result.channel && result.channel.alternatives && result.channel.alternatives[0]) {
                    const transcript = result.channel.alternatives[0].transcript;
                    if (transcript) {
                        setDescription((description) => description + ' ' + transcript);
                    }
                }
            };

            mediaRecorderRef.current.ondataavailable = (event) => {
                if (event.data.size > 0 && socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
                    socketRef.current.send(event.data);
                }
            };
        } catch (error) {
            console.error('Error starting recording:', error);
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
        }
        if (socketRef.current) {
            socketRef.current.close();
        }
        setIsRecording(false);
    };

    return (
        <Box className="SideBar" h="full" w="300px" borderWidth="1px" borderRadius="lg" borderColor="gray.200" p={4} bg="gray.50">
            <VStack spacing={4}>
                <Box w="full">
                    <Heading as="h2" size="md" mb={4}> Title</Heading>
                    <Input 
                        placeholder="Enter scene title" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        mb={2}
                    />
                    <Heading as="h2" size="md" mb={4}> Description</Heading>
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
                
                {/* Live Transcription Section */}
                <Box display="flex" alignItems="center" mb={2}>
                    <Text fontWeight="bold" mr={2}>Live Transcription</Text>
                    <Image src={mic} alt="microphone" boxSize="30px" /> {/* Adjusted size here */}
                </Box>
                <Button colorScheme={isRecording ? 'red' : 'blue'} onClick={isRecording ? stopRecording : startRecording}>
                    {isRecording ? 'Stop Recording' : 'Start Recording'}
                </Button>
                
                {imageUrl && (
                    <Image src={imageUrl} alt="Uploaded" boxSize="100px" objectFit="cover" mb={2} />
                )}

                <Input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleUpload} 
                    mb={2} 
                    ref={fileInputRef}
                />
                <Box display="flex" justifyContent="space-between" w="full" mb={2}>
                    <Select 
                        placeholder="Select style" 
                        value={selectedStyle} 
                        onChange={(e) => setSelectedStyle(e.target.value)} 
                        ml={2}
                        width="150px"
                    >
                        <option value="Cartoon">Cartoon</option>
                        <option value="Anime">Anime</option>
                        <option value="Realistic">Realistic</option>
                        <option value="Pixel Art">Pixel Art</option>
                        <option value="Watercolor">Watercolor</option>
                        <option value="Surrealistic">Surrealistic</option>
                        <option value="Minimalism">Minimalism</option>
                        <option value="Comic Book">Comic Book</option>
                    </Select>
                    <Button colorScheme="blue" onClick={() => { }}>
                        Generate Image
                    </Button>
                </Box>
                <Box className="SideBar" h="full" w="300px" borderWidth="1px" borderRadius="lg" borderColor="gray.200" p={4} bg="gray.50">
                    <Box display="flex" justifyContent="space-between" w="full">
                        <Button colorScheme="blue" onClick={() => addScene(title, description)} width="120px">
                            {saveCreate}
                        </Button>
                        {saveCreate === "Save" && (
                            <Button colorScheme="red" onClick={handleDelete} width="120px">
                                Delete
                            </Button>
                        )}
                    </Box>
                </Box>

            </VStack>
        </Box>
    );
};

export default SideBar;

