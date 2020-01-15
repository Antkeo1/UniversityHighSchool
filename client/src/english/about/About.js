import React, {Component} from 'react'
import { Carousel } from 'react-bootstrap';
import {list} from './apiAbout'
import {Link, Redirect } from 'react-router-dom'
import {signout, isAuthenticated} from '../../auth'
import { Navbar, Nav, NavDropdown, Dropdown, DropdownButton} from 'react-bootstrap';
import {Animated} from 'react-animated-css'

class About extends Component {
    state = {
        user: '',
        about: [],
        redirectToHome: false,
        redirectToSignIn: false,
        spanishPage: false,
        englishPage: false,
        khmerPage: false
    }

    renderUser = () => {
        this.setState({user: isAuthenticated().user })
    }

    componentDidMount() {
        list().then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                this.setState({carousel: data.find(d => {
                    if (d._id == "5e1f9ded7142ac69941ccd8d") {
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

    translateSpanish = () => {
        this.setState({spanishPage: true, englishPage: false, khmerPage: false})
    }

    translateEnglish = () => {
        this.setState({englishPage: true, spanishPage: false, khmerPage: false})
    }
 
    translateKhmer = () => {
        this.setState({khmerPage: true, spanishPage: false, englishPage: false,})
    }

    renderTopHeader = () => {
        return (
            <div style={{border: 'solid black 2px'}}>
                <Navbar id='topHeader' collapseOnSelect expand="lg" variant="dark" >
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto " >
                    <DropdownButton id="dropdown-basic-button" title="translator"  >
                                <Dropdown.Item ><a onClick={this.translateSpanish}>Spanish</a>
                                </Dropdown.Item>
                                <Dropdown.Item ><a onClick={this.translateKhmer}>Cambodian</a>
                                </Dropdown.Item>
                                <Dropdown.Item><a>Hmong</a></Dropdown.Item>

                                <Dropdown.Item><a onClick={this.translateEnglish}>English</a></Dropdown.Item>

                                <Dropdown.Item><a>Portuguese</a></Dropdown.Item>
                            
                            </DropdownButton>
                        
                        {
                            !this.state.user && (
                               <nav className='row'>
                                <Nav.Link >
                                    <Link className='ml-3' to='/signin' style={{color: 'white'}}>
                                        Sign In 
                                    </Link>
                                </Nav.Link>
                                <Nav.Link>
                                    <Link style={{color: 'white'}} to='/signup' >
                                        Sign Up
                                    </Link>
                                </Nav.Link>
                               </nav>
                            )
                        }
                        
                        {
                            this.state.user && (
                                <Nav.Link>
                                    <a style={{color: 'white'}}  onClick={() => signout(() => {
                                        this.props.history.push('/')
                                    })}>
                                        Sign Out
                                    </a>
                                </Nav.Link>
                            )
                        }
                      
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            </div>
        )
    }

    renderMenu = () => {
        return (
            <div style={{border: 'solid black 2px'}}>
                 <Navbar id='menu' collapseOnSelect expand="lg" variant="dark"  >
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    
                    <Nav className="mr-auto " className="col d-flex justify-content-around align-items-baseline">
                         <div id='link'>                        
                            <Nav.Link><Link style={{color: 'white'}} to='/'>Home</Link></Nav.Link>
                        </div>
                        <div id='link'>                        
                            <Nav.Link><Link style={{color: 'white'}} to='/about'>About Us</Link></Nav.Link>
                        </div>

                       <div id='link'>                
                           <Nav.Link><Link style={{color: 'white'}} to='/faculty'>Faculty</Link></Nav.Link>
                        </div>
                        <Nav.Link><Link style={{color: 'white'}} to='/student'>Students</Link></Nav.Link>
                        
                        
                        <div id='link'>                        
                            <Nav.Link><Link style={{color: 'white'}} to='/admission'>Admission</Link></Nav.Link>
                        </div>

                        <div id='link'>                        
                            <Nav.Link><Link style={{color: 'white'}} to='/schoolBoardMeeting'>School Board</Link></Nav.Link>
                        </div>

                        <div id='link'>                        
                            <Nav.Link><Link style={{color: 'white'}} to='/partners'>Our Partners</Link></Nav.Link>
                        </div>

                        <div id='link'>                        
                            <Nav.Link><Link style={{color: 'white'}} to='/images'>Gallery</Link></Nav.Link>
                        </div>

                        <div id='link'>                        
                            <Nav.Link><Link style={{color: 'white'}} to='/events'>Upcoming Events</Link></Nav.Link>
                        </div>
                    
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            </div>
        )
    }

    renderAbout = (about) => {
       const photoUrl = about.postedBy
        ? `${process.env.REACT_APP_API_URL}/user/photo/${
            about._id
          }?${new Date().getTime()}`
        : ''

        return (
            <div >
               <p>
                   {about.body}
               </p>    
            </div>    
              
        );
    }

    render() {
        const {about, spanishPage, englishPage, khmerPage, redirectToSignIn } = this.state
        if(spanishPage) {
            return <Redirect to={`/spanish`} />
         } else if (englishPage) {
             return <Redirect to={'/'} />
         } else if (khmerPage) {
            return <Redirect to={'/khmer'} />
        }
         else if(redirectToSignIn) {
            return <Redirect to={`/signin`} />
         } 

        return (
            <div>
                {this.renderTopHeader()}
                <div className="text-center">
                        <img 
                            style={{height: '150px', width: '600px', backgroundColor: 'blue'}}
                            src={require("../../images/logo.png")}
                        />
                    </div>
                {this.renderMenu()}
                
                <div>
                    <div className='text-center'>
                        {!about ? ( 
                                <div className='jumbotron text-center '>
                                    <h2>Loading....</h2>
                                </div>
                                ) : (
                                    this.renderAbout(about)
                                    
                                )
                            } 

                        <div className='text-center' >
                            {
                                isAuthenticated() && isAuthenticated().user.role === 'admin' && (
                                    <Link to={`/edit/about/${about._id}`} className='text-center btn btn-primary mt-4 mb-4'>Update</Link>
                                )
                            }
                        </div>
                    </div>               
                </div>
                                
                <footer className='mt-5'>
                    <div class="container row ml-5">
                        <img className='col-md-6 mb-4' style={{height: '150px', marginTop: '10px'}} src={require("../../images/banner.png")} /> 
                        <div className="col-md-6 d-flex justify-content-around align-items-baseline">
                            <div >
                                <p>1 Empire Plaza | Providence, RI 02903</p>
                                <p>Phone: (401) 254- 4829 | Sprak-martins@uhschool.org</p>
                                <h5 className="text-capitalize">
                                &copy; {new Date().getFullYear()} copyright : <a href="/">www.uhSchool.org </a>
                                </h5> 
                                </div>
                        </div>
                        </div>
                </footer> 
            </div>
        )
    }
}

export default About