import React from 'react';
import axios from 'axios';
import crypto from 'crypto';
import { urls } from '../config';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            username: '',
            password: '',
            formError: false,
            errorMsg: ''
        };

        this.handleConnexionClick = this.handleConnexionClick.bind(this);
        this.onUsernameChanged = this.onUsernameChanged.bind(this);
        this.onPasswordChanged = this.onPasswordChanged.bind(this);
    }

    handleConnexionClick(event) {
        event.preventDefault();

        if (this.state.username.length === 0 || this.state.password.length === 0) {
            this.setState({
                formError: true,
                errorMsg: "Veuillez entrer votre nom d'utilisateur et votre mot de passe.",
                isLoading: false
            });
            return;
        } else {
            if (this.state.formError) {
                this.setState({
                    formError: false,
                    errorMsg: '',
                    isLoading: true
                });
            } else {
                this.setState({
                    isLoading: true
                });
            }
        }

        // login
        axios.post('/api/Auth', { username: this.state.username, password: this.state.password })
            .then(res => {
                sessionStorage.setItem('alphapar.token', res.data);
                sessionStorage.setItem('alphapar.username', this.state.username);
                
                const pwd = crypto.createHmac('sha256', this.state.username)
                   .update(this.state.password)
                   .digest('hex');

                sessionStorage.setItem('alphapar.pwd', pwd);

                this.props.loginCb(res.data);
            })
            .catch(err => {
                this.setState({
                    formError: true,
                    errorMsg: `Error : ${err.response.status} - ${err.response.statusText}`,
                });
            })
            .then(() => {
                this.setState({
                    isLoading: false
                });
            })

    }

    onUsernameChanged(event) {
        event.preventDefault();

        this.setState({
            username: event.target.value
        });
    }

    onPasswordChanged(event) {
        event.preventDefault();

        this.setState({
            password: event.target.value
        });
    }

    render() {
        return (
            <section id="cover">
                <div id="cover-caption">
                    <div id="container" className="container">
                        <div className="row text-white">
                            <div className="col-sm-6 offset-sm-3 text-center">
                                <h1 className="display-4">Portail AlphaPar</h1>
                                <div className="info-form">
                                    <form action="" className="justify-content-center">
                                        <div className="form-group">
                                            <input type="text" className="form-control" value={this.state.username} onChange={this.onUsernameChanged} placeholder="Nom d'utilisateur..." />
                                        </div>
                                        <div className="form-group">
                                            <input type="password" className="form-control" placeholder="Mot de passe..." value={this.state.password} onChange={this.onPasswordChanged} />
                                        </div>
                                        <button className={`btn btn-success${this.state.isLoading ? ' disabled' : ''}`} onClick={this.handleConnexionClick}>Connexion</button>
                                    </form>
                                    {this.state.formError ? <h6 className="login-error">{this.state.errorMsg}</h6> : null}
                                    {this.state.isLoading ? <div className="lds-ring"><div></div><div></div><div></div><div></div></div> : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default LoginPage;