import React, { useState } from 'react';
import { Box, Button, Input, Heading, VStack, Text, Image } from '@chakra-ui/react';
import mic from '../assets/microphone.png';

const SideBar = ({ onAddScene }) => {
    const [title, setTitle] = useState('');

    const handleUpload = () => {
        // Upload logic here
        console.log("Upload Image");
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
                </Box>
                <Text fontWeight="bold">Text</Text>
                <Image src={mic} alt="microphone" boxSize="50px" />
                <Text fontWeight="bold">Image</Text>
                <Button onClick={handleUpload} colorScheme="teal" w="full">Upload Image</Button>
                <VStack spacing={2} w="full">
                    <Button colorScheme="red" onClick={() => console.log("Delete")}>Delete</Button>
                    <Button colorScheme="blue" onClick={onAddScene}>Save</Button>
                </VStack>
            </VStack>
        </Box>
    );
};

export default SideBar;

// import mic from '../assets/microphone.png';

// export const SideBar = ({ onAddScene }) => {
//     return (
//         <div className='w-64 bg-gray-100 p-5 rounded-lg shadow-md'>
//             <h1 className='text-2xl mb-5 text-gray-800'>Your Title Here</h1>
//             <div className='mb-5'>
//                 <h2 className='text-lg mb-2 text-gray-600'>Text</h2>
//                 <input
//                     type='text'
//                     className='w-full p-2 border border-gray-300 rounded-md mb-2'
//                     placeholder='Type your text here...'
//                 />
//                 <img src={mic} alt='microphone' className='w-6 cursor-pointer' />
//             </div>
//             <div className='mb-5'>
//                 <h2 className='text-lg mb-2 text-gray-600'>Image</h2>
//                 <button className='w-full bg-blue-500 text-white py-2 rounded-md hover:opacity-80'>
//                     Upload Image
//                 </button>
//             </div>
//             <div className='flex justify-between'>
//                 <button className='bg-red-500 text-white py-2 px-4 rounded-md hover:opacity-80'>
//                     Delete
//                 </button>
//                 <button
//                     className='bg-green-500 text-white py-2 px-4 rounded-md hover:opacity-80'
//                     onClick={onAddScene}
//                 >
//                     Save
//                 </button>
//             </div>
//         </div>
//     );
// };
