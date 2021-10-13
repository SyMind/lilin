import { Component } from 'react';
import '../../../dist/lilin.css';
import './app.scss';

class App extends Component {
    render () {
        return this.props.children;
    }
}

export default App;
