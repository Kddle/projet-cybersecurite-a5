import React from 'react';
import _ from 'lodash';

class AddFormComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>{_.map(this.props.data, (item, i) => {
                return <button onClick={() => this.props.addItem(item)} key={i}>{item["Name"]}</button>
            })}</div>
        )
    }
}

export default AddFormComponent;