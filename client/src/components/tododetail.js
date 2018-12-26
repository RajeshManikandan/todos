import React, { Component } from 'react';
import Subtask from './subtask';
class TodoDetail extends Component {
    render() {
        const { name, subtasks } = this.props.todo; //value
        return (
            <div>
                <h3>Details</h3>

                {name ? (
                    <div id="details">
                        <input type="text" className="title" readOnly value={name} />
                        {subtasks ? (
                            <div>
                                <div className="subtasks">
                                    {subtasks.map(subtask => <Subtask key={subtask._id} task={subtask} />)}
                                </div>
                            </div>
                        ) : (
                            ''
                        )}
                        <input type="text" id="subtask" placeholder="Add New" />
                    </div>
                ) : (
                    ''
                )}
            </div>
        );
    }
}

export default TodoDetail;
