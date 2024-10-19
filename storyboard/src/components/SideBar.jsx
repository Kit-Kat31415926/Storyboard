import mic from '../assets/microphone.png';

const SideBar = () => {
    return (
        <div className='SideBar h-full border-2 border-gray-200 
                border-opacity-60 rounded-lg 
                overflow-hidden'>
            <h1>Insert title here</h1>
            <div className='TextInput'>
                </div><h2>Text</h2>
                <img src={mic} alt='microphone'></img>
            <div className='ImageInput'>
                <h2>Image</h2>
                <button>Upload Image</button>
            </div>
            <div className='Options'>
                <button>Delete</button>
                <button>Save</button>
            </div>
        </div>
    );
}

export default SideBar;