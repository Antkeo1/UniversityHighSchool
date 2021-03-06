import React, {Component} from 'react'
import {singleapplication, remove} from './apiApplication'
import {Link, Redirect} from 'react-router-dom'
import {isAuthenticated} from '../../auth'


class SingleApplication extends Component {
    state = {
        application: '',
        redirectToApplications: false,
        redirectToSignIn: false,
    }

    componentDidMount = () => {
        const applicationId = this.props.match.params.applicationId
        singleapplication(applicationId).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                this.setState({application: data})
            }
        }) 
    }

    deleteapplication = () => {
        const applicationId = this.props.match.params.applicationId
        const token = isAuthenticated().token
        remove(applicationId, token).then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                this.setState({redirectToApplications: true})
            }
        })
    }

    deleteConfirm = () => {
        let answer = window.confirm('Are you sure you want to delete this application?')
        if(answer) {
            this.deleteapplication()
        }
    }

    renderapplication = (application) => {
        const posterId = application.postedBy
        ? `/user/${application.postedBy._id}`
        : "";
        
        const posterName = application.postedBy
        ? application.postedBy.name
        : " Unknown";

        const photoUrl = application._id
        ? `/application/photo/${
            application._id
          }?${new Date().getTime()}`
        : '';

        return (
                <div  className='text-center'>
                    <div className='mt-5'>
                         <iframe src={photoUrl} style={{height: '100vh', width: '100%'}} ></iframe>
                    </div>

                    <div className='row'>
                        <Link
                            to={`/application`}
                            className="btn btn-raised btn-primary btn-sm "
                            style={{marginLeft: '30px'}}
                        >
                            Back to applications
                        </Link>

                        {isAuthenticated().user && isAuthenticated().user.code === 8290 && (
                            <div >
                                    <button
                                        onClick={this.deleteConfirm}
                                        className='btn btn-raised btn-danger ml-3'
                                    >
                                        Delete 
                                    </button>
                            </div>
                        )}
                    </div>
                </div>
        );
    }

    render() {
        const {application, redirectToApplications, redirectToSignIn} = this.state
        
        if(redirectToApplications) {
            return <Redirect to={`/application`} />
         } else if(redirectToSignIn) {
            return <Redirect to={`/signin`} />
         }

        return (
            <div>
                           <div className='container mt-5'>
                               <div style={{borderBottom: 'solid black 1px'}}>
                                    <h3 style={{color: 'black'}}>{application.name}</h3>
                                </div>
                               
                                {!application ? ( 
                                        <div className='jumbotron text-center '>
                                            <h2>Loading....</h2>
                                        </div>
                                        ) : (
                                            this.renderapplication(application)
                                        )
                                    }
                               
                            </div>
            </div>
        )
    }
}

export default SingleApplication