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
            alert("內容不能為空");
        }
    });

    return(
    <form className="edit-form" onSubmit={handleSubmit}>
        <input className="edit-form-input" type="text" placeholder="輸入代辦事項" value={content} onChange={(e) => {setContent(e.target.value)}}/>
        <button className="edit-form-button">編輯</button>
    </form>
    );
}

export default EditNote;