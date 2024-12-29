import { useEffect, useState } from 'react';
import CreateForm from './CreateForm'
import Note from './Note';
import axios from 'axios';

function Wrapper() {
    //state representing note, two elements for testing
    const [notes, setNotes] = useState([
        {id: Math.random(), content: "finish the project"},
        {id: Math.random(), content: "fix the laptop"}
    ]);
    
    //api call
    const fetchData = async () => {
        const response = await axios.get('http://localhost:8080/getNotes');

        if (response.status == 200){
            let upadated_notes = response.data.notes;
            console.log("data: " + JSON.stringify(upadated_notes[0]));
            setNotes(Object.values(upadated_notes).map((note) => {
                return {id: note.id, content: note.notecontent};
            }));
        } else{
            alert(response.status);
        }
    }

    //maybe use callback
    useEffect(() => {
        fetchData();
    }, []);

    const addNote = async (content) => {
        let data = { content: content };
        const request = await axios.post("http://localhost:8080/addNote", data)
         .then(response => {
            console.log(response.data);
         })
         .catch(error => {
            console.log(error);
         });
    }


    return (
        <div className="note-wrapper">
            <h1>備忘錄</h1>
            <CreateForm addNote={ addNote }/>
            {notes.map((note) => {
                return <Note note={note} key={note.id}/>;
            })}
        </div>
    );
}

export default Wrapper;