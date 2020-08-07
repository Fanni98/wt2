import React, { Component } from 'react';
import { connect } from 'react-redux';

import {AddTodo} from '../adapters/todo/actions'

class TestInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
        task: ''
    };
  }

    onSubmit = e => {
        e.preventDefault();

        const data = {
            task: this.state.task
        };
        this.props.dispatch(AddTodo(data))
        this.setState({task: ''})
        console.log(data)
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        return(
            <form noValidate onSubmit={this.onSubmit}>
                <div className='form-group'>
                    <input
                        type='text'
                        name='task'
                        className='form-control'
                        value={this.state.task}
                        onChange={this.onChange}
                    />
                </div>

                <input
                    type="submit"
                    value="+"
                    className="btn btn-outline-warning btn-block mt-4"
                />
            </form>
        )
    }
}
export default connect(store => ({

}))(TestInput)