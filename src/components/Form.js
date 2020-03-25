import React, { useState, useEffect } from "react";
import axios from "axios";
import * as yup from "yup";

const formSchema = yup.object().shape({
  name: yup.string().required("Name is a required field."),
  email: yup
    .string()
    .email("Must be a valid email address.")
    .required("Must include email address."),
  terms: yup.boolean().oneOf([true], "please agree to terms of use"),
  positions: yup.string(),
  motivation: yup.string().required("must include why you'd like to join")
});

export default function Form() {
  // state for whether our button should be disabled or not.
  const [buttonDisabled, setButtonDisabled] = useState(true);

  // managing state for our form inputs
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    terms: "",
    positions: "",
    motivation: ""
  });

  // state for our errors
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    terms: "",
    positions: "",
    motivation: ""
  });

  // new state to set our post request too. So we can console.log and see it.
  const [post, setPost] = useState([]);

  useEffect(() => {
    formSchema.isValid(formState).then(valid => {
      setButtonDisabled(!valid);
    });
  }, [formState]);

  const formSubmit = e => {
    e.preventDefault();
    axios
      .post("https://reqres.in/api/users", formState)
      .then(res => {
        setPost(res.data); // get just the form data from the REST api
        console.log("success", post);
        // reset form if successful
        setFormState({
          name: "",
          email: "",
          terms: "",
          positions: "",
          motivation: ""
        });
      })
      .catch(err => console.log(err.response));
  };

  const validateChange = e => {
    // Reach will allow us to "reach" into the schema and test only one part.
    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then(valid => {
        setErrors({
          ...errors,
          [e.target.name]: ""
        });
      })
      .catch(err => {
        setErrors({
          ...errors,
          [e.target.name]: err.errors[0]
        });
      });
  };

  const inputChange = e => {
    e.persist();
    const newFormData = {
      ...formState,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value
    };

    validateChange(e);
    setFormState(newFormData);
  };

  return (
    <form onSubmit={formSubmit}>
      <label htmlFor='name'>
        Name
        <input
          type='text'
          name='name'
          value={formState.name}
          onChange={inputChange}
        />
        {errors.name.length > 0 ? <p className='error'>{errors.name}</p> : null}
      </label>
      <label htmlFor='email'>
        Email
        <input
          type='text'
          name='email'
          value={formState.email}
          onChange={inputChange}
        />
        {errors.email.length > 0 ? (
          <p className='error'>{errors.email}</p>
        ) : null}
      </label>
      <label htmlFor='motivation'>
        Why would you like to help?
        <textarea
          name='motivation'
          value={formState.motivation}
          onChange={inputChange}
        />
        {errors.motivation.length > 0 ? (
          <p className='error'>{errors.motivation}</p>
        ) : null}
      </label>
      <label htmlFor='positions'>
        What would you like to help with?
        <select id='positions' name='positions' onChange={inputChange}>
          <option value='Newsletter'>Newsletter</option>
          <option value='Yard Work'>Yard Work</option>
          <option value='Administrative Work'>Administrative Work</option>
          <option value='Tabling'>Tabling</option>
        </select>
      </label>
      <label htmlFor='terms' className='terms'>
        <input
          type='checkbox'
          name='terms'
          checked={formState.terms}
          onChange={inputChange}
        />
        Terms & Conditions
      </label>
      {/* displaying our post request data */}
      <pre>{JSON.stringify(post, null, 2)}</pre>
      <button disabled={buttonDisabled}>Submit</button>
    </form>
  );
}
