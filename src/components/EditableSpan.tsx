import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TaskType} from "../Todolist";

type propsType = {
    oldTitle: string
    callBack: (newTitle: string) => void

}
const EditableSpan = (props: propsType) => {
    const [edit, setEdit] = React.useState(false)
    const [newText, setNewText] = useState(props.oldTitle)
    const editHandler = () => {
        setEdit(!edit)
        if (edit) {
            props.callBack(newText, )
        }
    }


    // const onKeyHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    //     if (e.key === "Enter") {
    //         setNewText(newText)
    //         props.callBack(newText)
    //         setEdit(!edit)
    //     }
    //
    // }


    return (

        edit
            ? <input onChange={(e: ChangeEvent<HTMLInputElement>) => setNewText(e.currentTarget.value)}
                     // onKeyDown={onKeyHandler}
                     type='text'
                     value={newText} onBlur={editHandler} autoFocus/>
            : <span onDoubleClick={editHandler}>{props.oldTitle}</span>


    );
};

export default EditableSpan;