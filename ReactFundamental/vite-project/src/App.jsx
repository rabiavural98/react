import React, {useRef} from 'react';

const App = () => {
 let myHeadLine = useRef();

 const change=()=>{
     
 }
    return (
        <div>
           <h1 className='text-success'>This is head Line</h1>
            <button onClick={change}>Click</button>
        </div>
    );
};

export default App;