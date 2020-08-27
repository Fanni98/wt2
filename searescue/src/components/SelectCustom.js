import React, { Component } from 'react'

class SelectCustom extends Component {
    constructor() {
        super();

        this.state = {
            valueObj: {
                name: 'Felhasználó'
            },
            listStatus: false
        }
    }
    handleSelectUser(user) {
        if(this.props.onChange != undefined && typeof this.props.onChange == 'function') {
            this.props.onChange({
                target: {
                    name: 'selectedUser',
                    value: user
                }
            })
        }
        this.setState({ listStatus: false})
    }


    

    render() {
        console.log(this.props.value)
        const userName = this.props.value.name == undefined ? 'Felhasználó' : this.props.value.name
        return <div className='form-control'>
            <span onClick={() => { this.setState({listStatus: true})}}><i aria-hidden="true" className="icon">🔻 </i> {userName}</span>
            {this.state.listStatus == true && <ul className="list-group list-group-flush">
                    {this.props.list.map(user=>{
                        return <li className="list-group-item list-group-item-action " key={user._id} onClick={this.handleSelectUser.bind(this, user)}>{user.name}</li>
                    })}
                </ul>
            }
        </div>
    }
}
export default SelectCustom;
