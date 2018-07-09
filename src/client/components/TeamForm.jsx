
import React from 'react';

export default class extends React.Component {
    render() {
        return (
            <form action='/team' method='post'>
                <input
                    type='text'
                    defaultValue={
                        this.props.teamData
                        ? this.props.teamData.name
                        : ''
                    }
                    name='name' />
            </form>
        )
    }
};
