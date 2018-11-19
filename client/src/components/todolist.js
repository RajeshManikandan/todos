import React, { Component } from 'react';
import ListElement from './listelement';
import axios from 'axios';
class TodoList extends Component {
    state = {
        list: []
    };

    componentDidMount = () => {
        this.updateList();
    };

    updateList = () => {
        axios
            .get('/api/todo')
            .then(res => {
                if (res.data.length !== 0) this.setState({ list: res.data });
                else this.setState({ list: [] });
            })
            .catch(err => console.log(err));
    };

    //function to add todo list
    addTodo = e => {
        const newTodo = this._inputElement.value;
        this._inputElement.value = '';
        axios
            .post('/api/todo', { name: newTodo })
            .then(todo => {
                console.log(todo);
                this.updateList();
            })
            .catch(err => console.log(err));

        e.preventDefault();
    };

    removeTodo = id => {
        axios
            .delete(`/api/todo/${id}`)
            .then(todo => {
                console.log(todo);
                this.updateList();
            })
            .catch(err => console.log(err.data));
    };

    render() {
        const { list } = this.state;
        console.log(list);
        return (
            <div>
                <h2>Todo App</h2>
                <form onSubmit={this.addTodo}>
                    <input name="name" ref={a => (this._inputElement = a)} />
                    <button>ADD</button>
                </form>
                {list.length > 0
                    ? list.map(todo => <ListElement pid={todo._id} pname={todo.name} deletethis={this.removeTodo} />)
                    : null}
            </div>
        );
    }
}

export default TodoList;
