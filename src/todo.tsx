import React, { ChangeEvent, Component, Dispatch } from 'react';
import { connect } from 'react-redux';
import { todoActionCreator } from './store/todo/action';
import { ENUMTodoAction, ITodo, ITodoAction } from './store/todo/types';
import { IMainState } from './store/types';

interface IDispatchProps {
    addTodo: (todo: ITodo) => void
    deleteTodo: (todo: ITodo) => void
    markAsComplete: (todo: ITodo) => void
}

interface IStateProps {
    todos: ITodo[];
}

interface IOwnProps { }

interface IState {
    todo: string;
    discription: string; 
}

type IProps = IDispatchProps & IStateProps & IOwnProps;

class Todo extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            discription: '',
            todo: '' 
        }
        this.handleSubmit =this.handleSubmit.bind(this);
    }

    render() {
        return (
            <div>
                <input
                    value={this.state.todo}
                    onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                        this.setState({
                            todo: evt.target.value
                        })
                    }}
                    placeholder='Add Todo'
                />
                <textarea 
                    value={this.state.discription}
                    placeholder='discription'
                    onChange={(evt: ChangeEvent<HTMLTextAreaElement>) => {
                        this.setState({
                            discription: evt.target.value
                        });
                    }}  
                />
                 <button onClick={this.handleSubmit}>submit</button>
                 <ul>
                    {
                        this.props.todos.map(todo => !todo.isCompleted ? (
                            <li key={todo.id}>
                                <h4>{todo.name}</h4>
                                <p>{todo.discription}</p>
                                <button onClick={() => this.props.deleteTodo(todo)}>Delete</button>
                                <button onClick={() => this.props.markAsComplete(todo)}>Make Done</button>
                            </li>
                            ) : (
                                <li key={todo.id}>
                                <h4><s>{todo.name}</s></h4>
                                <p><s>{todo.discription}</s></p>
                                <button onClick={() => this.props.deleteTodo(todo)}>Delete</button>
                            </li>
                            )
                        )
                    }
                </ul>
            </div>
        )
    }

    private handleSubmit(): void {
        if (this.state.todo && this.state.discription) {
            this.props.addTodo({
                discription: this.state.discription,
                isCompleted: false,
                name: this.state.todo
            });
            this.setState({
                discription: '',
                todo: ''
            });
        }
        else {
            alert('No TODO Added');
        }
    }
}

const mapStateToProps = (state: IMainState, ownProps: IOwnProps): IStateProps => {
    return {
        todos: state.todo.todos,
    }
}

const mapDispathToProps = (dispatch: Dispatch<ITodoAction>): IDispatchProps => {
    return {
        addTodo: (todo) => dispatch(todoActionCreator(ENUMTodoAction.ADD_TODO, todo)),
        deleteTodo: (todo) => dispatch(todoActionCreator(ENUMTodoAction.DELETE_TODO, todo)),
        markAsComplete: (todo) => dispatch(todoActionCreator(ENUMTodoAction.UPDATE_TODO, {...todo , isCompleted: true}))
    }
}

export default connect<IStateProps, IDispatchProps, IOwnProps, IMainState>(mapStateToProps, mapDispathToProps)(Todo);
