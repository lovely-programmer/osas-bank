"use client";
import { zodPersonalInfoConfig } from "../../hooks/zod";
import { data } from "./data";

function PersonalInfo({ name, occupation, country, updateFields, next }) {
  const { register, errors, handleSubmit, setValue } = zodPersonalInfoConfig();

  const submit = () => {
    next();
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      {/* <h3 style={{ marginBottom: "15px" }}>Personal Info</h3> */}
      <div>
        <div className="form_group">
          <label htmlFor="name">Full Name</label>
          <input
            {...register("name")}
            required
            type="text"
            placeholder="John Doe"
            id="name"
            name="name"
            value={name}
            onChange={(e) => {
              updateFields({ name: e.target.value });
              setValue("name", e.target.value);
            }}
          />
          {errors.name && (
            <div className="form_error">{errors.name.message}</div>
          )}
        </div>
      </div>

      <div>
        <div className="form_group">
          <label htmlFor="occupation">Occupation</label>
          <input
            {...register("occupation")}
            required
            type="text"
            placeholder="Software Developer"
            id="occupation"
            name="occupation"
            value={occupation}
            onChange={(e) => {
              updateFields({ occupation: e.target.value });
              setValue("occupation", e.target.value);
            }}
          />
          {errors.occupation && (
            <div className="form_error">{errors.occupation.message}</div>
          )}
        </div>
      </div>

      <div className="form_group">
        <div>Country</div>
        <select
          required
          onChange={(e) => updateFields({ country: e.target.value })}
          value={country}
          name="country"
        >
          <option value="select">Select Country</option>
          {data.map((d, i) => (
            <option key={i} value={d.name}>
              {d.name}
            </option>
          ))}
        </select>
        {country !== "select" ||
          (country !== " " && <span className="select">Select Country</span>)}
      </div>

      <div className="create__account-btn">
        <div className="register__btn">
          <button type="submit">Next</button>
        </div>
      </div>
    </form>
  );
}

export default PersonalInfo;
