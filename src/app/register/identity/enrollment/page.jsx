"use client";
import "./register.css";
import { useEffect, useState } from "react";
import RegisterNavbar from "../../../../components/registerNavbar/Register_navbar";
import { useMultistepForm } from "../../../../hooks/useMultistepForm";
import PersonalInfo from "../../../../components/RegisterDetails/PersonalInfo";
import Address from "../../../../components/RegisterDetails/Address";
import Account from "../../../../components/RegisterDetails/Account";
import VerifyIdentity from "../../../../components/RegisterDetails/VerifyIdentity";

export default function Enrollment() {
  const [goBack, setGoBack] = useState();
  const [goNext, setGoNext] = useState();
  const [stepIndex, setStepIndex] = useState();

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
    account_number: Math.floor(Math.random() * 9000000000 + 1000000000),
    routing_number: Math.floor(Math.random() * 900000000 + 100000000),
    verification_code: Math.floor(Math.random() * 9000 + 1000),
  });

  const updateFields = (fields) => {
    setFormData((prevState) => ({
      ...prevState,
      ...fields,
    }));
  };

  useEffect(() => {
    setStepIndex(() => currentStepIndex);

    setGoBack(() => {
      return back;
    });

    setGoNext(() => {
      return next;
    });
  }, [stepIndex]);

  const { step, currentStepIndex, back, next } = useMultistepForm([
    <PersonalInfo
      {...formData}
      updateFields={updateFields}
      back={goBack}
      next={goNext}
    />,
    <Address
      {...formData}
      updateFields={updateFields}
      back={goBack}
      next={goNext}
    />,
    <Account
      {...formData}
      updateFields={updateFields}
      back={goBack}
      next={goNext}
    />,
    <VerifyIdentity
      {...formData}
      updateFields={updateFields}
      back={goBack}
      next={goNext}
      formData={formData}
    />,
  ]);

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
                  <div style={{ marginTop: "30px" }}>{step}</div>
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
