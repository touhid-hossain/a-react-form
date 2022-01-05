import emailjs from "emailjs-com";
import React from "react";
import { useRef,useState } from "react";
import FormInput from "./FormInput.jsx";
import "./FormInput.css";
import TopBar from "./Topbar/TopBar.jsx";

export const ContactUs = () => {
  const form = useRef();

  // const Form = () => {
    const [values, setValues] = useState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      message: "",
    });

    const inputs = [
      {
        id: 1,
        name: "firstName",
        type: "text",
        placeholder: "First Name",
        errorMessage: "First Name should be 3-20 characters!",
        pattern: "^[A-Za-z0-9_ ]{3,20}$",
        required: true,
      },

      {
        id: 2,
        name: "lastName",
        type: "text",
        placeholder: "Last Name",
        errorMessage: "Last Name should be 4-8 characters!",
        pattern: "^[A-Za-z0-9]{4,8}$",
        required: true,
      },

      {
        id: 3,
        name: "email",
        type: "email",
        placeholder: "Email Address",
        errorMessage: "Looks like this is not an email!",
        pattern:
          "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9]{3,4}(?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9]{3,4}(?:[a-z0-9-]*[a-z0-9]{3,4})?",
        required: true,
      },

      {
        id: 4,
        name: "password",
        type: "text",
        placeholder: "Password",
        errorMessage:
          "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
        pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&_*])[a-zA-Z0-9!@#$%^&_*]{8,20}$`,
        required: true,
      },

      {
        id: 5,
        name: "message",
        type: "text",
        placeholder: "Your Message",
        errorMessage: "Message must be contain 50 to 100 words at least!",
        pattern: "^[A-Za-z0-9_ ,.!*#$^&*<]{50,200}$",
        required: true,
      },
    ];

    // HandleSubmit prevent The page From Refreshing.
    // Also Handling Email.

    function sendMailSubmit (e) {
      e.preventDefault();

      emailjs
        .sendForm(
          "service_96udqh2",
          "template_6ex5ai7",
          form.current,
          "user_vAcUCgyBd1U2Je1792j6z"
        )
        .then(
          (result) => {
            console.log(result.text);
          },
          (error) => {
            console.log(error.text);
          }
        );
      e.target.reset();
    };

    const onChange = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value });
    };

    console.log(values);

    return (
      <div className="second-part">
        <TopBar />
        <form ref={form} className="main-form" onSubmit={sendMailSubmit}>
          {inputs.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          ))}

          <button>Claim your free trial </button>
          <p className="down-btn">
            By clicking the button, you are agreeing to our
            <strong className="terms">Terms and Services</strong>
          </p>
        </form>
      </div>
    );
  // };
};
export default ContactUs;
