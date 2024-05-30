import React from 'react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import emailjs from '@emailjs/browser'; 
import { useRef } from 'react';
import './img.css';
const Contact = () => {
  const inputRef = useRef(null);
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState(null);

  const handleImageClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleImageResize = () => {
    const img = document.getElementById("preview-image");
    if (img) {
      const width = img.offsetWidth;
      const height = img.offsetHeight;
      if (width > 300 || height > 200) {
        img.style.width = `${width / 2}px`;
        img.style.height = `${height / 2}px`;
      }
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();
  const [disabled, setDisabled] = useState(false);
  const [alertInfo, setAlertInfo] = useState({
    display: false,
    message: '',
    type: '',
  });
  
  
  // Shows alert message for form submission feedback
  const toggleAlert = (message, type) => {
    setAlertInfo({ display: true, message, type });

    // Hide alert after 5 seconds
    setTimeout(() => {
      setAlertInfo({ display: false, message: '', type: '' });
    }, 5000);
  };
  
 // Function called on submit that uses emailjs to send email of valid contact form
 const onSubmit = async (data) => {
  // Destructure data object
  const { name, email, subject, message } = data;
  try {
    // Disable form while processing submission
    setDisabled(true);
    
    const templateParams = {
      name,
      email,
      subject,
      message
    };

    await emailjs.send(
      process.env.REACT_APP_SERVICE_ID,
      process.env.REACT_APP_TEMPLATE_ID,
      templateParams,
      process.env.REACT_APP_USER_ID
    );

    // Display success alert
    toggleAlert('Form submission was successful!', 'success');
  } catch (e) {
    console.error(e);
    // Display error alert
    toggleAlert('Uh oh. Something went wrong.', 'danger');
  } finally {
    // Re-enable form submission
    setDisabled(false);
    // Reset contact form fields after submission
    reset();
  }
};


  return (
    <>
    <div class="flex items-center justify-center p-12">
      <div class="mx-auto w-full max-w-[550px]">
        <form  method="POST">
        <div className='img'>
<div onClick={handleImageClick}>
    {preview ? (
      <img
        id="preview-image"
        src={preview}
        alt="my image"
        className="profile-image"
        style={{
          width: "10%",
          height: "10%",
          objectFit: "cover",
          borderRadius: "50%",
        }}
      />
    ) : (
      <img src="../upload.jpg" alt="my image" style={{width:'100px'}} />
    )}
    <input type="file" ref={inputRef} onChange={handleImageChange} style={{ display: "none" }} />
    <button 
className="img-upload" 
style={{ 
backgroundColor: '#808080', 
width: '150px' ,
height: '40px'
}} 
onClick={handleImageResize}>
upload
</button>
  </div>
</div>
     <div class="mb-5">
            <label
              for="name"
              class="mb-3 block text-base font-medium text-[#07074D]"
            >
              Full Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Full Name"
              class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
          <div class="mb-5">
            <label
              for="email"
              class="mb-3 block text-base font-medium text-[#07074D]"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="example@domain.com"
              class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
        
          <div class="mb-5">
            <label
              for="message"
              class="mb-3 block text-base font-medium text-[#07074D]"
            >
              Message
            </label>
            <textarea
              rows="4"
              name="message"
              id="message"
              placeholder="Type your message"
              class="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            ></textarea>
          </div>
          <div>
          <button
  class="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none"
  style={{ marginBottom: "380px" }}
>
  Submit
</button>
          </div>
        </form>
      </div>
    </div>

</>
  )
};
export default Contact;
