"use client";
import { useRouter } from "next/navigation";
import { zodVerifyIdentityConfig } from "../../hooks/zod";
import { useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import { toast } from "react-toastify";
import Spinner from "../Spinner/Spinner";

function VerifyIdentity({ updateFields, back, formData }) {
  const router = useRouter();
  const { register, errors, handleSubmit, setValue } =
    zodVerifyIdentityConfig();

  const [hide, setHide] = useState(true);
  const [hideConfirm, setHideConfirm] = useState(true);
  const [loading, setLoading] = useState(false);

  const {
    username,
    name,
    email,
    address,
    account_type,
    phoneNumber,
    password,
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
    verification_code,
  } = formData;

  const submit = async () => {
    if (social_security !== confirm_social) {
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
        // const data = await res.json();
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
      <p style={{ marginBottom: "15px" }}>
        We are required by law to collect your Social Security Number / TIN{" "}
      </p>

      <div className="form__group password">
        <div className="password__field">
          <input
            {...register("social_security")}
            required
            type={`${hide ? "password" : "text"}`}
            id="social_security"
            name="social_security"
            value={social_security}
            maxLength="9"
            onChange={(e) => {
              updateFields({ social_security: e.target.value });
              setValue("social_security", e.target.value);
            }}
          />
          <label htmlFor="social_security">Social Security Number / TIN</label>
        </div>
        {hide ? (
          <BiHide onClick={() => setHide(false)} />
        ) : (
          <BiShow onClick={() => setHide(true)} />
        )}
      </div>
      {errors.social_security && (
        <div className="form_error">{errors.social_security.message}</div>
      )}

      <div className="form__group password">
        <div className="password__field">
          <input
            {...register("confirm_social")}
            required
            type={`${hideConfirm ? "password" : "text"}`}
            id="confirm_social"
            name="confirm_social"
            maxLength="9"
            value={confirm_social}
            onChange={(e) => {
              updateFields({ confirm_social: e.target.value });
              setValue("confirm_social", e.target.value);
            }}
          />
          <label htmlFor="social_security">Confirm SSN / TIN</label>
        </div>
        {hideConfirm ? (
          <BiHide onClick={() => setHideConfirm(false)} />
        ) : (
          <BiShow onClick={() => setHideConfirm(true)} />
        )}
      </div>
      {errors.confirm_social && (
        <div className="form_error">{errors.confirm_social.message}</div>
      )}

      <div style={{ marginBottom: "10px" }}>Date of birth</div>
      <div className="form__group">
        <input
          required
          value={date_of_birth}
          onChange={(e) => updateFields({ date_of_birth: e.target.value })}
          name="date_of_birth"
          type="date"
          id="date_of_birth"
          max="2005-12-01"
        />
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

export default VerifyIdentity;
