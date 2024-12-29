import { MdDelete, MdEdit } from "react-icons/md";

function Note({ note }) {
    return (
    <div className="note">
        <p>{note.content}</p>
        <div style={{ cursor: "pointer"}}>
            <MdEdit style={{ margin: "0px 4px" }}/>
            <MdDelete style={{ margin: "0px 4px" }} />
        </div>
    </div>
    );
}

export default Note;