import React, { Component } from 'react';
class Subtask extends Component {
    state = {};

    render() {
        const { _id, isCompleted, name } = this.props.task;
        let classes = 'subtask';
        classes += isCompleted ? ' completed' : '';
        return (
            <div className={classes}>
                <input
                    name="isCompleted"
                    type="checkbox"
                    className="checkbox"
                    onChange={() => this.props.updateStatus(_id, isCompleted)}
                    checked={isCompleted}
                />
                <span className="name">{name}</span>
                <span className="close">x</span>
            </div>
        );
    }
}

export default Subtask;
