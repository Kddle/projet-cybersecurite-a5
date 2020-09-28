import React from 'react';
import LoadingComponent from './LoadingComponent';
import axios from 'axios';
import _ from 'lodash';
import ErrorComponent from './ErrorComponent';
import {urls} from '../config';

class NewItemFormComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modalData: null,
            modalField: null,
            error: null
        }

        this.addItem = this.addItem.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onInputChanged = this.onInputChanged.bind(this);
        this.onItemAdded = this.onItemAdded.bind(this);
    }

    componentDidMount() {
        if (!_.isNil(this.props.route)) {
            axios.get('/api/Schema/' + this.props.route, { headers: { "Authorization": `Bearer ${sessionStorage.getItem('alphapar.token')}` } })
                .then(response => {
                    let obj = {};
                    if (response.data !== null) {
                        _.forEach(response.data, field => obj[field] = '');
                    }

                    this.setState({
                        modalField: response.data,
                        modalData: obj
                    })
                })
                .catch(error => {
                    console.error(error.response.status + " - " + error.response.statusText);
                    this.setState({
                        error: error
                    });
                })
        }
    }

    onInputChanged(event) {
        let obj = {};
        const propName = event.target.id.split('_')[1];
        obj[propName] = event.target.value;
        this.setState({
            modalData: Object.assign(this.state.modalData, obj)
        });
    }

    closeModal(event) {

        if(event)
            event.preventDefault();

        let copy = this.state.modalData;

        _.forEach(Object.keys(copy), key => {
            copy[key] = '';
        });

        this.setState({
            modalData: Object.assign(this.state.modalData, copy)
        });

        const el = document.getElementById('closeModalBtn');
        
        if(el)
            el.click();
    }

    onItemAdded(error, response) {
        this.closeModal();
    }

    addItem(event) {
        event.preventDefault();

        let isEmptyFields = false;
        _.forEach(Object.keys(this.state.modalData), key => {
            if (this.state.modalData[key] === null) {
                isEmptyFields = true;
                return;
            }
                
            if (this.state.modalData[key].length === 0) {
                isEmptyFields = true;
                return;
            }
        });
        console.log('fin')

        if(!isEmptyFields) {
            this.props.addItem(this.state.modalData);
            
        } else {
            this.setState({
                error: {
                    response: {
                        data: {
                            "Message": "Please fill in all fields."
                        }
                    }
                }
            });
        }
    }

    render() {
        const renderer = this.state.modalData === null ? <LoadingComponent /> : (
            <div>
                {
                    _.map(Object.keys(this.state.modalData), (key, keyId) => {
                        return (
                            <div className="form-group" key={keyId}>
                                <label htmlFor={"field_" + key}>{key} : </label>
                                <input type="text" id={"field_" + key} value={this.state.modalData[key]} onChange={this.onInputChanged} />
                            </div>
                        )
                    })
                }
            </div>
        );

        return (
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="listComponentModalLabel">{`Add ${this.props.route}`}</h5>
                    <button id="closeModalBtn" type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.closeModal}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    {renderer}
                </div>
                <div className="modal-footer">
                    { this.state.error !== null ? <ErrorComponent data={this.state.error} /> : null}
                    <button type="button" className="btn btn-success" onClick={this.addItem}>Add</button>
                    <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={this.closeModal}>Close</button>
                </div>
            </div>
        )
    }
}

export default NewItemFormComponent;