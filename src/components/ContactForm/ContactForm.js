import React, {Component} from 'react'

const initialState = {
    contactName: '',
    contactSurname: '',
    contactNumber: '',
    errors: {}
}

class ContactForm extends Component{

    state = initialState

    handleSubmit = event => {
        event.preventDefault()
        if (this.state.contactName === ''){
            this.setState(
                (prevState) => ({
                    errors: {
                        ...prevState.errors,
                        contactName: new Error('Wpisz imię')
                    }
                })
            )
        }

        if (this.state.contactSurname === ''){
            this.setState(
                (prevState) => ({
                    errors: {
                        ...prevState.errors,
                        contactSurname: new Error('Wpisz nazwisko')
                    }
                })
            )
        }

        if (this.state.contactNumber === ''){
            this.setState(
                (prevState) => ({
                    errors: {
                        ...prevState.errors,
                        contactNumber: new Error('Wpisz nr telefonu')
                    }
                })
            )
        }

        if(
            this.state.errors.contactName === '' ||
            this.state.errors.contactSurname === '' ||
            this.state.contactNumber === ''
        ){
            return;
        }
        
        this.props.addContactFunction(
            this.state.contactName,
            this.state.contactSurname,
            this.state.contactNumber
            );
        this.setState(initialState)
      }

      handleNameChange = event => {
          this.setState({
              contactName: event.target.value})
      }

      handleSurnameChange = event => {
        this.setState({
            contactSurname: event.target.value})
    }

    handleNumberChange = event => {
        this.setState({
            contactNumber: event.target.value})
    }

      
    render(){
        return(
            <form onSubmit={this.handleSubmit}>
            {
              this.state.error && <p>{this.state.error.message}</p>
            }Nazwisko:  
            <input placeholder={this.state.errors.contactSurname && this.state.errors.contactSurname.message} value={this.state.contactSurname} onChange={this.handleSurnameChange} />
           
            Imię: 
            <input placeholder={this.state.errors.contactName && this.state.errors.contactName.message} value={this.state.contactName} onChange={this.handleNameChange} />
            
            Nr telefonu: 
            <input placeholder={this.state.errors.contactNumber && this.state.errors.contactNumber.message} value={this.state.contactNumber} onChange={this.handleNumberChange} />
            
    
            <button className="btnAdd">Dodaj kontakt</button>
          </form>
        )
    }
}

export default ContactForm
