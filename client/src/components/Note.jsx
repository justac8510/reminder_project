import { MdDelete, MdEdit } from "react-icons/md";
import EditNote from "./EditNote";

function Note({ note, toogleIsEditing, deleteNote, updateNote, }) {
    return (
    note.isEditing ? <EditNote note={ note } key={ note.id } updateNote={ updateNote } toogleIsEditing={ toogleIsEditing } /> :
    <div className="note">
        <p>{note.content}</p>
        <div style={{ cursor: "pointer"}}>
            <MdEdit style={{ margin: "0px 4px" }} onClick={() => {toogleIsEditing(note.id)}}/>
            <MdDelete style={{ margin: "0px 4px" }} onClick={() => {deleteNote(note.id)}} />
        </div>
    </div>
    );
}

export default Note;