import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Button, Input, Heading, VStack, Text, Image, Textarea } from '@chakra-ui/react';
import mic from '../assets/microphone.png';

const LandingPage = () => {
    const [file, setFile] = useState(null); // Store the uploaded file
    const [imageUrl, setImageUrl] = useState(null); // Preview of the uploaded image
    const fileInputRef = useRef(null); // Create a ref for the file input
    const [isRecording, setIsRecording] = useState(false);
    const socketRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const [description, setDescription] = useState('');

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

    // const addScene = async (title, description) => {
    //     let newScene;

    //     if (saveCreate === "Create") {
    //         newScene = {
    //             id: `scene-${scenes.length + 1}`,
    //             title: title,
    //             description: description,
    //             image: imageUrl, // Save the image URL for preview
    //             expanded: false,
    //         };
    //         setScenes([...scenes, newScene]);
    //         createNewScene();
    //     } else if (saveCreate === "Save") {
    //         scenes[selectedSceneIndex].title = title;
    //         scenes[selectedSceneIndex].description = description;
    //         if (imageUrl) {
    //             scenes[selectedSceneIndex].image = imageUrl; // Update image URL if provided
    //         }
    //         createNewScene();
    //     }
    //     setImageUrl(null);
    //     if (fileInputRef.current) {
    //         fileInputRef.current.value = ''; // Reset the file input
    //     }
    // };

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

    const navigate = useNavigate();


    const handleRedirect = () => {
        navigate('/Home'); // Replace with your desired route
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-center mb-4">Welcome to Storyboarding</h1>
            <h2 className="text-xl text-center mb-6">Choose an option to get started:</h2>
    
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
                <div className="mb-4">
                    <textarea
                        className="w-full p-2 border border-gray-300 rounded-md resize-none"
                        placeholder="Enter description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={5}
                    />
                </div>
    
                {/* Live Transcription Section */}
                <div className="flex items-center mb-4">
                    <span className="font-semibold mr-2">Live Transcription</span>
                    <img src={mic} alt="microphone" className="w-8 h-8" />
                </div>
    
                <button
                    className={`w-full py-2 rounded-md text-white ${
                        isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                    onClick={isRecording ? stopRecording : startRecording}
                >
                    {isRecording ? 'Stop Recording' : 'Start Recording'}
                </button>
    
                {imageUrl && (
                    <img
                        src={imageUrl}
                        alt="Uploaded"
                        className="w-24 h-24 object-cover rounded-md mt-4 mb-2"
                    />
                )}
    
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleUpload}
                    className="w-full mt-4 text-gray-600"
                    ref={fileInputRef}
                />
            </div>
            <br />
            <br />
                <button
                    className={`w-full py-2 rounded-md text-black`}
                    onClick={() => handleRedirect()}
                >
                    Start!
                </button>

        </div>
    );
}

export default LandingPage;