import { useState, useEffect } from "react";
import "./app.css";

function App() {
  const initialValues = { username: "", mobile: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};

    if (!values.username) {
      errors.username = "Username is required!";
    } else if (values.mobile.length !== 10) {
      errors.mobile = "Mobile must be 10 characters long";
    }
    return errors;
  };

  return (
    <div className="container">
      {/* if there is null in our formerrors object then we will display sign in */}
      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div className="ui message success">
          <h1 style={{ color: "white" }}>Signed in successfully</h1>
        </div>
      ) : (
        // if not then form screen
        <form onSubmit={handleSubmit}>
          <h1>Sample Form</h1>
          <div className="ui divider"></div>
          <div className="ui form">
            <div className="field">
              <label>Username</label>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formValues.username}
                onChange={handleChange}
              />
            </div>
            <p>{formErrors.username}</p>
            <div className="field">
              <label>Mobile no.</label>
              <input
                type="text"
                name="mobile"
                placeholder="mobile no."
                value={formValues.mobile}
                onChange={handleChange}
              />
            </div>
            <p>{formErrors.mobile}</p>
          </div>

          <button className="fluid ui button blue">Submit</button>
        </form>
      )}
    </div>
  );
}

export default App;
