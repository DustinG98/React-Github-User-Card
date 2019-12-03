import React from 'react';

const GitHubCard = (props) => {
    return (
        <div className="card">
            <img src={props.user.avatar_url} />
            <h4 className="username">{props.user.login}</h4>
        </div>
    )
}

export default GitHubCard