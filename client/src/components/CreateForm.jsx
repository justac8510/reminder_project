import { useState } from "react";


function CreateForm() {
    const [content, setContent] = useState('');

    return(
    <form>
        <input type="text" placeholder="輸入代辦事項"/>
        <button>加入</button>
    </form>
    );
}

export default CreateForm;