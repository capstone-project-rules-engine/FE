import React from 'react'
import { ClipLoader } from 'react-spinners'


const Loading = ({
    loading
}
) => {
    const override = {
        display: "block",
        margin: "0 auto",
        borderColor: "black",
    };
    return (
        <div className='flex flex-col h-screen justify-center items-center'>
           <ClipLoader 
           loading={loading}
           color="#36d7b7"
           size={250}
           />
           <p className='animate-pulse'>Loading...</p>
        </div>
    )
}

export default Loading