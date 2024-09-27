"use client";
import "./register.css";
import { useState } from "react";
import RegisterNavbar from "../../../../components/registerNavbar/Register_navbar";
import { useMultistepForm } from "../../../../hooks/useMultistepForm";
import PersonalInfo from "../../../../components/RegisterDetails/PersonalInfo";
import Address from "../../../../components/RegisterDetails/Address";
import Account from "../../../../components/RegisterDetails/Account";
import VerifyIdentity from "../../../../components/RegisterDetails/VerifyIdentity";
import { toast } from "react-toastify";
import { authorizeUser } from "../../../actions/authActions";

export default function Enrollment() {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    address: "",
    account_type: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    occupation: "",
    country: "",
    city: "",
    state: "",
    zip_code: "",
    social_security: "",
    confirm_social: "",
    date_of_birth: "",
    account_number: Math.floor(Math.random() * 900000000),
    routing_number: Math.floor(Math.random() * 90000000),
  });

  const {
    username,
    name,
    email,
    address,
    account_type,
    phoneNumber,
    password,
    confirmPassword,
    occupation,
    country,
    city,
    state,
    zip_code,
    social_security,
    confirm_social,
    date_of_birth,
    account_number,
    routing_number,
  } = formData;

  const updateFields = (fields) => {
    setFormData((prevState) => ({
      ...prevState,
      ...fields,
    }));
  };

  const { step, steps, currentStepIndex, isFirstStep, isLastStep, back, next } =
    useMultistepForm([
      <PersonalInfo {...formData} updateFields={updateFields} />,
      <Address {...formData} updateFields={updateFields} />,
      <Account {...formData} updateFields={updateFields} />,
      <VerifyIdentity {...formData} updateFields={updateFields} />,
    ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLastStep) return next();
    if (password !== confirmPassword) {
      toast.error("Password do not match");
    } else if (social_security !== confirm_social) {
      toast.error("SSN/TIN do not match");
    } else {
      const userData = {
        username,
        name,
        email,
        password,
        address,
        phoneNumber,
        account_type,
        country,
        state,
        city,
        zip_code,
        occupation,
        social_security,
        date_of_birth,
        balance: 0,
        account_number,
        routing_number,
      };

      const res = await fetch("/api/user/register", {
        method: "POST",
        body: JSON.stringify(userData),
      });

      if (res.ok) {
        authorizeUser(userData);
      }
    }
  };

  return (
    <div>
      <RegisterNavbar />
      <div className="register__container">
        <div
          style={{ backgroundImage: "url(/enroll_img.jpg)" }}
          className="register__content"
        >
          <div className="register">
            <div className="register__main">
              <div className="register__details">
                <h1>Let's set up your online access</h1>
                <span>First, we need some information from you.</span>

                <div className="register__form">
                  {/* <div
                    style={{
                      position: "absolute",
                      top: "-1.5rem",
                      right: "1.5rem",
                      fontSize: "20px",
                      background: "#6565d2",
                      padding: "10px",
                      color: "#fff",
                    }}
                  >
                    <span>{currentStepIndex + 1}</span>
                    <span> / </span>
                    <span>{steps.length}</span>
                  </div> */}
                  <form style={{ marginTop: "30px" }} onSubmit={handleSubmit}>
                    {step}

                    <div className="create__account-btn">
                      {!isFirstStep && (
                        <div className="register__btn">
                          <button
                            type="button"
                            onClick={back}
                            className="prev_button"
                          >
                            Previous
                          </button>
                        </div>
                      )}

                      <div className="register__btn">
                        <button type="submit">
                          {isLastStep ? "Finish" : "Next"}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="register__footer">
          <div className="register__footercontent">
            <div className="register__footerfirst">
              <div>
                <p>Privacy, Cookies, Security & Legal</p>
              </div>
              <div>
                <p>Notice of Data Collection</p>
              </div>
              <div>
                <p>Ad Choices </p>
              </div>
            </div>
            <div className="register__footersecond">
              © 1999 - 2024 Wells Fargo. All rights reserved. NMLSR ID 399801
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
