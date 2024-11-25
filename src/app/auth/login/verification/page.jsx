"use client";
import { useEffect, useRef, useState } from "react";
import "./verification.css";
import { getUserByAccNo } from "../../../../lib/requests";
import { toast } from "react-toastify";
import { redirect, useRouter } from "next/navigation";
// import useSession from "../../../../lib/use-session";
import Spinner from "../../../../components/Spinner/Spinner";

export default function page() {
  const myRef = useRef(null);
  const [code, setCode] = useState({});
  const [isClicked, setIsClicked] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const getFromLocalStorage = () => {
    if (typeof window !== "undefined") {
      const value = localStorage.getItem("verification_email")
        ? JSON.parse(localStorage.getItem("verification_email"))
        : {};

      return value;
    }
  };

  const data = getFromLocalStorage();

  const { user } = getUserByAccNo(data?.accountNumber);

  const handleResend = async () => {
    const verification_code = Math.floor(Math.random() * 9000 + 1000);

    await fetch("/api/user/verification/registration", {
      method: "POST",
      body: JSON.stringify({ email: user?.email, verification_code }),
    });

    await fetch(`/api/user/updateverification/${user?.email}`, {
      method: "PUT",
      body: JSON.stringify(verification_code),
    });

    toast.success("Code sent successfully");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsClicked(true);

    const verify =
      code.codei + "" + code.codeii + "" + code.codeiii + "" + code.codeiv;

    if (parseInt(verify) !== user?.verification_code) {
      toast.error("Incorrect code");
      setIsClicked(false);
    } else {
      setLoading(true);

      await fetch("/api/session", {
        method: "POST",
        body: JSON.stringify(user?.username),
      });

      await fetch(`/api/user/verification/${user?.email}`, {
        method: "PUT",
      });

      localStorage.setItem("verification_email", JSON.stringify({}));

      router.push("/dashboard");
    }
  };

  useEffect(() => {
    const inputs = myRef.current.querySelectorAll("input");
    const button = myRef.current.querySelector("button");

    // iterate over all inputs
    inputs.forEach((input, index1) => {
      input.addEventListener("keyup", (e) => {
        // This code gets the current input element and stores it in the currentInput variable
        // This code gets the next sibling element of the current input element and stores it in the nextInput variable
        // This code gets the previous sibling element of the current input element and stores it in the prevInput variable
        const currentInput = input,
          nextInput = input.nextElementSibling,
          prevInput = input.previousElementSibling;

        // if the value has more than one character then clear it
        if (currentInput.value.length > 1) {
          currentInput.value = "";
          return;
        }
        // if the next input is disabled and the current value is not empty
        //  enable the next input and focus on it
        if (
          nextInput &&
          nextInput.hasAttribute("disabled") &&
          currentInput.value !== ""
        ) {
          nextInput.removeAttribute("disabled");
          nextInput.focus();
        }

        // if the backspace key is pressed
        if (e.key === "Backspace") {
          // iterate over all inputs again
          inputs.forEach((input, index2) => {
            // if the index1 of the current input is less than or equal to the index2 of the input in the outer loop
            // and the previous element exists, set the disabled attribute on the input and focus on the previous element
            if (index1 <= index2 && prevInput) {
              input.setAttribute("disabled", true);
              input.value = "";
              prevInput.focus();
            }
          });
        }
        //if the fourth input( which index number is 3) is not empty and has not disable attribute then
        //add active class if not then remove the active class.
        if (!inputs[3].disabled && inputs[3].value !== "") {
          button.classList.add("active");
          return;
        }
        button.classList.remove("active");
      });
    });

    //focus the first input which index is 0 on window load
    window.addEventListener("load", () => inputs[0].focus());
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="verification_wrapper">
      <div className="verification_container">
        <header>
          <i className="bx bxs-check-shield"></i>
        </header>
        <h4>Enter OTP Code</h4>
        <p className="verify_p">
          We have sent a verification code to your email address
        </p>
        <form onSubmit={handleSubmit} ref={myRef} className="verify_form">
          <div className="input-field">
            <input
              onChange={(e) =>
                setCode((prevState) => {
                  return { ...prevState, codei: e.target.value };
                })
              }
              type="number"
            />
            <input
              onChange={(e) =>
                setCode((prevState) => {
                  return { ...prevState, codeii: e.target.value };
                })
              }
              type="number"
              disabled
            />
            <input
              onChange={(e) =>
                setCode((prevState) => {
                  return { ...prevState, codeiii: e.target.value };
                })
              }
              type="number"
              disabled
            />
            <input
              onChange={(e) =>
                setCode((prevState) => {
                  return { ...prevState, codeiv: e.target.value };
                })
              }
              type="number"
              disabled
            />
          </div>
          <button disabled={isClicked}>Verify OTP</button>
        </form>
        <div className="verify_bottom">
          <p>Didn't receive the code? </p>
          <button type="button" onClick={handleResend}>
            Resend Code
          </button>
        </div>
      </div>
    </div>
  );
}
