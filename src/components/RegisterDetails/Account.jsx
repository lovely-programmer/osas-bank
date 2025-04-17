"use client";

import { useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import { zodAccountInfoConfig } from "../../hooks/zod";
import { toast } from "react-toastify";
import Spinner from "../Spinner/Spinner";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/navigation";

function Account({
  name,
  address,
  occupation,
  country,
  city,
  state,
  zip_code,
  account_number,
  routing_number,
  verification_code,
  username,
  account_type,
  email,
  password,
  confirmPassword,
  updateFields,
  back,
}) {
  const [hide, setHide] = useState(true);
  const [hideConfirm, setHideConfirm] = useState(true);
  const [loading, setLoading] = useState(false);
  const [number, setNumber] = useState();
  const [dob, setDob] = useState(new Date());

  const { register, errors, handleSubmit, setValue } = zodAccountInfoConfig();

  const router = useRouter();

  const submit = async () => {
    if (password !== confirmPassword) {
      toast.error("Password do not match");
    } else {
      const userData = {
        username,
        name,
        email,
        password,
        address,
        phoneNumber: number,
        account_type,
        country,
        state,
        city,
        zip_code,
        occupation,
        date_of_birth: dob,
        balance: 0,
        account_number,
        routing_number,
        verification_code,
      };

      setLoading(true);

      const res = await fetch("/api/user/register", {
        method: "POST",
        body: JSON.stringify(userData),
      });

      if (res.ok) {
        localStorage.setItem(
          "verification_email",
          JSON.stringify({ username, password })
        );

        await fetch("/api/user/verification/registration", {
          method: "POST",
          body: JSON.stringify({ email, verification_code }),
        });

        router.push("/register/identity/verification");
      } else {
        toast.error("User already exist");
        setLoading(false);
      }
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div className="form_group">
        <label htmlFor="email">Email</label>
        <input
          {...register("email")}
          value={email}
          onChange={(e) => {
            updateFields({ email: e.target.value });
            setValue("email", e.target.value);
          }}
          required
          id="email"
          name="email"
          type="text"
          placeholder="johndoe@gmail.com"
        />
        {errors.email && (
          <div className="form_error">{errors.email.message}</div>
        )}
      </div>

      <div className="form_group">
        <label htmlFor="phoneNumber">Phone Number</label>
        <PhoneInput
          {...register("phoneNumber")}
          defaultCountry="US"
          international
          withCountryCallingCode
          placeholder="(555) 123-4567"
          value={number}
          onChange={setNumber}
          className="input-phone"
        />
        {errors.phoneNumber && (
          <div className="form_error">{errors.phoneNumber.message}</div>
        )}
      </div>

      <div className="form_group">
        <label htmlFor="username">Username</label>
        <input
          {...register("username")}
          required
          type="text"
          placeholder="Jane"
          id="username"
          name="username"
          value={username}
          onChange={(e) => {
            updateFields({ username: e.target.value });
            setValue("username", e.target.value);
          }}
        />
        {errors.username && (
          <div className="form_error">{errors.username.message}</div>
        )}
      </div>

      <div className="form_group">
        <div>Date of birth</div>
        <DatePicker
          selected={dob}
          onChange={(date) => setDob(date)}
          dateFormat={"MM/dd/yyyy"}
          timeInputLabel="Time:"
          wrapperClassName="date-picker"
        />
      </div>

      <div className="form_group">
        <select
          onChange={(e) => updateFields({ account_type: e.target.value })}
          value={account_type}
          name="account_type"
          required
        >
          <option value="">Select Account</option>
          <option value="Savings">Savings</option>
          <option value="Checking">Checking</option>
        </select>
      </div>

      <div style={{ position: "relative" }} className="form_group">
        <div className="password__field">
          <label htmlFor="password">Password</label>
          <input
            {...register("password")}
            required
            type={`${hide ? "password" : "text"}`}
            id="password"
            name="password"
            value={password}
            onChange={(e) => {
              updateFields({ password: e.target.value });
              setValue("password", e.target.value);
            }}
          />
        </div>
        <div className="show_hide">
          {hide ? (
            <BiHide onClick={() => setHide(false)} />
          ) : (
            <BiShow onClick={() => setHide(true)} />
          )}
        </div>
        {errors.password && (
          <div className="form_error">{errors.password.message}</div>
        )}
      </div>

      <div style={{ position: "relative" }} className="form_group">
        <div className="password__field">
          <label htmlFor="confirm_password">Confirm Password</label>
          <input
            {...register("confirmPassword")}
            required
            type={`${hideConfirm ? "password" : "text"}`}
            id="confirm_password"
            name="confirm_password"
            value={confirmPassword}
            onChange={(e) => {
              updateFields({ confirmPassword: e.target.value });
              setValue("confirmPassword", e.target.value);
            }}
          />
        </div>

        <div className="show_hide">
          {hideConfirm ? (
            <BiHide onClick={() => setHideConfirm(false)} />
          ) : (
            <BiShow onClick={() => setHideConfirm(true)} />
          )}
        </div>

        {errors.confirmPassword && (
          <div className="form_error">{errors.confirmPassword.message}</div>
        )}
      </div>

      <div className="create__account-btn">
        <div className="register__btn">
          <button onClick={() => back()} type="button" className="prev_button">
            Previous
          </button>
        </div>

        <div className="register__btn">
          <button type="submit">Finish</button>
        </div>
      </div>
    </form>
  );
}

export default Account;
