import React from 'react';
import axios from 'axios';
import ErrorComponent from './ErrorComponent';
import LoadingComponent from './LoadingComponent';
import _ from 'lodash';
import ContentComponentType from '../ContentComponentType';
import NewItemFormComponent from './NewItemFormComponent';
import { urls } from '../config';

class ListComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            listHeaders: [],
            listContent: [],
            error: null
        }

        this.deleteItem = this.deleteItem.bind(this);
        this.showItemDetails = this.showItemDetails.bind(this);
        this.getData = this.getData.bind(this);
        this.addItem = this.addItem.bind(this);
    }

    deleteItem(id) {
        console.log('Delete requested on item : ' + id);
        console.log('Current state :', this.state);
        console.log('Current props :', this.props);

        axios.delete('/api/' + this.props.route + '/' + id, { headers: { "Authorization": `Bearer ${sessionStorage.getItem('alphapar.token')}` } })
            .then(res => this.props.setRoute(this.props.route, ContentComponentType.List))
            .catch(error => this.setState({
                error: error
            }));
    }

    showItemDetails(id) {
        console.log('Details requested on item : ' + id);
        console.log('Current state :', this.state);
        console.log('Current props :', this.props);
        this.props.setRoute(this.props.route, ContentComponentType.Detail, id);
    }

    addItem(data, cb) {
        axios.post('/api/' + this.props.route, data, { headers: { "Authorization": `Bearer ${sessionStorage.getItem('alphapar.token')}`}})
        .then(response => {
            document.getElementById('closeModalBtn').click();
            this.props.setRoute(this.props.route, ContentComponentType.List);
            if(cb)
                cb(null, response);          
        })
        .catch(error => {
            console.log(error);
            this.setState({
                error: error
            });
            if(cb)
                cb(error, null)
        });
    }

    getData() {
        if (sessionStorage.getItem('alphapar.token') !== null) {
            axios.get('/api/' + this.props.route, { headers: { "Authorization": `Bearer ${sessionStorage.getItem('alphapar.token')}` } })
                .then(response => {
                    let headers = [];

                    if (response.data.length > 0) {
                        headers = _.filter(Object.keys(response.data[0]), item => item !== "ID");
                    }

                    this.setState({
                        listHeaders: headers,
                        listContent: response.data,
                        error: null
                    });
                })
                .catch(error => {
                    console.log(error);
                    this.setState({
                        error: error
                    });
                })
        }
    }

    componentDidMount() {
        this.getData();
    }

    render() {


        if (this.state.error !== null) return <ErrorComponent data={this.state.error} />;


        const renderer = (
            <div className="list-container">
                <h3 className="list-title">{this.props.route} :</h3>
                <br />
                <div>
                <button type="button" className="btn btn-success" data-toggle="modal" data-target="#listComponentModal">Add</button>
                </div>
                {
                    this.state.listContent.length === 0 ? <h3>No results.</h3> : (
                        <div className="container">
                            <div className="row align-items-center">
                                {_.map(this.state.listHeaders, header => <div className="col-md" key={header}><h4>{header}</h4></div>)}
                                <div className="col col-md"><h4>Actions</h4></div>
                            </div>
                            {
                                _.map(this.state.listContent, (item, rowId) => {
                                    console.log(item)
                                    return (
                                        <div className="row align-items-center" key={rowId}>
                                            {_.map(this.state.listHeaders, (header, colId) => <div className="col-md" key={rowId + "_" + colId}><p>{Array.isArray(item[header]) ? item[header].length : item[header]}</p></div>)}
                                            <div className="col-md col">
                                                <button onClick={() => this.deleteItem(item['ID'])}>Supprimer</button>
                                                <button onClick={() => this.showItemDetails(item['ID'])}>Details</button>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                }
                <div className="modal fade" id="listComponentModal" tabIndex="-1" role="dialog" aria-labelledby="listComponentModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                            <NewItemFormComponent route={this.props.route} addItem={this.addItem} />
                        
                    </div>
                </div>
            </div>
        );
        return renderer;
    }
}

export default ListComponent;