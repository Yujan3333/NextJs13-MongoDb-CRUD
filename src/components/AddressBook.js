
"`use client`"
import "../app/page.module.css";
import { useState, useEffect } from 'react';

const AddressBook = () => {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [selectedContactId, setSelectedContactId] = useState(null);
  const [emailError, setEmailError] = useState(false);

  const fetchContacts = async () => {
    const res = await fetch('/api/get');
    const data = await res.json();
    setContacts(data);
    // console.log("Received Data during the get request", data);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleAddContact = async () => {


    // CHECK EMAIL VALIDATION
    if (!emailIsValid(email)) {
      setEmailError(true);
      return;
    }
    setEmailError(false);


    //Check if to update or to add
    if (selectedContactId) {
      // Perform update if a contact is selected
      const id = selectedContactId;
      console.log("Updated Id is :", id)
      // I changed selectedContactId to id
      const res = await fetch(`/api/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, phone, email, address }),
      });

      if (res.status === 200) {
        setSelectedContactId(null);
      }
    } else {
      // Perform add if no contact is selected
      const res = await fetch('/api/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, phone, email, address }),
      });

      if (res.status === 201) {
        setName('');
        setPhone('');
        setEmail('');
        setAddress('');
      }
    }

    fetchContacts();
  };

  const handleDeleteContact = async (contact) => {
    console.log("handleDeleteContact ID is:", contact._id);
    const id = contact._id;

    const res = await fetch(`/api/del/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.status === 200) {
      fetchContacts();
    }
  };

  const handleUpdateContact = (id) => {
    const selectedContact = contacts.find((contact) => contact._id === id);
    console.log("handleUpdateContact ID is:", selectedContact._id);
    setSelectedContactId(selectedContact._id);
    setName(selectedContact.name);
    setPhone(selectedContact.phone);
    setEmail(selectedContact.email);
    setAddress(selectedContact.address);
    // console.log("handleUpdateContact detail is:", selectedContact.name, selectedContact.phone, selectedContact.email, selectedContact.address);
  };

  // For email validation
  const emailIsValid = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };


  //   return (
  //     <div>
  //       <h1>Address Book</h1>
  //       <div>
  //         <input
  //           type="text"
  //           placeholder="Name"
  //           value={name}
  //           onChange={(e) => setName(e.target.value)}
  //         />
  //         <input
  //           type="text"
  //           placeholder="Phone"
  //           value={phone}
  //           onChange={(e) => setPhone(e.target.value)}
  //         />
  //         <input
  //           type="text"
  //           placeholder="Email"
  //           value={email}
  //           onChange={(e) => setEmail(e.target.value)}
  //         />
  //         <input
  //           type="text"
  //           placeholder="Address"
  //           value={address}
  //           onChange={(e) => setAddress(e.target.value)}
  //         />
  //         <button onClick={handleAddContact}>
  //           {selectedContactId ? 'Update Contact' : 'Add Contact'}
  //         </button>
  //       </div>
  //       <div>
  //         {contacts.map((contact) => (
  //           <div key={contact._id}>
  //             <p>Name: {contact.name}</p>
  //             <p>Phone: {contact.phone}</p>
  //             <p>Email: {contact.email}</p>
  //             <p>Address: {contact.address}</p>
  //             <button onClick={() => handleUpdateContact(contact._id)}>
  //               Update
  //             </button>
  //             <button onClick={() => handleDeleteContact(contact)}>
  //               Delete
  //             </button>

  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   );
  // };

  // export default AddressBook;


  return (
    <div className="container mt-5">
      <h1 className="mb-4">Address Book</h1>
      <div className="row mb-3">
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <input
            type="number"
            className="form-control"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          {/* <input
        type="email"
        className="form-control"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /> */}

          {/* For email validation */}
          <input
            type="email"
            className={`form-control ${emailError ? 'is-invalid' : ''}`}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {emailError && <div className="invalid-feedback">Invalid email address</div>}



        </div>
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="col-md-3 mt-3">
          <button
            className="btn btn-primary"
            onClick={handleAddContact}
          >
            {selectedContactId ? 'Update Contact' : 'Add Contact'}
          </button>
        </div>
      </div>
      <div className="row">
        {contacts.map((contact) => (
          <div key={contact._id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{contact.name}</h5>
                <p className="card-text">Phone: {contact.phone}</p>
                <p className="card-text">Email: {contact.email}</p>
                <p className="card-text">Address: {contact.address}</p>
                <div className="btn-group">
                  <button
                    className="btn btn-primary"
                    onClick={() => handleUpdateContact(contact._id)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteContact(contact)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddressBook;
