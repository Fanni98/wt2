import React, { Component } from 'react'

class SelectCustom extends Component {
    constructor() {
        super();

        this.state = {
            /*valueObj: {
                name: 'Felhasználó'
            },*/
            listStatus: false
        }
    }
    handleSelectUser(user) {
        if(this.props.onChange != undefined && typeof this.props.onChange == 'function') {
            this.props.onChange({
                target: {
                    name: 'userName',
                    value: user
                }
            })
        }
        this.setState({ listStatus: false})
    }


    

    render() {
        console.log(this.props.list)
        const userName = this.props.value.name == undefined ? 'Felhasználó' : this.props.value.name
        return <div className='form-control'>
            <span onClick={() => { this.setState({listStatus: true})}}>{userName}</span>
            {this.state.listStatus == true && <ul className="list-group list-group-flush">
                    {this.props.list.map(user=>{
                        return <li className="list-group-item list-group-item-action list-group-item-primary" key={user._id} onClick={this.handleSelectUser.bind(this, user)}>{user.name}</li>
                    })}
                </ul>
            }
        </div>
    }
}
export default SelectCustom;
