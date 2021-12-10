import React from "react";
import { Duck } from "./demp";

interface Props{
    duck:Duck
}

export default function DuckItem({duck}: Props){
    return(
        <div>
            <span>{duck.name}</span>
            <button onClick={()=> duck.makesound(duck.name + 'quack')}>make sound</button>

        </div>
    )
}