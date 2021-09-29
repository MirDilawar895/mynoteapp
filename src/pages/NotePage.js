import React,{useState, useEffect} from 'react'
// import notes from '../assets/data'
import {Link} from 'react-router-dom'
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'
const NotePage = ({match, history}) => {
    let noteid = match.params.id
    let [note, setNotes] = useState(null)
    // let note = notes.find(note => note.id === Number(noteid))

    useEffect(() => {
        getNote()

    }, 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [noteid] )



    let getNote = async () => {
        if (noteid === 'new') return
        let response = await fetch(`http://localhost:8000/notes/${noteid}`)
        let data = await response.json()
        setNotes(data)
    }


    let updateNote = async() =>{
        await fetch(`http://localhost:8000/notes/${noteid}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...note, 'updated': new Date() })
                })
    }

    let handleSubmit = () =>{
        if (noteid !== 'new' &&  !note.body){
            deleteNote()
        }
        else if(noteid !== 'new'){
            updateNote()
        }
     else if (noteid === 'new' && note !== null) {
        createNote()
     }
        
        history.push('/')
    }

    const createNote = async () =>{
        await fetch(`http://localhost:8000/notes/`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...note, 'updated': new Date() })
                })
    }

    const deleteNote = async () => {
        await fetch(`http://localhost:8000/notes/${noteid}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
        history.push('/')
    }


    return (
        <div className="note">
            <div className="note-header">
                <h3>
                   <Link to="/">
                       <ArrowLeft onClick={handleSubmit} />

                   </Link>
                </h3>
                {noteid !== 'new' ? (
                    <button onClick={deleteNote}>Delete</button>
                ): 
                <button onClick={handleSubmit}>Done</button>
                }
                

            </div>
            <textarea  onChange={(e) => { setNotes({ ...note, 'body': e.target.value }) }} 
             placeholder="Add note" value={note?.body}></textarea>
            
        </div>
    )
}

export default NotePage
