import React, {useState, ChangeEvent, KeyboardEvent} from 'react';
import {FilterValuesType} from '../../App';
import Button from "../Button";
import styles from "./Todolist.module.css";


type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    deleteAllTask: () => void
    taskText: string
    setTaskText: (title: string) => void
    // callBack: (text: string) => void
    addTask: (text: string) => void
    changeIsDone: (newId: string, newIsDone: boolean) => void
}

export function Todolist(props: PropsType) {

    const [filter, setFilter] = useState<FilterValuesType>("all");
    const [error, setError] = useState<null | string>(null)

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    const filteredTasks = () => {

        let tasksForTodolist = props.tasks;

        if (filter === "active") {
            return tasksForTodolist = props.tasks.filter(t => !t.isDone);
        }
        if (filter === "completed") {
            return tasksForTodolist = props.tasks.filter(t => t.isDone);
        }

        return tasksForTodolist;
    }


    const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
        props.setTaskText(event.target.value)
        setError(null)
        //меняем состояние строки при каждом вводе чего либо в интпут
    }
    const AddTaskHandler = () => {
        if (props.taskText.trim()) {
            props.addTask(props.taskText.trim())
            props.setTaskText('')
        } else {
            setError('title is requred!')
        } // Если строка не пустая то таска отправляется, а если пустая то появляется ошибка.

        // значение поля ввода передается в функцию которая лежит в App
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            AddTaskHandler()
        }
    }

    const mappedTasks = filteredTasks().map(t => {

        const changeIsDoneHandler = (event: ChangeEvent<HTMLInputElement>) => {
            props.changeIsDone(t.id, event.currentTarget.checked)
        }

        return (
            <li style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: "space-between",
                textAlign: 'left'
            }}
                className={ t.isDone ? styles.isDone : ""}
                key={t.id} >
                <input type="checkbox" checked={t.isDone} onChange={changeIsDoneHandler}/>
                <span>{t.title}</span>

                <Button className={'btnRemove'} name={'х'} callBack={() => props.removeTask(t.id)}/>
            </li>
        )
    })


    return (
        <div>
            <h3>{props.title}</h3>
            <div style={{display: 'flex'}}>
                <input
                    className={error ? styles.error : ''}
                    type="text"
                    onChange={onChangeInput}
                    value={props.taskText}
                    onKeyDown={onKeyDownHandler}/>

                <Button name={'ADD TASK'} callBack={AddTaskHandler}/>
            </div>
            <div className={styles.errorMessage}>{error}</div>

            <ul>{mappedTasks}</ul>

            <Button name={'DELETE ALL'} callBack={props.deleteAllTask}/>

            <div style={{display: 'flex'}}>
                <Button className={filter === 'all' ? styles.activeFilter : ''} name={'All'} callBack={() => {
                    changeFilter("all")
                }}/>
                <Button className={filter === 'active' ? styles.activeFilter : ''} name={'Active'} callBack={() => {
                    changeFilter("active")
                }}/>
                <Button className={filter === 'completed' ? styles.activeFilter : ''}
                        name={'Completed'}
                        callBack={() => {
                    changeFilter("completed")
                }}/>
            </div>
        </div>
    )
}


//------------------------------------------------------------------------------------------------

// import React, {useState} from 'react';
// import {FilterValuesType} from './App';
//
// type TaskType = {
//     id: number
//     title: string
//     isDone: boolean
// }
//
// type PropsType = {
//     title: string
//     tasks: Array<TaskType>
//     removeTask: (taskId: number) => void
//     //changeFilter: (value: FilterValuesType) => void
//     deleteAllTasks:()=>void
// }
//
// export function Todolist(props: PropsType) {
//
//     let [filter, setFilter] = useState<FilterValuesType>("all");
//
//     let tasksForTodolist = props.tasks;
//
//     if (filter === "three") {
//         tasksForTodolist = props.tasks.filter(t => t.id<4);
//     }
//     if (filter === "active") {
//         tasksForTodolist = props.tasks.filter(t => t.isDone === false);
//     }
//     if (filter === "completed") {
//         tasksForTodolist = props.tasks.filter(t => t.isDone === true);
//     }
//
//     function changeFilter(value: FilterValuesType) {
//         setFilter(value);
//     }
//
//     return <div>
//         <h3>{props.title}</h3>
//         <div>
//             <input/>
//             <button>+</button>
//         </div>
//         <ul>
//             {
//                 tasksForTodolist.map(t => <li key={t.id}>
//                     <input type="checkbox" checked={t.isDone}/>
//                     <span>{t.title}</span>
//                     <button onClick={ () => { props.removeTask(t.id) } }>x</button>
//                 </li>)
//             }
//         </ul>
//         <button onClick={()=>props.deleteAllTasks()}>DELETE ALL TASKS</button>
//         <div>
//             <button onClick={ () => { changeFilter("three") } }>
//                 Give me the first three
//             </button>
//             <button onClick={ () => { changeFilter("all") } }>
//                 All
//             </button>
//             <button onClick={ () => { changeFilter("active") } }>
//                 Active
//             </button>
//             <button onClick={ () => { changeFilter("completed") } }>
//                 Completed
//             </button>
//         </div>
//     </div>
// }