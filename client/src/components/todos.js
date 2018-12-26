import React, { Component } from 'react';
import TodoItem from './todo';
class Todo extends Component {
    state = {
        todoInput: ''
    };
    addTodo = event => {
        if (event.keyCode === 13) {
            const { addNew } = this.props; //Methods
            this.setState({ todoInput: '' });
            addNew(event.target.value);
        }
    };
    handleChange = e => {
        this.setState({ ...this.state.data, [e.target.name]: e.target.value });
    };
    render() {
        const { todos, category, activeTodo } = this.props; //values
        const { updateActiveTodo } = this.props; //methods
        return (
            <div id="todos">
                <h3 className="heading">{category.name}</h3>
                <input
                    type="text"
                    name="todoInput"
                    id="todoInput"
                    value={this.state.todoInput}
                    placeholder="Enter your new Todo..."
                    onChange={this.handleChange}
                    onKeyDown={this.addTodo}
                />
                {todos.length > 0 ? (
                    todos.map(todo => (
                        <TodoItem
                            active={activeTodo._id === todo._id}
                            key={todo.createdAt}
                            todo={todo}
                            updateActiveTodo={updateActiveTodo}
                        />
                    ))
                ) : (
                    <div />
                )}
            </div>
        );
    }
}

export default Todo;
