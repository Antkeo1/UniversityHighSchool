import React, { Component } from "react";
import { list } from "./apiFaculty";
import { Link, Redirect } from "react-router-dom";
import {isAuthenticated} from '../../auth'
import { Card, Button } from 'react-bootstrap';
import Header from '../header/Header'

class Faculty extends Component {
    constructor() {
        super();
        this.state = {
            user: '',
            faculties: [],
            term: '',
            searched: false,
            searchedFaculty: '',
            error: '',
            searching: false,
        };
    }

    renderUser = () => {
        this.setState({user: isAuthenticated().user })
    }

    loadFaculties = page => {
        list(page).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ faculties: data });               
            }
        });
    };


    componentDidMount() {
        this.loadFaculties(this.state.faculties)
        this.renderUser()
    }


    componentWillReceiveProps() {
        this.renderUser()
    }

    handleChange = event => {
        this.setState({error: ''})
        this.setState({term: event.target.value})
    }

    search = (e) => {
        e.preventDefault()
        this.state.faculties.map(staff => {
            if (staff.name === this.state.term) {
                this.setState({searched: true, searchedFaculty: staff})
            } else {
                this.setState({searching: true, error: 'Staff member not found'})
            }
        })

    }

    renderFaculties = faculties => {

        return (
            <div  id='event' className='row container'>
                {faculties.map((faculty, i) => {
                        const facultyPhoto = faculty._id
                        ? `/portFaculty/photo/${
                            faculty._id
                          }?${new Date().getTime()}`
                        : ''
                        
                    return (

                        <div  className='col-md-4 mb-5' key={i}>
                            <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={facultyPhoto} />
                            <Card.Body>
                                <Card.Title>{faculty.name.substring(0, 100)}</Card.Title>
                                <Card.Text>
                                    {faculty.title.substring(0, 100)}
                                </Card.Text>
                                <Card.Text>
                                    {faculty.about.substring(0, 100)}
                                </Card.Text>
                                <Link
                                        to={`/port/faculty/${faculty._id}`}
                                        className="btn btn-raised btn-primary btn-sm mb-4 ml-5"
                                    >
                                        Consulte Mais informação
                                    </Link>
                            </Card.Body>
                            </Card>
                        </div>
                    );
                })}
            </div>
        );
    };

    render() {
        const { faculties, searched, searchedFaculty, error } = this.state;

        if (searched) { return <Redirect to={`port/faculty/${searchedFaculty._id}`}/> } 

        return (
            <div>
                <Header history={this.props.history} />
                <div className="container">
                    <div style={{borderBottom: 'solid black 1px'}} className='row mt-4 mb-3'>
                        <h2 className="col-md-6">
                            Nosso time
                            {!faculties.length ? "Carregando..." : ""}
                        </h2>
                        <br/>

                        <form className="col-md-6 text-center" onSubmit={this.search}>
                            <input placeholder='by faculty name' type='text' value={this.state.term} onChange={this.handleChange} />
                            <Button onClick={this.search}>Search</Button>
                            {"  "}{error}
                        </form>
                        <hr/>
                    </div>
                    {
                        isAuthenticated() && isAuthenticated().user.code === 8290 && (
                            <div>
                                <Link className='mb-5' to='/port/new/faculty'>Add Faculty in portuguese</Link>
                            </div>
                        )
                    }

{
                        isAuthenticated() && isAuthenticated().user.code === 2609 && (
                            <div>
                                <Link className='mb-5' to='/port/new/faculty'>Add Faculty in portuguese</Link>
                            </div>
                        )
                    }
                
                    <div>               
                        {this.renderFaculties(faculties)}
                    </div>   
                
                </div>
            </div>
        );
    }
}

export default Faculty;