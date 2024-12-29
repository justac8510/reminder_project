import { useState } from "react";

function CreateForm( { addNote, } ) {
    const [content, setContent] = useState('');

    const handleSubmit = ((e) => {
        if (!(content === "")){
            e.preventDefault();
            addNote(content);
            setContent('');
        } else{
            alert("Content can not be empty!");
        }
    });

    return(
    <form className="create-form" onSubmit={handleSubmit}>
        <input className="create-form-input" type="text" placeholder="Enter Text" value={content} onChange={(e) => {setContent(e.target.value)}}/>
        <button className="create-form-button">Add</button>
    </form>
    );
}

export default CreateForm;