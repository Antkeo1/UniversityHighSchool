import React from 'react'
import { Navbar, Nav, NavDropdown, Dropdown, DropdownButton} from 'react-bootstrap';
import {signout, isAuthenticated} from '../../auth'
import {Link, Redirect } from 'react-router-dom'
import styled from "styled-components";


class Header extends React.Component {
    state = {
        user: '',
        show: true,
        scrollPos: 0,
        redirectToSignIn: false,
        spanishPage: false,
        englishPage: false,
        khmerPage: false
    }

    renderUser = () => {
        this.setState({user: isAuthenticated().user })

    }

    handleScroll = () => {
        const { scrollPos } = this.state;
        this.setState({
          scrollPos: document.body.getBoundingClientRect().top,
          show: document.body.getBoundingClientRect().top > scrollPos
        });
      }

    componentDidMount() {
        this.renderUser()
        window.addEventListener('scroll', this.handleScroll);

    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    componentWillReceiveProps(props) {
        this.renderUser()
    }

    translateSpanish = () => {
        this.setState({spanishPage: true, englishPage: false, portPage: false, khmerPage: false})
    }

    translatePort = () => {
        this.setState({portPage: true, englishPage: false, spanishPage: false, khmerPage: false})
    }

    translateEnglish = () => {
        this.setState({englishPage: true, spanishPage: false, portPage: false, khmerPage: false})
    }
 
    translateKhmer = () => {
        this.setState({khmerPage: true, spanishPage: false, portPage: false, englishPage: false,})
    }

    renderTopHeader = () => {
        return (
            <div  >
                <Navbar  id='topHeader' collapseOnSelect expand="lg" variant="dark" >
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto " className="col d-flex justify-content-around align-items-baseline">
                    <DropdownButton id="dropdown-basic-button" title="translator"  >
                                <Dropdown.Item ><a onClick={this.translateSpanish}>Spanish</a>
                                </Dropdown.Item>
                                <Dropdown.Item ><a onClick={this.translateKhmer}>Cambodian</a>
                                </Dropdown.Item>

                                <Dropdown.Item><a onClick={this.translateEnglish}>English</a></Dropdown.Item>

                                <Dropdown.Item><a onClick={this.translatePort}>Portuguese</a></Dropdown.Item>
                            
                    </DropdownButton>

                        
                           
                                <div id='link'>
                                    <Nav.Link><Link style={{color: 'white'}} to='/schoolBoardMeeting'>School Board</Link></Nav.Link>

                                </div>
                                <div id='link'>
                                    <Nav.Link><Link style={{color: 'white'}} to='/faculty'>Faculty</Link></Nav.Link>

                                </div>

                                {
                            !this.state.user && (
                                <Nav >

                                <Nav.Link >
                                    <Link to='/signin' style={{color: 'white'}}>
                                        Sign In 
                                    </Link>
                                </Nav.Link>
                                <Nav.Link>
                                    <Link style={{color: 'white'}} to='/signup' >
                                        Sign Up
                                    </Link>
                                </Nav.Link>
                               </Nav>
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
                        

                        {
                            isAuthenticated() && isAuthenticated().user.code === 8290 && (
                                <Nav>
                                <div id='link' >
                                        <Nav.Link>
                                            <Link style={{color: 'white'}} to='/application' >
                                            Submitted Applications
                                            </Link>
                                        </Nav.Link>
                                    </div>
                                    <div id='link' >
                                        <Nav.Link>
                                            <Link style={{color: 'white'}} to='/applicants' >
                                                Pre-registered Applicants
                                            </Link>
                                        </Nav.Link>
                                    </div>
                                </Nav>
                            )
                        }

                        {
                            isAuthenticated() && isAuthenticated().user.code === 2609 && (
                                <Nav className="mr-auto " className="col d-flex justify-content-around align-items-baseline">
                                <div id='link' >
                                        <Nav.Link>
                                            <Link style={{color: 'white'}} to='/application' >
                                            Submitted Applications
                                            </Link>
                                        </Nav.Link>
                                    </div>
                                    <div id='link' >
                                        <Nav.Link>
                                            <Link style={{color: 'white'}} to='/applicants' >
                                                Pre-registered Applicants
                                            </Link>
                                        </Nav.Link>
                                    </div>
                                </Nav>
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
            <Transition>
            <StyledNavbar className={this.state.show ? "active" : "hidden"}>
                <Navbar id='menu' collapseOnSelect expand="lg" variant="dark"  >
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    
                    <Nav className="mr-auto " className="col d-flex justify-content-around align-items-baseline">
                        <div id='link'>                        
                            <Nav.Link>
                                <Link style={{color: 'white', fontSize: '20px'}} to='/'>
                                    <img  style={{height: '100px'}} src={require("../../images/uhSchool.png")} />
                                </Link>
                            </Nav.Link>
                        </div>
                        <div id='link'>                        
                            <Nav.Link><Link style={{color: 'white', fontSize: '20px'}} to='/about'>About Us</Link></Nav.Link>
                        </div>
                        <div id='link'>                        
                            <Nav.Link><Link style={{color: 'white', fontSize: '20px'}} to='/academics'>Academics</Link></Nav.Link>
                        </div>

                       
                        {/* <Nav.Link><Link style={{color: 'white', fontSize: '20px'}} to='/student'>Students</Link></Nav.Link> */}
                        
                        
                        <div id='link'>                        
                            <Nav.Link><Link style={{color: 'white', fontSize: '20px'}} to='/admission'>Admission</Link></Nav.Link>
                        </div>

                        <div id='link'>                        
                            <Nav.Link><Link style={{color: 'white', fontSize: '20px'}} to='/new/student'>Contact us</Link></Nav.Link>
                        </div>                     

                        <div id='link'>                        
                            <Nav.Link><Link style={{color: 'white', fontSize: '20px'}} to='/images'>Gallery</Link></Nav.Link>
                        </div>

                        <div id='link'>                        
                            <Nav.Link><Link style={{color: 'white', fontSize: '20px'}} to='/events'>Upcoming Events</Link></Nav.Link>
                        </div>
                    
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            </StyledNavbar>
            </Transition>
        )
    }

  render() {
    const {spanishPage, englishPage, khmerPage, portPage, redirectToSignIn } = this.state
    if(spanishPage) {
        return <Redirect to={`/spanish`} />
     } else if (englishPage) {
         return <Redirect to={'/'} />
     } else if (khmerPage) {
        return <Redirect to={'/khmer'} />
    }  else if (portPage) {
        return <Redirect to={'/port'} />
    }
         else if(redirectToSignIn) {
            return <Redirect to={`/signin`} />
         } 

      return (
          <div>
            {this.renderTopHeader()}
            {this.renderMenu()}
          </div>
      )
  }
}

const StyledNavbar = styled.div`
  position: fixed;
  z-index: 1000;
  `;

  const Transition = styled.div`
  .active {
    z-index: 1000;
    visibility: visible;
    transition: all 200ms ease-in;
  }
  .hidden {
    visibility: hidden;
    transition: all 200ms ease-out;
    transform: translate(0, -100%);
  }
`;

export default Header