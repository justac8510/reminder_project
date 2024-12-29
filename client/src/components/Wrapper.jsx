import { useEffect, useState } from 'react';
import CreateForm from './CreateForm'
import Note from './Note';
import axios from 'axios';

function Wrapper() {
    //state representing note, two elements for testing
    const [notes, setNotes] = useState([
        {id: Math.random(), content: "finish the project", isEditing: false},
        {id: Math.random(), content: "fix the laptop", isEditing: false}
    ]);
    
    //api call
    const fetchData = async () => {
        const response = await axios.get('http://localhost:8080/getNotes');

        if (response.status == 200){
            let upadated_notes = response.data.notes;
            console.log("data: " + JSON.stringify(upadated_notes[0]));
            setNotes(Object.values(upadated_notes).map((note) => {
                return {id: note.id, content: note.notecontent, isEditing: false};
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
        let data = { newContent: content };
        const request = await axios.post("http://localhost:8080/addNote", data)
         .then(response => {
            console.log(response.data);
         })
         .catch(error => {
            console.log(error);
         });
         fetchData();
    }

    const deleteNote = async (id) => {
        let data = { id: id };
        const request = await axios.post("http://localhost:8080/deleteNote", data)
        .then(response => {
            console.log(response.data);
         })
         .catch(error => {
            console.log(error);
         });
         fetchData();
    }

    const updateNote = async (id, content) => {
        let data = { id: id , newContent: content};
        const request = await axios.post("http://localhost:8080/updateNote", data)
        .then(response => {
            console.log(response.data);
         })
         .catch(error => {
            console.log(error);
         });
         fetchData();
    }

    const toogleIsEditing = (id) => {

        setNotes(notes.map((note) => {return note.id===id ? {...note, isEditing: !note.isEditing} : note}));
    }

    return (
        <div className="note-wrapper">
            <h1>備忘錄</h1>
            <CreateForm addNote={ addNote }/>
            {notes.map((note) => {
                return <Note key={ note.id } note={ note }  fetchData={ fetchData }  deleteNote={ deleteNote } updateNote={ updateNote } toogleIsEditing={ toogleIsEditing }/>;
            })}
        </div>
    );
}

export default Wrapper;