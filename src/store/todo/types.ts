
export interface ITotoState {
    todos: ITodo[];
}

export interface ITodo {
    name: string;
    isCompleted: boolean;
    discription: string;
    id?: number;
}

export enum ENUMTodoAction {
    ADD_TODO = 'add_todo',
    DELETE_TODO = 'delete_todo',
    UPDATE_TODO = 'update_todo',
}

export interface ITodoAction {
    type: ENUMTodoAction,
    add_payload?: ITodo,
    delete_paylod?: number,
    update_payload?: ITodo,
}
