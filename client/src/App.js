import React, { Component } from 'react';
import './styles/app.css';
import Main from './components/main';
import NavBar from './components/navbar';

class App extends Component {
    render() {
        return (
            <div className="App">
                <NavBar />
                <Main />
            </div>
        );
    }
}

export default App;
