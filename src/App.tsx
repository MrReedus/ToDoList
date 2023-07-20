import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {log} from "util";

export type FilterValuesType = "all" | "active" | "completed";

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    const removeTodolist = (todoListID: string) => {
        setTodolists(todolists.filter(tl=> tl.id !== todoListID))
    }

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })


    function removeTask(todoListID: string, id: string) {
        setTasks({...tasks,[todoListID]: tasks[todoListID].filter(t => t.id != id)})
        delete tasks[todoListID] // удаляем туцду лист из стейта
    }


    function addTask(todoListID: string, title: string) {
        let task = {id: v1(), title: title, isDone: false};
        setTasks(  {...tasks, [todoListID]: [...tasks[todoListID], task ]})

    }

    function changeStatus(todoListID: string, taskId: string, isDoneValue: boolean) {
        
        setTasks({...tasks, [todoListID]: tasks[todoListID].map(t => (t.id === taskId ) ? {...t, isDone:isDoneValue} : t)})
    }
    
    function changeFilter(todoListID: string, value: FilterValuesType, ) {
             setTodolists(todolists.map(t=>t.id === todoListID ? {...t, filter: value   } : t))
    }








    return (
        <div className="App">
            {
                todolists.map(tl => {

                    let tasksForTodolist = tasks[tl.id];

                    if (tl.filter === "active") {
                        tasksForTodolist = tasks[tl.id].filter(t => t.isDone === false);
                    }
                    if (tl.filter === "completed") {
                        tasksForTodolist = tasks[tl.id].filter(t => t.isDone === true);
                    }
                    return (
                        <Todolist key={tl.id}
                                  todolistId={tl.id}
                                  title={tl.title}
                                  tasks={tasksForTodolist}
                                  removeTask={removeTask}
                                  changeFilter={changeFilter}
                                  addTask={addTask}
                                  changeTaskStatus={changeStatus}
                                  filter={tl.filter}
                                  removeTodolist={removeTodolist}
                        />
                    )
                })
            }

        </div>
    );
}

export default App;
