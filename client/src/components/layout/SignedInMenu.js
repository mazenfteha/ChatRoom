import React from 'react'

export const SignedInMenu = ({ logout }) => {
    return (
        <li onClick={logout}><a href="#">Logout</a></li>
    )
}
