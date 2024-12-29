import { useState } from "react";

function CreateForm() {
    const [content, setContent] = useState('');

    return(
    <form className="create_form">
        <input className="create-form-input" type="text" placeholder="輸入代辦事項"/>
        <button className="create-form-button">加入</button>
    </form>
    );
}

export default CreateForm;