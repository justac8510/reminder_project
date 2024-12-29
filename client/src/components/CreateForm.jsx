import { useState } from "react";

function CreateForm( { addNote, } ) {
    const [content, setContent] = useState('');

    const handleSubmit = ((e) => {
        if (!(content === "")){
            e.preventDefault();
            addNote(content);
            setContent('');
        } else{
            alert("內容不能為空");
        }
    });

    return(
    <form className="create-form" onSubmit={handleSubmit}>
        <input className="create-form-input" type="text" placeholder="輸入代辦事項" value={content} onChange={(e) => {setContent(e.target.value)}}/>
        <button className="create-form-button">加入</button>
    </form>
    );
}

export default CreateForm;