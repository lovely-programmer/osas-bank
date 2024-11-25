"use client";
import { zodAddressInfoConfig } from "../../hooks/zod";

function Address({ address, city, state, zip_code, updateFields, back, next }) {
  const { register, errors, handleSubmit, setValue } = zodAddressInfoConfig();

  const submit = () => {
    next();
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      {/* <h3 style={{ marginBottom: "15px" }}>Residential Address</h3> */}

      <div className="form__group">
        <input
          {...register("address")}
          value={address}
          onChange={(e) => updateFields({ address: e.target.value })}
          // required
          id="address"
          name="address"
          type="text"
        />
        <label htmlFor="address">Street Address</label>
      </div>
      {errors.address && (
        <div className="form_error">{errors.address.message}</div>
      )}

      <div className="form__group">
        <input
          {...register("city")}
          value={city}
          onChange={(e) => {
            updateFields({ city: e.target.value });
            setValue("city", e.target.value);
          }}
          // required
          id="city"
          name="city"
          type="text"
        />
        <label htmlFor="city">City</label>
      </div>
      {errors.city && <div className="form_error">{errors.city.message}</div>}

      <div className="form__group">
        <input
          {...register("state")}
          value={state}
          onChange={(e) => {
            updateFields({ state: e.target.value });
            setValue("state", e.target.value);
          }}
          // required
          id="state"
          name="state"
          type="text"
        />
        <label htmlFor="state">State</label>
      </div>
      {errors.state && <div className="form_error">{errors.state.message}</div>}

      <div className="form__group">
        <input
          {...register("zip_code")}
          value={zip_code}
          onChange={(e) => {
            updateFields({ zip_code: e.target.value });
            setValue("zip_code", e.target.value);
          }}
          // required
          id="zip_code"
          name="zip_code"
          type="text"
        />
        <label htmlFor="zip_code">Zip Code</label>
      </div>
      {errors.zip_code && (
        <div className="form_error">{errors.zip_code.message}</div>
      )}

      <div className="create__account-btn">
        <div className="register__btn">
          <button type="button" onClick={back} className="prev_button">
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

export default Address;
