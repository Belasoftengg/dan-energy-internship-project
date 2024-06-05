import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from 'react-router-dom';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,

}
from 'mdb-react-ui-kit';

const Contact = () => {
  const history = useHistory();
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !phoneNumber || !subject || !message) {
      setError('Please fill in all fields');
      return;
    }
  };

  return (
    <MDBContainer fluid className='pt-5'>
      <MDBCard className='text-black m-5' style={{ borderRadius: '25px' }}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
              <h1 className="text-center h1 fw-bold mb-4 mx-1 mx-md-4 mt-2"> Contact us </h1>
              <div className="error-message" style={{ color: 'red' }}>
                {error && <p>{error}</p>}
              </div>
              <form >
              <div className="d-flex flex-row align-items-center mb-3">
  <MDBIcon fas icon="user me-3" size='lg'/>
  <MDBInput  id='form1' type='text' placeholder='name' value={name} onChange={(e) => { setName(e.target.value) }} />
</div>



<div className="d-flex flex-row align-items-center mb-3">
  <MDBIcon fas icon="phone" size='lg'/>
  <MDBInput  id='form2' type='tel' placeholder=' phone number' value={phoneNumber} onChange={(e) => { setPhoneNumber(e.target.value) }} />
</div>



<div className="d-flex flex-row align-items-center mb-3">
  <MDBIcon fas icon="book" size='lg'/>
  <MDBInput id='form3' type='text' placeholder='subject' value={subject} onChange={(e) => { setSubject(e.target.value) }} />
</div>

<div className="d-flex flex-row align-items-center mb-3">
  <MDBIcon fas icon="message" className="me-3" size='lg'/>
  <textarea
    id="form4"
    className="form-control"
    placeholder=" message "
    value={message}
    onChange={(e) => {
      setMessage(e.target.value);
    }}
  />
</div>
                <MDBBtn className='mb-3' size='lg' type="submit">Send</MDBBtn>

              </form>
            </MDBCol>

           <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
  <MDBCardImage src='images/customer/contact.jpg' alt='FAILED TO INSERT THE IMAGE'fluid/>
</MDBCol>

          </MDBRow>
        </MDBCardBody>
      </MDBCard>

    </MDBContainer>
  );
};

export default Contact;
