import React from 'react';

const DeleteUser = ({userinfo, deleteUser, updateUser}) => {
    return(
        <>
        <button onClick={() => deleteUser(userinfo._id)}>Delete User</button>
        <button onClick={() => updateUser(userinfo)}>Edit User</button>
        </>
    )
}

export default DeleteUser;