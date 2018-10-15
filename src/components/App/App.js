import React, { Component } from 'react';
import ContactForm from '../ContactForm/ContactForm';
import './App.css'


class App extends Component {

  state = {
    contacts: JSON.parse(localStorage.getItem('contacts') || '[]'),
    previousState: null

  }

  toggleContactFavourite = contactId => {
    this.setState({
      contacts: this.state.contacts.map(
        contact => contactId !== contact.id ? contact : {
          ...contact,
          favourite: !contact.favourite

        }
      )
    })
  }

  removeContact = contactId => {
    this.setState({
      contacts: this.state.contacts.filter(
        contact => contactId !== contact.id

      )
    })
  }

  addContact = (name, surname, number) => {
    this.setState({
      previousState: this.state,
      contacts: this.state.contacts.concat({
        id: Date.now(),
        name: name,
        surname: surname,
        phoneNumber: number,
        favourite: false
      })
    })
  }

  componentDidUpdate() {
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
  }

  render() {

    return (
      <div>
        <h1>Baza kontaktów</h1>
        <ContactForm addContactFunction={this.addContact} />
        <ul>
          {
            this.state.contacts.map(contact => (
              <li key={contact.id}>
                <p>
                  {contact.favourite ?
                    <span onClick={() => this.toggleContactFavourite(contact.id)}>&#9733;  </span> :
                    <span onClick={() => this.toggleContactFavourite(contact.id)}>&#9734;  </span>}
                  {contact.name} {contact.surname} {contact.phoneNumber}
                  <button className="btnRemove" onClick={() => this.removeContact(contact.id)}>Usuń</button>
                </p>
              </li>
            ))

          }
        </ul>
      </div >
    )
  }
}
export default App
