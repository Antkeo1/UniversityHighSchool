import React, {Component} from 'react'
import {Link, withRouter } from 'react-router-dom'
import {isAuthenticated} from '../../auth'

const isActive = (history, path) => {
  if (history.location.pathname === path) return {
    color: '#ff9900'
  } 
}

class SideBar extends Component {
    state = {
        user: ''
    }

    renderUser = () => {
        this.setState({user: isAuthenticated().user })
    }

    componentDidMount() {
        this.renderUser()
    }

    componentWillReceiveProps() {
        this.renderUser()
    }


    render() {
        const {history} = this.props

        return (
                <div className='col-md-4 column text-center mt-5'>
                    <div>
                        <Link style={isActive(history, '/spanish/partners')} to='/spanish/partners'>
                            Nuestros compañeros
                        </Link>
                    </div>

                    <div>
                        <Link style={isActive(history, '/spanish/about')} className='mt-4' to='/spanish/about'>
                            Sobre nosotras
                        </Link>
                    </div>

                    <div>
                        <Link style={isActive(history, '/spanish/hr')} className='mt-4' to='/spanish/hr'>
                            Recursos humanos                        
                        </Link>
                    </div>
                </div>
        )
    }
}

export default withRouter(SideBar)
