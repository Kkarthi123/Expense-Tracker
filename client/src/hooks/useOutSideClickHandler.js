import React, { useEffect, useRef, useState } from 'react'

const useOutSideClickHandler = (callback) => {
    const domNode = useRef()
    useEffect(()=>{
        let handler = (e)=>{
            if(!domNode.current.contains(e.target)){
                callback(false)
            }
        }

        document.body.addEventListener("mousedown", handler);
        
        return()=>{
            document.body.removeEventListener("mousedown", handler);
        }
    })

    return domNode;
}

export default useOutSideClickHandler