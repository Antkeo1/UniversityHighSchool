import React, {Component} from 'react'
import {list} from './apiAbout'
import {Link, withRouter } from 'react-router-dom'
import {isAuthenticated} from '../../auth'
import { Card } from 'react-bootstrap';
import Header from '../header/Header'
import SideBar from '../sideBar/SideBar'

class PortAbout extends Component {
    state = {
        user: '',
        about: [],
        redirectToHome: false,
        redirectToSignIn: false,
    }

    renderUser = () => {
        this.setState({user: isAuthenticated().user })
    }

    componentDidMount() {
        list().then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                this.setState({about: data.find(d => {
                    if (d._id == "5e3784b4186726bbe53b1222") {
                        return d
                    }
                }) 
              })
              
            }
        }) 
        this.renderUser()
    }

    componentWillReceiveProps() {
        this.renderUser()
    }

    renderAbout = (about) => {

        return (
            <div className='container mt-5' style={{textIndent: '50px'}}>
                <Card border='dark' style={{borderRadius: '15%'}}>
                    <Card.Body>
                        <Card.Title>About Us</Card.Title>
                        
                        <Card.Text>
                            {about.body}
                        </Card.Text>

                        <Card.Text>
                            {about.paragraph2}
                        </Card.Text>

                        <Card.Text>
                            {about.paragraph3}
                        </Card.Text>

                        <Card.Text>
                            {about.paragraph4}
                        </Card.Text>

                        <Card.Text>
                            {about.paragraph5}
                        </Card.Text>
                    
                    </Card.Body>
                </Card>
            </div>   
              
        );
    }

    render() {
        const {about} = this.state

        return (
            <div>
                <Header history={this.props.history} />
                
                <div className='row container'>
                    <SideBar />
                    <div className='col-md-8 text-center'>
                        {!about ? ( 
                                <div className='jumbotron text-center '>
                                    <h2>Carregando....</h2>
                                </div>
                                ) : (
                                    this.renderAbout(about)
                                    
                                )
                            } 

                        <div className='text-center' >
                            {
                                isAuthenticated() && isAuthenticated().user.code === 8290 && (
                                    <Link to={`/port/edit/about/${about._id}`} className='text-center btn btn-primary mt-4 mb-4'>Update in portuguese</Link>
                                )
                            }
                        </div>
                    </div>               
                </div>
            </div>
        )
    }
}

export default withRouter(PortAbout)