import React, { Component } from 'react';
import axios from 'axios';
import '../App.css';

class UpdateAnimalInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      type: '',
      age: '',
      rescue_date: '',
      description: ''
    };
  }

  componentDidMount() {
    // console.log("Print id: " + this.props.match.params.id);
    axios
      .get('http://localhost:8082/api/animals/'+this.props.match.params.id)
      .then(res => {
        // this.setState({...this.state, animal: res.data})
        this.setState({
          name: res.data.name,
          type: res.data.type,
          age: res.data.age,
	        rescue_date: res.data.rescue_date,
          description: res.data.description
        })
      })
      .catch(err => {
        console.log("Error from UpdateAnimalInfo");
      })
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const data = {
      name: this.state.name,
      type: this.state.type,
      age: this.state.age,
      rescue_date: this.state.rescue_date,
      description: this.state.description
    };

    axios
      .put('http://localhost:8082/api/animals/'+this.props.match.params.id, data)
      .then(res => {
        this.props.history.push('/show-animal/'+this.props.match.params.id);
      })
      .catch(err => {
        console.log("Error in UpdateAnimalInfo!");
      })
  };


  render() {
    return (
      <div className="UpdateInfo">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Edit</h1>
              <p className="lead text-center">
                  Update Animal's Info
              </p>
            </div>
          </div>

          <div className="col-md-8 m-auto">
          <form noValidate onSubmit={this.onSubmit}>
            <div className='form-group'>
              <label htmlFor="name">Name</label>
              <input
                type='text'
                placeholder='name'
                name='name'
                className='form-control'
                value={this.state.name}
                onChange={this.onChange}
              />
            </div>
            <br />

            <div className='form-group'>
            <label htmlFor="type">Type</label>
              <input
                type='text'
                placeholder='type'
                name='type'
                className='form-control'
                value={this.state.type}
                onChange={this.onChange}
              />
            </div>

            <div className='form-group'>
            <label htmlFor="age">Age</label>
              <input
                type='text'
                placeholder='age'
                name='age'
                className='form-control'
                value={this.state.age}
                onChange={this.onChange}
              />
            </div>

 	          <div className='form-group'>
            <label htmlFor="rescue_date">Rescue Date</label>
              <input
                type='date'
                placeholder='rescue_date'
                name='rescue_date'
                className='form-control'
                value={this.state.rescue_date}
                onChange={this.onChange}
              />
            </div>

            <div className='form-group'>
            <label htmlFor="description">Description</label>
              <input
                type='text'
                placeholder='Describe this animal'
                name='description'
                className='form-control'
                value={this.state.description}
                onChange={this.onChange}
              />
            </div>

            <button type="submit" className="btn btn-outline-info btn-lg btn-block">Update</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default UpdateAnimalInfo;