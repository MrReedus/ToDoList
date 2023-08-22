import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Checkbox, IconButton} from "@mui/material";
import Button from "@mui/material/Button";
import {Delete} from "@mui/icons-material";
import MyCheckbox from "./MyCheckbox";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export function Todolist(props: PropsType) {
    const addTask = (title: string) => {
        props.addTask(title, props.id);
    }

    const removeTodolist = () => {
        props.removeTodolist(props.id);
    }
    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(props.id, title);
    }

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

    const onChangeHandler = (tId: string, newIsDoneValue: boolean) => {
        props.changeTaskStatus(tId, newIsDoneValue, props.id);
    }

    return <div>
        <h3><EditableSpan value={props.title} onChange={changeTodolistTitle}/>

            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)

                    const onTitleChangeHandler = (newValue: string) => {
                        props.changeTaskTitle(t.id, newValue, props.id);
                    }


                    return <li style={{
                        display: "flex",
                        justifyContent: "space-between"
                    }} key={t.id} className={t.isDone ? "is-done" : ""}>
                        <MyCheckbox checked={t.isDone}
                                    callBack={(newIsDoneValue: any) => onChangeHandler(t.id, newIsDoneValue)}/>
                        <EditableSpan value={t.title} onChange={onTitleChangeHandler}/>


                        <IconButton onClick={onClickHandler}>
                            <Delete/>
                        </IconButton>
                    </li>
                })
            }
        </ul>
        <Button color='inherit'
                variant={props.filter === 'all' ? "outlined" : "text"}
                onClick={onAllClickHandler}>All
        </Button>
        <Button color='info'
                variant={props.filter === 'active' ? "outlined" : "text"}
                onClick={onActiveClickHandler}>Active
        </Button>
        <Button color='secondary'
                variant={props.filter === 'completed' ? "outlined" : "text"}
                onClick={onCompletedClickHandler}>Completed
        </Button>
    </div>
}


