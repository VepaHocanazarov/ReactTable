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

  const [editFormData, setEditFormData] = useState({
    fullName: "",
    address: "",
    phoneNumber: "",
    email: ""
  });

  const [editContactId, setEditContactId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");

    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  }

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

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editContact = {
      id: editContactId,
      fullName: editFormData.fullName,
      address: editFormData.address,
      phoneNumber: editFormData.phoneNumber,
      email: editFormData.email

    }

    const newContacts = [...contact];

    const index = contact.findIndex((contact) => contact.id === editContactId)

    newContacts[index] = editContact;

    setContact(newContacts);

    setEditContactId(null);
  }

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);

    const formValue = {
      fullName: contact.fullName,
      address: contact.address,
      phoneNumber: contact.phoneNumber,
      email: contact.email,
    }

    setEditFormData(formValue);
  };

  const handleCancelClick = ()=>{
    setEditContactId(null);
  };

  const handleDeleteClick = (contactId)=>{
   const newContacts = [...contact];

   const index = contact.findIndex((contact)=> contact.id === contactId);
    
   newContacts.splice(index,1);

   setContact(newContacts)
  }

  return (
    <div className="app-container">
      <form onSubmit={handleEditFormSubmit} >
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {contact.map((contact) => (

              <>

                {editContactId === contact.id ? (<EditableRow
                  editFormData={editFormData}
                  handleEditFormChange={handleEditFormChange}
                  handleCancelClick = {handleCancelClick} />)

                  : (<ReadOnlyRow contact={contact}
                     handleEditClick={handleEditClick} 
                     handleDeleteClick = {handleDeleteClick} />)
                }

              </>

            ))}

          </tbody>
        </table>
      </form>


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
