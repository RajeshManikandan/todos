import React, { Component } from 'react';
class Categories extends Component {
    state = {
        category: ''
    };

    handleChange = e => {
        this.setState({ ...this.state.data, [e.target.name]: e.target.value });
    };
    addCategory = event => {
        if (event.keyCode === 13) {
            const { addNew } = this.props; //Methods
            this.setState({ category: '' });
            addNew(event.target.value);
        }
    };
    render() {
        const { categories, activeCategory } = this.props; //values
        const { updateActiveCategory } = this.props; //methods
        return (
            <div id="categories">
                <h3>Lists</h3>
                <ul id="category-list">
                    {categories.map(category => (
                        <li
                            key={category._id}
                            className={category.name === activeCategory.name ? 'active' : ''}
                            onClick={() => updateActiveCategory(category)}
                        >
                            {category.name}
                        </li>
                    ))}
                </ul>
                <input
                    type="text"
                    name="category"
                    id="category"
                    value={this.state.category}
                    placeholder="New List"
                    onChange={this.handleChange}
                    onKeyDown={this.addCategory}
                />
            </div>
        );
    }
}

export default Categories;
