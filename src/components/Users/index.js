import React, { Component } from 'react';
import { globalState } from '../../common/globalState';
import './users.scss';

class Users extends Component {

    componentDidMount() {
        // console.log('user: ', globalState.data);
    }

    usersRender(){
        let table = []
        for (let item in globalState.getData()) {
            let a = globalState.data[item].name;
            table.push(
            <p key={item}>{a}</p>
            )
         }
         return table
    }

    render() {
        return (
            <div>
                <p>Users</p>
                {this.usersRender()}
            </div>
        )
    }
}

export default Users
