import React, { useState, useEffect, useRef } from 'react';
import { Box, Grid } from '@chakra-ui/react';
import Draggable from 'react-draggable';
import { TitleBar } from '../components/TitleBar';
import { SceneCard } from '../components/SceneCard';
import SideBar from '../components/SideBar';

const GRID_SIZE = 220; // Adjust this value based on your card size and desired gap

const Home = () => {
  const [scenes, setScenes] = useState([]);
  const [selectedSceneIndex, setSelectedSceneIndex] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [saveCreate, setSaveCreate] = useState('Create');
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const containerRef = useRef(null);

  const createNewScene = () => {
    // ... (keep existing implementation)
  };

  const editScene = (index) => {
    // ... (keep existing implementation)
  };

  const toggleDescription = (id) => {
    // ... (keep existing implementation)
  };

  const updateScenePosition = (id, x, y) => {
    setScenes(prevScenes =>
      prevScenes.map(scene =>
        scene.id === id ? { ...scene, position: { x, y } } : scene
      )
    );
  };

  const snapToGrid = (x, y) => {
    const snappedX = Math.round(x / GRID_SIZE) * GRID_SIZE;
    const snappedY = Math.round(y / GRID_SIZE) * GRID_SIZE;
    return { x: snappedX, y: snappedY };
  };

  const handleDragStop = (id, e, data) => {
    const { x, y } = snapToGrid(data.x, data.y);
    updateScenePosition(id, x, y);
  };

  useEffect(() => {
    const updateGridSize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const columns = Math.floor(containerWidth / GRID_SIZE);
        containerRef.current.style.gridTemplateColumns = `repeat(${columns}, ${GRID_SIZE}px)`;
      }
    };

    updateGridSize();
    window.addEventListener('resize', updateGridSize);
    return () => window.removeEventListener('resize', updateGridSize);
  }, []);

  return (
    <Box display="flex" minHeight="100vh" bg="white" fontFamily="'Roboto', sans-serif">
      <SideBar 
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        saveCreate={saveCreate}
        scenes={scenes}
        setScenes={setScenes}
        selectedSceneIndex={selectedSceneIndex}
        createNewScene={createNewScene}
        file={file}
        setFile={setFile}
        imageUrl={imageUrl}
        setImageUrl={setImageUrl}
      />
      <Box flex="1" p={8} overflowY="auto">
        <TitleBar scenes={scenes} selectedSceneIndex={selectedSceneIndex} createNewScene={createNewScene} />
        <Grid
          ref={containerRef}
          gap={4}
          p={4}
          position="relative"
          minHeight={`${Math.ceil(scenes.length / 3) * GRID_SIZE}px`}
        >
          {scenes.map((scene, index) => (
            <Draggable
              key={scene.id}
              bounds="parent"
              grid={[GRID_SIZE, GRID_SIZE]}
              position={scene.position || { x: 0, y: 0 }}
              onStop={(e, data) => handleDragStop(scene.id, e, data)}
            >
              <Box
                position="absolute"
                width={`${GRID_SIZE - 20}px`}
                height={`${GRID_SIZE - 20}px`}
                transition="all 0.3s"
                zIndex={selectedSceneIndex === index ? 100 : 1}
                _hover={{ zIndex: 10 }}
              >
                <SceneCard
                  scene={scene}
                  isSelected={selectedSceneIndex === index}
                  onSelect={() => editScene(index)}
                  onToggleDescription={toggleDescription}
                />
              </Box>
            </Draggable>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Home;

// import React, { useState } from 'react';
// import { Box, Flex, Button, Text, Heading, VStack, Input } from '@chakra-ui/react';
// import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
// import { TitleBar } from '../components/TitleBar';
// import { SceneCard } from '../components/SceneCard';
// import SideBar from '../components/SideBar';

// const Home = () => {
//   const [scenes, setScenes] = useState([]);
//   const [selectedSceneIndex, setSelectedSceneIndex] = useState(null);
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [saveCreate, setSaveCreate] = useState('Create');
//   const [file, setFile] = useState(null); // Store the uploaded file
//   const [imageUrl, setImageUrl] = useState(null); // Preview of the uploaded image

//   const createNewScene = () => {
//     setTitle('');
//     setDescription('');
//     setSaveCreate('Create');
//     setSelectedSceneIndex(null);
//     setFile(null);
//     setImageUrl(null);
//   };

//   const editScene = (index) => {
//     if (selectedSceneIndex === index) {
//       console.log('Deepgram API Key:', process.env.REACT_APP_DEEPGRAM_API_KEY);
//       createNewScene()
//       return
//     }
//     const selectedScene = scenes[index];
//     // can't use selectedScenesIndex because above operation is asynchronous
//     setTitle(selectedScene.title);
//     setDescription(selectedScene.description);
//     setSaveCreate('Save');
//     setSelectedSceneIndex(index);
//   };

//   const toggleDescription = (id) => {
//     setScenes(scenes.map(scene =>
//       scene.id === id ? { ...scene, expanded: !scene.expanded } : scene
//     ));
//   };

//   const onDragEnd = (result) => {
//     if (!result.destination) return;
//     const items = Array.from(scenes);
//     const [reorderedItem] = items.splice(result.source.index, 1);
//     items.splice(result.destination.index, 0, reorderedItem);
//     setScenes(items);
//   };

//   return (
//     <Flex minHeight="100vh" bg="white" fontFamily="'Roboto', sans-serif">
//       <SideBar 
//         title={title}
//         setTitle={setTitle}
//         description={description}
//         setDescription={setDescription}
//         saveCreate={saveCreate}
//         scenes={scenes}
//         setScenes={setScenes}
//         selectedSceneIndex={selectedSceneIndex}
//         createNewScene={createNewScene}
//         file={file}
//         setFile={setFile}
//         imageUrl={imageUrl}
//         setImageUrl={setImageUrl}/>
//       <Box flex="1" p={8} overflowY="auto">
//         <TitleBar scenes={scenes} selectedSceneIndex={selectedSceneIndex} createNewScene={createNewScene} />
//         <DragDropContext onDragEnd={onDragEnd}>
//           <Droppable droppableId="scenes" direction="horizontal"
//     width="250px"
//     height="300px">
//             {(provided) => (
//               <Flex padding={100}
//                 flexWrap="wrap"
//                 {...provided.droppableProps}
//                 ref={provided.innerRef}
//               >
//                 {scenes.map((scene, index) => (
//                   <Draggable key={scene.id} draggableId={scene.id} index={index}>
//                     {(provided, snapshot) => (
//                       <Box
//                         ref={provided.innerRef}
//                         {...provided.draggableProps}
//                         {...provided.dragHandleProps}
//                         m={2}
//                         width="200px"
//                         transition="transform 0.2s"
//                         transform={snapshot.isDragging ? "scale(1.05)" : "scale(1)"}
//                         zIndex={snapshot.isDragging ? 100 : 1}
//                       >
//                         <SceneCard
//                           scene={scene}
//                           isSelected={selectedSceneIndex === index}
//                           onSelect={() => editScene(index)}
//                           // onSelect={() => setSelectedScene(scene.id)}
//                           onToggleDescription={toggleDescription}
//                         />
//                       </Box>
//                     )}
//                   </Draggable>
//                 ))}
//                 {provided.placeholder}
//               </Flex>
//             )}
//           </Droppable>
//         </DragDropContext>
//       </Box>
//     </Flex>
//   );
// };

// export default Home;

// import React, { useState } from 'react';
// import { Box, Flex } from '@chakra-ui/react';
// import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
// import { TitleBar } from '../components/TitleBar';
// import { SceneCard } from '../components/SceneCard';
// import { SideBar } from '../components/SideBar';

// const Home = () => {
//     // Scene to be displayed on screen
//     const [scenes, setScenes] = useState([]);
//     // Adjusts side bar so user can add scene
//     const [createScene, setCreateScene] = useState(null);
//     // Selects scene for user to edit
//     const [selectedScene, setSelectedScene] = useState(null);

//     // Creates function to create new scene when Save button is pressed
//     const addScene = () => {
//         const newScene = {
//             id: `scene-${scenes.length + 1}`,
//             title: `Scene ${scenes.length + 1}`,
//             description: '<Insert description>',
//             expanded: false
//         };
//         setScenes([...scenes, newScene]);
//     };

//     const toggleDescription = (id) => {
//         setScenes(scenes.map(scene =>
//         scene.id === id ? { ...scene, expanded: !scene.expanded } : scene
//     ));
//   };

//   const onDragEnd = (result) => {
//     if (!result.destination) return;
//     const items = Array.from(scenes);
//     const [reorderedItem] = items.splice(result.source.index, 1);
//     items.splice(result.destination.index, 0, reorderedItem);
//     setScenes(items);
//   };

//   return (
//     <Box minHeight="100vh" bg="white" fontFamily="'Roboto', sans-serif">
//       <TitleBar selectedScene={selectedScene} onAddScene={addScene} />
//       <div className="content">
//         <SideBar onSaveScene={addScene} />
//         <Box p={8} overflowY="auto" height="calc(100vh - 70px)">
//             <DragDropContext onDragEnd={onDragEnd}>
//             <Droppable droppableId="scenes" direction="horizontal">
//                 {(provided) => (
//                 <Flex
//                     flexWrap="wrap"
//                     {...provided.droppableProps}
//                     ref={provided.innerRef}
//                 >
//                     {scenes.map((scene, index) => (
//                     <Draggable key={scene.id} draggableId={scene.id} index={index}>
//                         {(provided, snapshot) => (
//                         <Box
//                             ref={provided.innerRef}
//                             {...provided.draggableProps}
//                             {...provided.dragHandleProps}
//                             m={2}
//                             transition="transform 0.2s"
//                             transform={snapshot.isDragging ? "scale(1.05)" : "scale(1)"}
//                             zIndex={snapshot.isDragging ? 100 : 1}
//                         >
//                             <SceneCard
//                             scene={scene}
//                             isSelected={selectedScene === scene.id}
//                             onSelect={() => setSelectedScene(scene.id)}
//                             onToggleDescription={toggleDescription}
//                             />
//                         </Box>
//                         )}
//                     </Draggable>
//                     ))}
//                     {provided.placeholder}
//                 </Flex>
//                 )}
//             </Droppable>
//             </DragDropContext>
//         </Box>
//       </div>
//     </Box>
//   );
// };

// export default Home;