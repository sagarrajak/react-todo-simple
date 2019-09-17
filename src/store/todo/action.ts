import { ENUMTodoAction, ITodo, ITodoAction } from "./types";

export function todoActionCreator(action: ENUMTodoAction, todo: ITodo): ITodoAction {
    const paylod = {} as ITodoAction;
    paylod.type = action;
    switch (action) {
        case ENUMTodoAction.ADD_TODO: {
            return {
                type: action,
                add_payload: todo
            }
        }
        case ENUMTodoAction.DELETE_TODO: {
            return {
                type: action,
                delete_paylod: todo.id
            }
        }
        case ENUMTodoAction.UPDATE_TODO: {
            return {
                type: action,
                update_payload: todo
            }
        }
    }
    return paylod;
}