import './App.css';
import { useState } from "react";
import { nanoid } from "nanoid";
import data from "./data.json";
import ReadOnlyRow from './components/ReadOnlyRow';
import EditableRow from './components/EditableRow';

function App() {

  const [contact, setContact] = useState(data);
  const [addFormData, setAddFormData] = useState({
    fullName: "",
    address: "",
    phoneNumber: "",
    email: ""
  });

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newContact = {
      id: nanoid(),
      fullName: addFormData.fullName,
      address: addFormData.address,
      phoneNumber: addFormData.phoneNumber,
      email: addFormData.email,
    };

    const newContacts = [...contact, newContact];
    setContact(newContacts);
  };

  return (
    <div className="app-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Phone Number</th>
            <th>Email</th>
          </tr>
        </thead>

        <tbody>
          {contact.map((contact) => (

            <>
              <EditableRow />
              <ReadOnlyRow contact={contact} />
            </>

          ))}

        </tbody>
      </table>


      <h2> Add a Contact</h2>

      <form onSubmit={handleAddFormSubmit} >
        <input type="text"
          name='fullName'
          required="required"
          placeholder='Enter a name...'
          onChange={handleAddFormChange} />

        <input type="text"
          name='address'
          required="required"
          placeholder='Enter an address...'
          onChange={handleAddFormChange} />

        <input type="text"
          name='phoneNumber'
          required="required"
          placeholder='Enter a phoneNumber...'
          onChange={handleAddFormChange} />

        <input type="email"
          name='email'
          required="required"
          placeholder='Enter an email...'
          onChange={handleAddFormChange} />

        <button type='submit' >Add</button>
      </form>

    </div>
  );
}

export default App;
