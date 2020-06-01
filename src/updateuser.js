import React from 'react';

class UpdateUser extends React.Component {
    state = {
        username: this.props.userinfo.username, 
        email: this.props.userinfo.email,
        password: this.props.userinfo.password,
        isActive: this.props.userinfo.isActive
    }

    handleChange = ( {target} ) => {
        const key = target.name;
        this.setState({ [key] : target.value }, () => console.log(this.state[key]));
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const isActive= this.state.isActive === "true";
        fetch(`${process.env.REACT_APP_API_URL}/api/userinfo/${this.props.userinfo._id}`, {
            method: 'PUT',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify(
                 {
                 username : this.state.username, 
                 email : this.state.email, 
                 password : this.state.password, 
                 isActive : isActive
                 }
            )
        })
        .then(this.props.refresh)
        .then(() => this.setState({
            username: "",
            email: "",
            password: 0,
            isActive: ""
        }));
    }
}

export default UpdateUser;