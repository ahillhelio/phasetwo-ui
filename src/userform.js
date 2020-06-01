import React from 'react';

class UserForm extends React.Component {
    state = {
        username: "",
        email: "",
        password: "",
        isActive: true
    }

    handleChange = ( {target} ) => {
        const key = target.name;
        this.setState({ [key] : target.value }, () => console.log(this.state[key]));
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const isActive= this.state.isActive === true;
        fetch(`${process.env.REACT_APP_API_URL}/api/userinfo`, {
            method: "POST",
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify([
                {
                 username : this.state.username, 
                 email : this.state.email, 
                 password : this.state.password, 
                 isActive : isActive
                }
            ])
        })
        .then(this.props.refresh)
        .then(() => this.setState({
            username: "",
            email: "",
            password: 0, 
            isActive: true
        })); //THEN
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}> 
                <input 
                    name="username" 
                    type="text"
                    value={this.state.username}
                    placeholder= "Username"
                    onChange={this.handleChange}/>
                <input 
                    name="email" 
                    type="text"
                    value={this.state.email}
                    placeholder= "E-mail Address"
                    onChange={this.handleChange}/>
                <input
                    name="password"
                    type= "text"
                    value={this.state.password}
                    placeholder= "Password"
                    onChange={this.handleChange}/>
                <select
                    name="isActive"
                    value={this.state.isActive}
                    onChange={this.handleChange}>
                    <option value={true}>Online</option>
                    <option value={false}>Not Online</option>
                    
                </select>

                <input type="submit" value="Create New User"/>
            </form>
        )
    }

}

export default UserForm;