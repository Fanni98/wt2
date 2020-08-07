import React, { Component } from 'react';
import TestInput from './TestInput';
import TestContent from './TestContent';


class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    
      
    };
  }

 
  render() {
    return(
        <div>
            Parent
            <TestInput />
            <TestContent />
        </div>
    )
  }
}

export default Test;