import React, { Component } from 'react';
import Subtask from './subtask';
import axios from 'axios';
class TodoDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.props.todo,
            subtask: ''
        };
    }
    handleChange = (e) => {
        this.setState({ ...this.state, [e.target.name]: e.target.value });
    };
    componentWillReceiveProps(nextProps) {
        if (nextProps !== this.state) {
            this.setState({ ...nextProps.todo });
        }
    }
    updateStatus = (id, flag) => {
        const status = !flag;
        axios.post('/api/todo/subtask/status', { subtask_id: id, status, todoID: this.state._id }).then((res) => {
            this.setState({ ...res.data });
        });
    };
    addSubTask = (event) => {
        if (event.keyCode === 13) {
            const name = event.target.value;
            axios
                .post('/api/todo/subtask', {
                    name,
                    todoID: this.state._id
                })
                .then((res) => {
                    console.log(res.data);
                    const subtasks = this.state.subtasks;
                    subtasks.push({
                        ...res.data
                    });
                    this.setState({ subtasks, subtask: '' });
                });
        }
    };
    render() {
        const { name, subtasks, totalWorkTime } = this.state; //value
        console.log(totalWorkTime);
        return (
            <div>
                <h3> Details </h3>
                {name ? (
                    <div id='details'>
                        <input type='text' className='title' readOnly value={name} />
                        {subtasks ? (
                            <div>
                                <div className='subtasks'>
                                    {subtasks.map((subtask, index) => (
                                        <Subtask key={index} task={subtask} updateStatus={this.updateStatus} />
                                    ))}
                                </div>
                            </div>
                        ) : (
                            ''
                        )}
                        <input
                            type='text'
                            id='subtask'
                            name='subtask'
                            placeholder='Add New'
                            value={this.state.subtask}
                            onChange={this.handleChange}
                            onKeyDown={this.addSubTask}
                        />
                        <div>Total time spent : {totalWorkTime.mins}</div>
                    </div>
                ) : (
                    ''
                )}
            </div>
        );
    }
}

export default TodoDetail;
