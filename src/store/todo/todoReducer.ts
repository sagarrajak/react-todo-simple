import { ITotoState, ENUMTodoAction, ITodoAction } from "./types";

const initTodo: ITotoState = {
    todos: []
}

export const todoReducer = (state = initTodo, action: ITodoAction) => {
    if (action.type === ENUMTodoAction.ADD_TODO && action.add_payload) {
        return {
            todos: [...state.todos, ...[{ ...action.add_payload, ...{ id: Math.floor(Math.random() * 1000000) } }]]
        }
    }
    else if (action.type === ENUMTodoAction.UPDATE_TODO && action.update_payload && action.update_payload.id) {
        const id = action.update_payload.id;
        const index: number = state.todos.findIndex(todo => todo.id === id);
        if (index >= 0) {
            state.todos[index] = action.update_payload;
            state = {
                todos: [...state.todos]
            }
        }
        return { ...state };
    }
    else if (action.type === ENUMTodoAction.DELETE_TODO && action.delete_paylod) {
        const index: number = state.todos.findIndex(todo => todo.id === action.delete_paylod);
        if (index >= 0) state.todos.splice(index, 1);
        return {
            todos: [...state.todos]
        }
    }
    return { ...state };
}