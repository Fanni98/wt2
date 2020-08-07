import React, { Component } from 'react';
import { connect } from 'react-redux';

class TestContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
        
      
    };
  }
  

 
  render() {
        const todo = this.props.todo

        console.log('todooo',this.props.todo)
        const listItems = todo.data.map((task,taskIndex) => {
            return <li key={taskIndex}>{task.task}</li>
        });
      
    return(
        <div>Content
            <ul>
                {listItems}
            </ul>
            <hr />
            <ul>
                {
                    todo.data.map((task, taskIndex) => {
                        return <li key={taskIndex}>{task.task}</li>
                    })
                }
                </ul>
        </div>
        
    )
  }
}
export default connect(store => ({
    todo: store.todo
}))(TestContent)