import React, { Component } from 'react';
import axios from 'axios';
class TodoItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props.todo
        };
    }
    togglePlay = () => {
        const todo = this.state;
        if (todo.status === 'Playing') {
            axios.get(`/api/todo/${todo._id}/pause`).then(() => {
                this.setState({ status: 'Open' });
            });
        } else if (todo.status === 'Open') {
            axios.get(`/api/todo/${todo._id}/play`).then(() => {
                this.setState({ status: 'Playing' });
            });
        }
    };
    changeStatus = event => {
        const todo = this.state;
        var status = event.target.checked ? 'Completed' : 'Open';
        axios.post(`/api/todo/status`, { todoId: todo._id, status: status }).then(() => {
            this.setState({ status: status });
        });
    };
    render() {
        const { active } = this.props; //values
        const { updateActiveTodo } = this.props; //methods
        const todo = this.state;
        const subtasks = todo.subtasks;
        const totalCount = subtasks.length;
        const completedTasks = subtasks.filter(subtask => subtask.isCompleted); //Need to Update
        const completedCount = completedTasks.length;
        let classes = 'todo-item';
        classes += todo.status === 'Playing' ? ' active-play' : '';
        classes += todo.status === 'Completed' ? ' completed' : '';
        classes += active ? ' active' : '';
        return (
            <div className={classes} onClick={() => updateActiveTodo(todo)}>
                <input
                    type="checkbox"
                    className="checkbox"
                    onChange={this.changeStatus}
                    checked={todo.status === 'Completed'}
                />
                <span className="title">{todo.name}</span>
                {todo.status === 'Playing' ? (
                    <img src="assets/pause-symbol.svg" alt="" className="pause-logo" onClick={this.togglePlay} />
                ) : todo.status === 'Open' ? (
                    <img src="assets/play-button.svg" alt="" className="start-logo" onClick={this.togglePlay} />
                ) : (
                    ''
                )}
                <span className="sub-title">{`${completedCount} of ${totalCount}`}</span>
            </div>
        );
    }
}

export default TodoItem;
