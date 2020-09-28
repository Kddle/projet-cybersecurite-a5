import React from 'react';
import ContentComponentType from '../ContentComponentType';
import DetailComponent from './DetailComponent';
import ListComponent from './ListComponent';

class HomeContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            displayComponent: null
        }

        this.setRoute = this.setRoute.bind(this);
    }

    setRoute(apiUrl, componentType, itemId) {
        this.setState({
            displayComponent: null
        });

        setTimeout(() => {
            switch (componentType) {
                case ContentComponentType.List:
                    this.setState({
                        displayComponent: <ListComponent route={apiUrl} setRoute={this.setRoute} />
                    });
                    break;
                case ContentComponentType.Detail:
                    this.setState({
                        displayComponent: <DetailComponent route={apiUrl} setRoute={this.setRoute} itemId={itemId} />
                    });
                    break;
                default:
                    this.setState({
                        displayComponent: <ListComponent route="Customers" setRoute={this.setRoute} />
                    });
                    break;
            }
        }, 10);

    }

    componentDidMount() {
        this.setRoute('Customers', ContentComponentType.List);
    }

    render() {
        return (
            <div id="home-container">
                <div id="wrapper" className="toggled">

                    <div id="sidebar-wrapper">
                        <ul className="sidebar-nav">
                            <li className="sidebar-brand">
                                <button onClick={() => this.setRoute('Customers', ContentComponentType.List)}>Alphapar Portal</button>
                            </li>
                            <li className="sidebar-route">
                                <button onClick={() => this.setRoute('Customers', ContentComponentType.List)}>Clients</button>
                            </li>
                            <li className="sidebar-route">
                                <button onClick={() => this.setRoute('Plans', ContentComponentType.List)}>Plans</button>
                            </li>
                            <li className="sidebar-route">
                                <button onClick={() => this.setRoute('Machines', ContentComponentType.List)}>Machines</button>
                            </li>
                        </ul>
                    </div>

                    <div id="page-content-wrapper">
                        <div className="container-fluid">
                            {this.state.displayComponent}
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default HomeContainer;