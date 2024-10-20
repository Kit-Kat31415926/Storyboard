

import React, { useState } from 'react';
import { Box, Flex, Button, Text, Heading, VStack, Input } from '@chakra-ui/react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { TitleBar } from '../components/TitleBar';
import { SceneCard } from '../components/SceneCard';
import SideBar from '../components/SideBar';

const Home = () => {
  const [scenes, setScenes] = useState([]);
  const [selectedSceneIndex, setSelectedSceneIndex] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [saveCreate, setSaveCreate] = useState('Create');
  const [file, setFile] = useState(null); // Store the uploaded file
  const [imageUrl, setImageUrl] = useState(null); // Preview of the uploaded image

  // const addScene = (title, description) => {
  //   if (saveCreate === "Create") {
  //     const newScene = {
  //       id: `scene-${scenes.length + 1}`,
  //       title: title,
  //       description: description,
  //       expanded: false,
  //     };
  //     setScenes([...scenes, newScene]);
  //     createNewScene();
  //   } else if (saveCreate === "Save") {
  //     scenes[selectedSceneIndex].title = title;
  //     scenes[selectedSceneIndex].description = description;
  //     createNewScene();
  //   }
    
  // };

  const createNewScene = () => {
    setTitle('');
    setDescription('');
    setSaveCreate('Create');
    setSelectedSceneIndex(null);
    setFile(null);
    setImageUrl(null);
  };

  const editScene = (index) => {
    if (selectedSceneIndex === index) {
      console.log('Deepgram API Key:', process.env.REACT_APP_DEEPGRAM_API_KEY);
      createNewScene()
      return
    }
    const selectedScene = scenes[index];
    // can't use selectedScenesIndex because above operation is asynchronous
    setTitle(selectedScene.title);
    setDescription(selectedScene.description);
    setSaveCreate('Save');
    setSelectedSceneIndex(index);
  };

  const toggleDescription = (id) => {
    setScenes(scenes.map(scene =>
      scene.id === id ? { ...scene, expanded: !scene.expanded } : scene
    ));
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(scenes);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setScenes(items);
  };

  return (
    <Flex minHeight="100vh" bg="white" fontFamily="'Roboto', sans-serif">
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
        setImageUrl={setImageUrl}/>
      <Box flex="1" p={8} overflowY="auto">
        <TitleBar scenes={scenes} selectedSceneIndex={selectedSceneIndex} createNewScene={createNewScene} />
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="scenes" direction="horizontal">
            {(provided) => (
              <Flex
                flexWrap="wrap"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {scenes.map((scene, index) => (
                  <Draggable key={scene.id} draggableId={scene.id} index={index}>
                    {(provided, snapshot) => (
                      <Box
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        m={2}
                        width="200px"
                        transition="transform 0.2s"
                        transform={snapshot.isDragging ? "scale(1.05)" : "scale(1)"}
                        zIndex={snapshot.isDragging ? 100 : 1}
                      >
                        <SceneCard
                          scene={scene}
                          isSelected={selectedSceneIndex === index}
                          onSelect={() => editScene(index)}
                          // onSelect={() => setSelectedScene(scene.id)}
                          onToggleDescription={toggleDescription}
                        />
                      </Box>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Flex>
            )}
          </Droppable>
        </DragDropContext>
      </Box>
    </Flex>
  );
};

export default Home;

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