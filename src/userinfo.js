import React, { Component } from 'react';
import UserForm from './userform';
import UpdateUser from './updateuser';
import DeleteUser from './deleteuser.js'


class UserInfo extends Component {
    constructor(props){
        super(props);
        this.state ={
            userinfo : [
              
            ],
            isCreate : true,
        }
    }

    getUser = () => {
        fetch(`${process.env.REACT_APP_API_URL}/api/userinfo`) 
        .then(response => response.json())
        .then(data => this.setState( {userinfo : data, displayUserinfo : data, isCreate: true } ));
    }; 

    deleteUser = (id) => {
        fetch(`${process.env.REACT_APP_API_URL}/api/userinfo/${id}`, {
            method: 'DELETE'
        }) 
        .then(response => response.json())
        .then(console.log)
        .then(this.getUser);
    };

    updateUser = (userinfo) => {
        this.setState({
            updateUser: userinfo,
            isCreate: false,
        })
    };

    renderForm = () => {
        let result;
        if (this.state.isCreate) {
            result = (<UserForm key="createForm" refresh={this.getUser} />);
        } else {
            const data = this.state.updateUser; 
            result = <UpdateUser key={data._id} userinfo={data} refresh={this.getUser}/>;
        }
        return result; 
    }

    componentDidMount () { 
        this.getUser();
    }

    render () {
        const displayUserinfo = this.state.userinfo.map((userinfo) => {
            
            return <div> 
                        {userinfo.username}, 
                        {userinfo.email}, 
                        {userinfo.password}, 
                        {userinfo.isActive ? 'Online': 'Not Online'}   
                    <br></br>
                    
                        < DeleteUser userinfo={userinfo} 
                        deleteUser={this.deleteUser}
                        updateUser={this.updateUser}
                        />
                        
                </div>    
        })
        console.log(this.state.userinfo);
        return (
            <> 
            User Info- NEEDS TO BE ENCRYPTED NEXT
            {this.renderForm()}
            {displayUserinfo}
            </>
        )
    }
}

export default UserInfo; 