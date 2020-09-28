import React from 'react';
import LoadingComponent from './LoadingComponent';
import axios from 'axios';
import ErrorComponent from './ErrorComponent';
import ContentComponentType from '../ContentComponentType';
import _ from 'lodash';
import AddFormComponent from './AddFormComponent';
import { urls } from '../config';

class DetailComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
            error: null,
            modalContent: null,
            modalType: ''
        }

        this.onInputChanged = this.onInputChanged.bind(this);
        this.rqAddItemArray = this.rqAddItemArray.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.showItemDetails = this.showItemDetails.bind(this);
        this.save = this.save.bind(this);
        this.cancel = this.cancel.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.addItemArray = this.addItemArray.bind(this);
    }

    onInputChanged(event) {
        let obj = {};
        const propName = event.target.id.split('_')[1];
        obj[propName] = event.target.value;
        console.log(obj);
        this.setState({
            data: Object.assign(this.state.data, obj)
        });
    }

    componentDidMount() {
        axios.get('/api/' + this.props.route + '/' + this.props.itemId, { headers: { "Authorization": `Bearer ${sessionStorage.getItem('alphapar.token')}` } })
            .then(response => {
                this.setState({ data: response.data })
            })
            .catch(error => {
                this.setState({
                    error: error
                })
            });
    }

    deleteItem(itemId, propertyKey) {
        const newArr = _.filter(this.state.data[propertyKey], item => item['ID'] !== itemId);
        const tmpData = {};
        tmpData[propertyKey] = newArr;

        const newData = Object.assign(tmpData, this.state.data);
        console.log(newData);
        this.setState({
            data: newData
        });
    }

    showItemDetails(itemId, fromRoute) {

        const toRoute = fromRoute === 'Customers' ? 'Plans' : 'Machines';
        this.props.setRoute(toRoute, ContentComponentType.Detail, itemId);
    }

    rqAddItemArray(callingProperty) {
        // get all plans / machines and display on modal

        const modalType = callingProperty === "Composition" ? 'Machines' : callingProperty;

        console.log('Modal type : ' + modalType);
        axios.get('/api/' + modalType, { headers: { "Authorization": `Bearer ${sessionStorage.getItem('alphapar.token')}` } })
            .then(response => {
                console.log(response);
                console.log(this.state.data[callingProperty]);

                const data = _.differenceBy(response.data, this.state.data[callingProperty], 'ID');
                console.log(data)

                this.setState({
                    modalType: modalType,
                    modalContent: data,
                    modalCallingProperty: callingProperty
                });
            })
            .catch(error => this.setState({
                error: error
            }));
    }

    addItemArray(item) {
        let tmp = this.state.data[this.state.modalCallingProperty];

        if(tmp === null) {
            tmp = []
        }

        if (Array.isArray(tmp)) {
            tmp.push(item);
            let obj = {};
            obj[this.state.modalCallingProperty] = tmp;

            this.setState({
                data: Object.assign(this.state.data, obj)
            });
            this.closeModal();
        }
        else {
            console.log('weird behaviour')
        }

    }

    closeModal() {
        this.setState({
            modalContent: null,
            modalType: '',
            modalCallingProperty: ''
        });
        document.getElementById('closeModalBtn').click();
    }

    save(event) {
        event.preventDefault();
        axios.put('/api/' + this.props.route, this.state.data, { headers: { "Authorization": `Bearer ${sessionStorage.getItem('alphapar.token')}` } })
            .then(response => {
                this.props.setRoute(this.props.route, ContentComponentType.List);
            })
            .catch(error => {
                this.setState({
                    error: error
                });
            });
    }

    cancel(event) {
        event.preventDefault();
        this.props.setRoute(this.props.route, ContentComponentType.List);
    }

    render() {
        const objKeys = this.state.data !== null ? Object.keys(this.state.data).sort() : [];

        const renderer = this.state.data === null ? <LoadingComponent /> : (
            <div className="details-container">
                {
                    _.map(objKeys, (key, i) => {

                        //  Properties to avoid
                        if (key === "ID" || key === "LastUpdated") return null;

                        // if property intended to be an array
                        if (this.state.data[key] === null) {
                            if (key === 'Plans' || key === 'Composition') {
                                return (
                                    <div className="form-group" key={i}>
                                        <label htmlFor={`property_${key}`}>{key}</label>
                                        <button type="button" className="btn btn-success" data-toggle="modal" data-target="#detailComponentModal" onClick={() => this.rqAddItemArray(key)}>Add</button>
                                    </div>
                                )
                            }
                        }

                        // If array then display list of objects
                        if (Array.isArray(this.state.data[key])) {
                            const arrData = this.state.data[key];

                            return (
                                <div className="form-group" key={i}>
                                    <label htmlFor={`property_${key}_${i}`}>{key}</label>
                                    <button type="button" className="btn btn-success" data-toggle="modal" data-target="#detailComponentModal" onClick={() => this.rqAddItemArray(key)}>Add</button>
                                    {arrData.length > 0 ? (
                                        <div className="container" id={`property_${key}_${i}`}>
                                            {/* grid headers */}
                                            <div className="row">
                                                {
                                                    _.map(Object.keys(arrData[0]), header => header === 'ID' || header === 'LastUpdated' ? null : <div className="col-md" key={`arr_header_${header}`}><h4>{header}</h4></div>)
                                                }
                                                <div className="col-md"><h4>Actions</h4></div>
                                            </div>
                                            {
                                                // grid content
                                                _.map(arrData, (item, j) => {
                                                    return (
                                                        <div className="row" key={`${key}_row_${j}`}>
                                                            {
                                                                _.map(Object.keys(item), itemKey => {
                                                                    // properties to avoid
                                                                    if (itemKey === 'ID' || itemKey === "LastUpdated") return null;
                                                                    return (
                                                                        <div className="col-md" key={`arr_prop_${itemKey}`}><p>{Array.isArray(item[itemKey]) ? item[itemKey].length : item[itemKey]}</p></div>
                                                                    )
                                                                })
                                                            }
                                                            {/* row actions */}
                                                            <div className="col-md">
                                                                <button className="btn btn-danger" onClick={() => this.deleteItem(item['ID'], key)}>Delete</button>
                                                                <button className="btn btn-primary" onClick={() => this.showItemDetails(item['ID'], this.props.route)}>Details</button>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    ) : null
                                    }
                                </div>
                            )
                        }

                        // If common property
                        return (
                            <div className="form-group" key={i}>
                                <label htmlFor={`property_${key}`}>{key}</label>
                                <input type="text" value={this.state.data[key]} id={`property_${key}`} onChange={this.onInputChanged} />
                            </div>
                        )
                    })
                }
            </div>
        );

        if (this.state.error !== null) return <ErrorComponent data={this.state.error} />;

        return (
            <div className="details">
                <h3>{`${this.props.route} #${this.props.itemId}`}</h3>
                <br />
                <div className="details-container">
                    {renderer}
                </div>
                <div className="details-action">
                    <button className="btn btn-success" onClick={this.save}>Save</button>
                    <button className="btn btn-danger" onClick={this.cancel}>Cancel</button>
                </div>
                {/* Modal */}
                <div className="modal fade" id="detailComponentModal" tabIndex="-1" role="dialog" aria-labelledby="detailComponentModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="detailComponentModalLabel">{`Add ${this.state.modalType}`}</h5>
                                <button id="closeModalBtn" type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {/* Body */}
                                {this.state.modalContent !== null ? <AddFormComponent data={this.state.modalContent} addItem={this.addItemArray} /> : <LoadingComponent />}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={this.closeModal}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DetailComponent;