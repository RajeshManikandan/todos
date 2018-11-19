import React, { Component } from 'react';
class ListElement extends Component {
    state = {};
    render() {
        return (
            <li key={this.props.pid} onClick={() => this.props.deletethis(this.props.pid)}>
                {this.props.pname}
            </li>
        );
    }
}

export default ListElement;
