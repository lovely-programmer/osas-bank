"use client";

import { useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import { zodAccountInfoConfig } from "../../hooks/zod";
import { toast } from "react-toastify";

function Account({
  username,
  phoneNumber,
  account_type,
  email,
  updateFields,
  password,
  confirmPassword,
  back,
  next,
}) {
  const [hide, setHide] = useState(true);
  const [hideConfirm, setHideConfirm] = useState(true);

  const { register, errors, handleSubmit, setValue } = zodAccountInfoConfig();

  const submit = () => {
    if (password !== confirmPassword) {
      toast.error("Password do not match");
    } else {
      next();
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      {/* <h3 style={{ marginBottom: "15px" }}>Create Login</h3> */}
      <div className="form__group">
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
        />
        <label htmlFor="email">Email</label>
      </div>
      {errors.email && <div className="form_error">{errors.email.message}</div>}

      <div className="form__group">
        <input
          {...register("phoneNumber")}
          value={phoneNumber}
          onChange={(e) => {
            updateFields({ phoneNumber: e.target.value });
            setValue("phoneNumber", e.target.value);
          }}
          required
          id="phoneNumber"
          name="phoneNumber"
          type="text"
        />
        <label htmlFor="phoneNumber">Phone Number</label>
      </div>
      {errors.phoneNumber && (
        <div className="form_error">{errors.phoneNumber.message}</div>
      )}

      <div className="form__group">
        <input
          {...register("username")}
          required
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => {
            updateFields({ username: e.target.value });
            setValue("username", e.target.value);
          }}
        />
        <label htmlFor="username">Username</label>
      </div>
      {errors.username && (
        <div className="form_error">{errors.username.message}</div>
      )}

      <div style={{ paddingRight: "10px" }} className="form__group">
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

      <div className="form__group password">
        <div className="password__field">
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
          <label htmlFor="username">Password</label>
        </div>
        {hide ? (
          <BiHide onClick={() => setHide(false)} />
        ) : (
          <BiShow onClick={() => setHide(true)} />
        )}
      </div>
      {errors.password && (
        <div className="form_error">{errors.password.message}</div>
      )}

      <div className="form__group password">
        <div className="password__field">
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
          <label htmlFor="username">Confirm Password</label>
        </div>
        {hideConfirm ? (
          <BiHide onClick={() => setHideConfirm(false)} />
        ) : (
          <BiShow onClick={() => setHideConfirm(true)} />
        )}
      </div>
      {errors.confirmPassword && (
        <div className="form_error">{errors.confirmPassword.message}</div>
      )}

      <div className="create__account-btn">
        <div className="register__btn">
          <button onClick={() => back()} type="button" className="prev_button">
            Previous
          </button>
        </div>

        <div className="register__btn">
          <button type="submit">Next</button>
        </div>
      </div>
    </form>
  );
}

export default Account;
