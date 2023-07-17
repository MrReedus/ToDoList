import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

function App() {

    type TodolistType = {
        id: string
        title: string
        filter: FilterValuesType
    }



    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ]);

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id != id);
        setTasks(filteredTasks);
    }

    function addTask(title: string) {
        let task = {id: v1(), title: title, isDone: false};
        let newTasks = [task, ...tasks];
        setTasks(newTasks);
    }

    function changeStatus(taskId: string, isDone: boolean) {
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
        }

        setTasks([...tasks]);
    }






    let [todolists, setTodolists] = useState<Array<TodolistType>>(
        [
            {id: v1(), title: 'What to learn', filter: 'all'},
            {id: v1(), title: 'What to buy', filter: 'all'},
        ]
    )
    function changeFilter(value: FilterValuesType, todoListId: string) {
       let todoList = todolists.find(tl => tl.id === todoListId)
         if (todoList){
             todoList.filter = value;
             setTodolists([...todolists])
         }
    }

    return (
        <div className="App">
            {
                todolists.map(todolist => {

                    let tasksForTodolist = tasks;

                    if (todolist.filter === "active") {
                        tasksForTodolist = tasks.filter(t => t.isDone === false);
                    }
                    if (todolist.filter === "completed") {
                        tasksForTodolist = tasks.filter(t => t.isDone === true);
                    }
                    return (
                        <Todolist key={todolist.id}
                                  id={todolist.id}
                                  title={todolist.title}
                                  tasks={tasksForTodolist}
                                  removeTask={removeTask}
                                  changeFilter={changeFilter}
                                  addTask={addTask}
                                  changeTaskStatus={changeStatus}
                                  filter={todolist.filter}
                        />
                    )
                })
            }

        </div>
    );
}

export default App;
