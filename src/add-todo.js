import React, {useState} from "react";
import { db } from "./fb-config";
import { collection, addDoc } from "firebase/firestore";


export default function AddTodo(){
    const [title, setTitle] = useState("");
    const handleSubmit = async(e) =>{
        e.preventDefault();
        if(title !== ""){
            await addDoc(collection(db, "todos"), {
                title,
                completed: false
            });
            setTitle("");
        }

    }
    return(
        <div>
            <div className="input_container">
                <form onSubmit={handleSubmit}>
                    <input type="text" className="input" placeholder="Enter todo"
                    value={title} onChange={(e)=> setTitle(e.target.value)}/>
                    <div className="btn_container">
                        <button className="btn"  type="submit" variant="warning">Add</button>
                    </div>
                </form>
            </div>
        </div>
    )
}