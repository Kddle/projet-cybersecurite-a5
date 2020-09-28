import React from 'react';

class ErrorComponent extends React.Component {
    render() {
        return (
            <div>
                <h3>{this.props.data.response.data.Message}</h3>
            </div>
        )
    }
}

export default ErrorComponent;