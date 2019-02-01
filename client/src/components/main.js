import React, { Component } from 'react';
import Todos from './todos';
import Categories from './categories';
import axios from 'axios';
import TodoDetail from './tododetail.jsx';

class Main extends Component {
    state = {
        categories: [],
        activeCategory: {},
        todos: [],
        activeTodo: {}
    };

    //Methods for Category
    loadCategory = () => {
        axios.get('/api/category').then(res => {
            var data = res.data;
            var activeCategory = data.length > 0 ? data[0] : { name: '' };
            this.setState({ categories: data, activeCategory });
            this.loadTodo();
        });
    };

    addCategory = category => {
        axios.post('/api/category', { name: category }).then(res => {
            console.log('category added');
            this.loadCategory();
            this.loadTodo();
        });
    }; 

    updateActiveCategory = category => {
        console.log('updateCategory', category.name);
        var activeCategoryID = category._id;
        console.log('updateCategory', activeCategoryID);
        axios.get(`/api/todo/category/${activeCategoryID}`).then(res => {
            var data = res.data;
            this.setState({ todos: data, activeCategory: category, activeTodo: data[0] });
        });
    };

    //Methods for Todos
    loadTodo = () => {
        var activeCategoryID = this.state.activeCategory._id;
        axios.get(`/api/todo/category/${activeCategoryID}`).then(res => {
            var data = res.data;
            this.setState({ todos: data });
        });
    };

    addTodo = name => {
        axios.post('/api/todo', { name: name, categoryId: this.state.activeCategory._id }).then(res => {
            console.log('category added');
            this.loadTodo();
        });
    };

    updateActiveTodo = todo => {
        this.setState({ activeTodo: todo });
    };
    componentDidMount = () => {
        this.loadCategory();
    };

    render() {
        const { categories, activeCategory, todos } = this.state;
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-2">
                        <Categories
                            categories={categories}
                            addNew={this.addCategory}
                            activeCategory={activeCategory}
                            updateActiveCategory={this.updateActiveCategory}
                        />
                    </div>
                    <div className="col-sm-7">
                        <Todos
                            todos={todos}
                            category={activeCategory}
                            addNew={this.addTodo}
                            updateActiveTodo={this.updateActiveTodo}
                            activeTodo={this.state.activeTodo}
                        />
                    </div>
                    <div className="col-sm-3">
                        <TodoDetail todo={this.state.activeTodo} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Main;
