import React from 'react';

const displayNotes = (props) => {

    const timeStampToRedableFormat = (timestamp)=>{
        const dateObj =new Date(timestamp)
        var month = ("0" + (dateObj.getUTCMonth() + 1)).slice(-2) ; //months from 1-12
        var day = ("0" + dateObj.getUTCDate()).slice(-2) ;
        var year = dateObj.getUTCFullYear();
        const min = dateObj.getMinutes();
        const hours = dateObj.getHours();
        return  `${day}/${month}/${year}-${hours}:${min}`;
    }
    const clickEvent = ()=>{
        console.log("click event occured")
    }
    const getRowData =(data)=>{
        return data.map((rowData) => {
           const { heading, note, noteId, noteTime } = rowData;
           return (
              <tr key={noteTime}>
                 <td>{noteId}</td>
                 <td>{heading}</td>
                 <td>{note}</td>
                 <td>{timeStampToRedableFormat(noteTime)}</td>
                 <td>
                    <img className='icon' onClick={()=>props.editEvent(rowData)} src='edit.png'/>
                 </td>
                 <td>
                    <img className='icon' onClick={()=>props.deleteEvent(rowData)} src='deleteIcon.jpg'/>
                 </td>
              </tr>
           )
        })
     }

    return (
        <div style={{marginTop : '50px'}}>
            <div>
                <table id='notesTable'>
                <thead>
                    <tr>
                        <th>NoteId</th>
                        <th>heading</th>
                        <th>Note</th>
                        <th>noteTime</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {getRowData(props.noteData)}
                </tbody>
            </table>
         </div>
        </div>
    );
}
 
export default displayNotes;