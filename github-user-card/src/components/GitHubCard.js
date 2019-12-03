import React from 'react';

const GitHubCard = (props) => {
    return (
        <div className="card">
            <img src={props.user.avatar_url} alt="profile" />
            <div className="cardInfo">
                <h4 className="name">{props.user.name}</h4>
                <h6 className="username">{props.user.login}</h6>
                <p>Followers: {props.user.followers}</p>
                <p>Following: {props.user.following}</p>
            </div>
        </div>
    )
}

export default GitHubCard