import React, {useState, ChangeEvent, KeyboardEvent} from 'react';
import {FilterValuesType} from './App';

import Button from "./components/button";


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
}

export function Todolist(props: PropsType) {

    let [filter, setFilter] = useState<FilterValuesType>("all");

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
        //меняем состояние строки при каждом вводе чего либо в интпут
    }
    const AddTaskHandler = () => {
        props.addTask(props.taskText)
        props.setTaskText('')
        // значение поля ввода передается в функцию которая лежит в App
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            AddTaskHandler()
        }
    }
    const mappedTasks = filteredTasks().map(t =>
    {
        return(
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <Button name={'х'} callBack={() => props.removeTask(t.id)} />
            </li>
        )
    })


    return (
        <div>
            <h3>{props.title}</h3>
            <div style={{display: 'flex'}}>
                <input
                    type="text"
                    onChange={onChangeInput}
                    value={props.taskText}
                    onKeyDown={onKeyDownHandler}/>

                <Button name={'ADD TASK'} callBack={AddTaskHandler}/>
            </div>

            <ul>{mappedTasks}</ul>

            <Button name={'DELETE ALL'} callBack={props.deleteAllTask}/>

            <div style={{display: 'flex'}}>
                <Button name={'All'} callBack={() => {
                    changeFilter("all")
                }}/>
                <Button name={'Active'} callBack={() => {
                    changeFilter("active")
                }}/>
                <Button name={'Completed'} callBack={() => {
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