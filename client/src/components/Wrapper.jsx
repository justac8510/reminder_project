import { useEffect, useState } from 'react';
import CreateForm from './CreateForm'
import Note from './Note';
import axios from 'axios';

function Wrapper() {
    //state representing note
    const [notes, setNotes] = useState([]);
    
    const getNotes = async () => {
        const response = await axios.get('/');

        if (response.status == 200){
            console.log(response.data)
            setNotes(response.data);
        } else{
            alert(response.status);
        }
    }

    useEffect(() => {
        getNotes();
    }, [])

    return (
        <div>
            <h1>備忘錄</h1>
            <CreateForm/>
        </div>
    )
}

export default Wrapper;