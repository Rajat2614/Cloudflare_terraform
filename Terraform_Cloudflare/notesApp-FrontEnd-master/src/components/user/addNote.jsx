import React, { useEffect } from 'react';
import uuid from 'react-uuid'
import {AdminPostApi, AdminGetApi, DeleteApi} from '../../services/admin/user';
import DisplayNotesComponent from './displayNotes'
import swal from 'sweetalert';

const shortid = require('shortid');

 
const postNotesApi = `https://0syowxfk1b.execute-api.ap-south-1.amazonaws.com/dev/addNote`;
const getNotesApi = `https://0syowxfk1b.execute-api.ap-south-1.amazonaws.com/dev/allNotes`;
const deleteURL = `https://0syowxfk1b.execute-api.ap-south-1.amazonaws.com/dev/deleteNote`;
const updateApi =`https://0syowxfk1b.execute-api.ap-south-1.amazonaws.com/dev/updateNote`;
const AddNotes = ()=>{
    
    const [heading, setHeading] = React.useState('')
    const [note, setNote] = React.useState('')
    const [imageUrl, setImageUrl] = React.useState('logo192.png');
    const [shortId, setShortId] = React.useState(`Id-${shortid()}`);
    const [activeIndex, setactiveIndex] = React.useState('');
    const [noteId, setNoteId] = React.useState();
    const [noteTime, setNoteTime] = React.useState();
    const [action, setAction] = React.useState('add');

    const [notesData, setNotesData] = React.useState([
        // {heading  : '1' , note : 'abcd', noteId : 'My id', noteTime: 1620135835679},
        // {heading  : '1' , note : 'abcd', noteId : 'My id', noteTime: 1620135835678},
        // {heading  : '1' , note : 'abcd', noteId : 'My id', noteTime: 123453},
        // {heading  : '1' , note : 'abcd', noteId : 'My id', noteTime: 123454},
        // {heading  : '1' , note : 'abcd', noteId : 'My id', noteTime: 123455},
        // {heading  : '1' , note : 'abcd', noteId : 'My id', noteTime: 123456},
        // {heading  : '1' , note : 'abcd', noteId : 'My id', noteTime: 123457},
    ]);

    useEffect(()=>{
        fetchData()
    }, [])

    const fetchData = async()=>{
        const response = await AdminGetApi(getNotesApi);
        console.log("fetch data is", response.result.data.Items )
        // response.result.data.Items.
        setNotesData(response.result.data.Items)
    }
    
    const editNote = (data)=>{
        console.log("edit event",data);
        setAction('edit')
        setHeading(data.heading);
        setNote(data.note);
        setNoteId(data.noteId);
        setNoteTime(data.noteTime)
        let dataC = [...notesData];
        let index = dataC.indexOf(data);
        setactiveIndex(index);
        console.log("index is", index)
        
    }

    const deleteNote = async(data)=>{
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then(async (willDelete) => {
            if (willDelete) {
            
                let finURL = `${deleteURL}?noteId=${data.noteId}&noteTime=${data.noteTime}`;
                let response = await  DeleteApi(finURL);
                console.log("delete response", response);
                let dataC = [...notesData];
                let index = dataC.indexOf(data);
                console.log("index is", index)
                dataC.splice(index, 1);
                console.log(dataC)
                setNotesData(dataC)
                swal("Note is deleted", {
                    icon: "success",
                });
            } else {
              swal("Delete request cancelled");
            }
          });

        
    }

    const formSubmit = async(e)=>{
        e.preventDefault();
        console.log('Form submit')
        let data = {note, heading};
        if(action == 'add'){
            let response = await AdminPostApi(`${postNotesApi}/${shortId}`, data);
            swal("Note is added", {
                icon: "success",
            });
            console.log("Response from add note", response)
            fetchData();

        } else if(action == 'edit') {
            
            let dataC = [...notesData];
            dataC[activeIndex] = {note, heading, noteId, noteTime};
            let finURL = `${updateApi}?noteId=${noteId}&noteTime=${noteTime}`;
            let response = await AdminPostApi(finURL, {note, heading});
            setNotesData(dataC);
            convertStatesToAdd()
            swal("Changes are saved", {
                icon: "success",
            });
        }
        
    }

    const convertStatesToAdd = ()=>{
        setHeading('');
        setNote('');
        setNoteId('');
        setNoteTime('')
        setAction('add')
    }
    return (
        <div>
            <div className='create'>
                { action == 'add' && <h2>Add new Note</h2> }
                { action == 'edit' && <h2>Edit Note</h2> }
                <form onSubmit={formSubmit}>
                    <div className='forImage'>
                        <div>
                            <img className='profileImg' src={imageUrl}/>
                        </div>
                    </div>
                    <div>
                        <label >Heading</label>
                        <input 
                            value={heading}
                            type="text" 
                            onChange={(e)=>setHeading(e.target.value)}
                            required/>
                    </div>
                    
                    <div>
                        <label>Note</label>
                        <textarea  
                            required 
                            value={note}
                            onChange={(e)=>{setNote(e.target.value)}}
                        ></textarea>
                    </div>              
                    
                    { action == 'add' &&
                        <div>
                            <button type='submit'>Add Notes</button>
                        </div> 
                    }
                    { action == 'edit' &&
                        <div>
                            <button type='submit'>Save changes</button>
                        </div> 
                    }
                </form>
            </div>
            <DisplayNotesComponent 
                editEvent={editNote} 
                deleteEvent={deleteNote} 
                noteData={notesData}>
            </DisplayNotesComponent>
         </div>
    )
}


export default AddNotes