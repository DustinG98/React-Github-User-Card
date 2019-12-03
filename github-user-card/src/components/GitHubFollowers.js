import React from 'react';
import GitHubCard from './GitHubCard'

const GitHubFollowers = (props) => {
    return (
        props.followers.map(follower => {
            return <GitHubCard key={follower.id} user={follower} />
        })
    )
}

export default GitHubFollowers