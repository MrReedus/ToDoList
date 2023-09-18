import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

export {}
import { TasksStateType} from "../App";
import {v1} from "uuid";

type removeTaskACType = ReturnType<typeof removeTaskAC>
type addTaskACType = ReturnType<typeof addTaskAC>
type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>

type changeTaskTitleACACType = ReturnType<typeof changeTaskTitleAC>

type ActionsTypes = removeTaskACType
    | addTaskACType
    | changeTaskStatusACType
    | changeTaskTitleACACType
    | AddTodolistActionType
    | RemoveTodolistActionType

export const tasksReducer = (state: TasksStateType, action: ActionsTypes) => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.taskId)
            }
        case "ADD-TASK":

            return {
                ...state,
                [action.todolistId]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistId]]
            }
        case "CHANGE-STATUS":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(task => task.id === action.taskId ? {
                        ...task,
                        isDone: action.status
                    } : task)
            }
        case "CHANGE-TITLE":
            return {
                ...state, [action.todolistId]: state[action.todolistId]
                    .map(task => task.id === action.taskId ? {...task, title: action.title} : task)
            }
        case "ADD-TODOLIST":
            return {...state, [action.todolistId]: []}

        case "REMOVE-TODOLIST":
            let copyState = {...state}
            delete copyState[action.id]
            return copyState

        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {type: 'REMOVE-TASK', taskId, todolistId} as const
}
export const addTaskAC = (title: string, todolistId: string) => {
    return {type: 'ADD-TASK', title, todolistId} as const
}
export const changeTaskStatusAC = (taskId: string, status: boolean, todolistId: string) => {
    return {type: 'CHANGE-STATUS', taskId, status, todolistId} as const
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
    return {type: 'CHANGE-TITLE', taskId, title, todolistId} as const
}





