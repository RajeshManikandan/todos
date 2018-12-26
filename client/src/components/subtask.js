import React, { Component } from 'react';
class Subtask extends Component {
    state = {};
    render() {
        const { isCompleted, name } = this.props.task;
        return (
            <div className="subtask">
                <input type="checkbox" className="checkbox" checked={isCompleted} />
                <span className="name">{name}</span>
                <span className="close">x</span>
            </div>
        );
    }
}

export default Subtask;
