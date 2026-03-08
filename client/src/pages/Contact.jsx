import React from 'react';
import ContactForm from "../components/ContactForm.jsx";
import ContactInformation from "../components/ContactInformation.jsx";

function Contact() {
    return (
        <div className={"mt-24"}>
            <ContactForm />
            <ContactInformation />
        </div>
    );
}

export default Contact;