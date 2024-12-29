import { useState } from "react";

function EditNote( { note, toogleIsEditing, updateNote, } ) {
    const [content, setContent] = useState('');

    const handleSubmit = ((e) => {
        if (!(content === "")){
            e.preventDefault();
            toogleIsEditing(note.id);
            updateNote(note.id, content);
            setContent('');
        } else{
            alert("Content can not be empty!");
        }
    });

    return(
    <form className="edit-form" onSubmit={handleSubmit}>
        <input className="edit-form-input" type="text" placeholder="Enter Text" value={content} onChange={(e) => {setContent(e.target.value)}}/>
        <button className="edit-form-button">Edit</button>
    </form>
    );
}

export default EditNote;