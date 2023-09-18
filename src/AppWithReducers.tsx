import React, {Reducer, useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {AppBar, IconButton, MenuItem, Typography, Toolbar, Button, Grid, Container, Paper} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithReducers() {


    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ])

    let [tasks, dispatchTasks] = useReducer(tasksReducer, {

        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    });


    function removeTask(id: string, todolistId: string) {
        dispatchTasks(removeTaskAC(id, todolistId));
    }

    function addTask(title: string, todolistId: string) {
        dispatchTasks(addTaskAC(title, todolistId));
    }

    function changeFilter(todolistId: string, value: FilterValuesType) {
        dispatchToTodolists(ChangeTodolistFilterAC(todolistId, value))
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {

        dispatchTasks(changeTaskStatusAC(id, isDone, todolistId))
    }

    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {

        dispatchTasks(changeTaskTitleAC(id, newTitle, todolistId))
    }

    function removeTodolist(id: string) {

        dispatchToTodolists(RemoveTodolistAC(id))
        dispatchTasks(RemoveTodolistAC(id))

    }

    function changeTodolistTitle(id: string, title: string) {

        dispatchToTodolists(ChangeTodolistTitleAC(id, title))
    }

    function addTodolist(title: string) {
        dispatchToTodolists(AddTodolistAC(title))
        dispatchTasks(AddTodolistAC(title))
    }

    return (
        <div className="App">

            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" color="inherit">
                        Todolist
                    </Typography>
                    <Button color={'inherit'}>Login</Button>
                </Toolbar>
            </AppBar>

            <Container>
                <Grid container style={{padding: '40px'}}>
                    <Paper elevation={2} style={{padding: '5px 10px'}}><AddItemForm
                        addItem={addTodolist}/></Paper></Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            let allTodolistTasks = tasks[tl.id];
                            let tasksForTodolist = allTodolistTasks;

                            if (tl.filter === "active") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
                            }
                            if (tl.filter === "completed") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
                            }

                            return <Grid item>
                                <Paper elevation={8} style={{padding: '20px'}}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    /></Paper></Grid>
                        })
                    }
                </Grid>

            </Container>


        </div>
    );
}

export default AppWithReducers;
