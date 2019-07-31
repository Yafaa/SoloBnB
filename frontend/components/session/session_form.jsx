import React from 'react';
import { merge } from 'lodash';
import { withRouter } from 'react-router-dom';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: '',
      lname: '',
      email: '',
      password: '',
      errors: {
        fname: '',
        lname: '',
        email: '',
        password: ''
      }
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateSubmit = this.validateSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDemo = this.handleDemo.bind(this);
  }

  // handleSubmit(e) {
  //   e.preventDefault();
  //   const user = merge({}, this.state);
  //   this.props.processForm(user).then(this.props.closeModal);
  // }

  validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  validateSubmit(e) {
    e.preventDefault();
    let errorObj = {
      fname: '',
      lname: '',
      email: '',
      password: ''
    }
    
    if (!this.validateEmail(this.state.email)) {
      errorObj["email"] = 'Email address must be valid'
    } 

    if (this.state.password.length < 6) {
      errorObj["password"] = 'Password must be at least six characters long'
    } 

    if (this.state.fname.length === 0 && this.props.formType === 'Sign Up') {
      errorObj["fname"] = 'First name must be filled out'
    }
    
    if (this.state.lname.length === 0 && this.props.formType === 'Sign Up') {
      errorObj["lname"] = 'Last name must be filled out'
    } 

    // if (Object.values(errorObj).length === 0) {
    //   this.handleSubmit()
    // }

    if (Object.values(errorObj).every(val => val.length === 0)) {
      this.handleSubmit();
    }

    this.setState({ errors: errorObj });
    errorObj = {
      fname: '',
      lname: '',
      email: '',
      password: ''
    } 

    // else {
    //   this.handleSubmit();
    //   return null;
    // }

    
  }

  handleSubmit() {
    const user = {
      fname: this.state.fname,
      lname: this.state.lname,
      email: this.state.email,
      password: this.state.password
    };
    this.props.processForm(user).then(this.props.closeModal);
  }

  handleChange(field) {
    return (e) => {
      this.setState({ [field]: e.target.value })
      // this.setState({user: {[field]: e.target.value}})
    }
  }

  handleDemo(e) {
    e.preventDefault();
    const demo_user = { email: 'demo_user@gmail.com', password: 'hunter12' }
    this.props.processForm(demo_user).then(() => {
      this.props.closeModal();
      this.props.history.push('/myAccount')
    })
  }

  renderErrors() {
    return (
      <ul className='error-box'>
        {this.props.errors.map((error, idx) => (
          <li className='backend-errors' key={`error-${idx}`}>
            {error}
          </li>
        ))}
      </ul>
    );
  }

  renderNameFields() {
    return this.props.formType === 'Sign Up' ? (
      <>
        <label>
          <input
            type="text"
            // className={`session-input ${inputError}`}
            className='session-input'
            value={this.state.fname}
            onChange={this.handleChange("fname")}
            placeholder="First Name"
          />
        </label>
        <p className="error-message">{this.state.errors.fname}</p>

        <label>
          <input
            type="text"
            // className={`session-input ${inputError}`}
            className='session-input'
            value={this.state.lname}
            onChange={this.handleChange("lname")}
            placeholder="Last Name"
          />
        </label>
        <p className="error-message">{this.state.errors.lname}</p>
      </>
    ) : null
  }

  renderDemoLogin() {
    return this.props.formType === 'Log In' ? (
      <input 
        className="demo-login"
        onClick={this.handleDemo}
        type="submit"
        value="Demo Login"
      />
    ) : null
  }


  render() {
    const { formType, otherForm } = this.props;
    // const inputError = this.state.errors.fname.length > 0 ? (
    //   'red-border'
    //   ) : (
    //     ''
    //   )

    return (
      <div>
        {/* <form className='modal-form' onSubmit={this.handleSubmit}> */}
        <form className='modal-form' onSubmit={this.validateSubmit}>
          <div className='close-button topleft' onClick={this.props.closeModal}>&times;</div>
          
          <h2 className='login-message'>Please {formType} or {otherForm}</h2>

          <div className='session-errors'>
            {this.renderErrors()}
          </div>

            {this.renderNameFields()}

            {/* <label>
              <input 
                type="text" 
                className='session-input'
                value={this.state.fname}
                onChange={this.handleChange("fname")}
                placeholder="First Name"
              />
            </label>

            <label>
              <input
                type="text"
                className='session-input'
                value={this.state.lname}
                onChange={this.handleChange("lname")}
                placeholder="Last Name"
              />
            </label> */}

            <label>
              <input 
                type="text"
                className='session-input'
                // className={`session-input ${inputError}`}
                value={this.state.email}
                onChange={this.handleChange("email")}
                placeholder="Email Address"
              />
            </label>
            <p className="error-message">{this.state.errors.email}</p>

            <label>
              <input
                type="password" 
                className='session-input'
                // className={`session-input ${inputError}`}
                value={this.state.password}
                onChange={this.handleChange("password")}
                placeholder="Password"
              />
            </label>
            <p className="error-message">{this.state.errors.password}</p>

            <input className='session-submit' type="submit" value={formType}/>
            {this.renderDemoLogin()}
          
        </form>
      </div>
    )
  }
}

export default withRouter(SessionForm);
