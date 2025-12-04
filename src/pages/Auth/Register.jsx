import React, { useState, useEffect } from "react";
import TalentSignupForm from "../../components/auth/TalentSignupForm";
import signupImage from "../../assets/images/signup.svg";
import { Link, Outlet } from "react-router-dom";
import { Helmet } from "react-helmet";
import EmployerSigupForm from "../../components/auth/EmployerSignupForm";

export default function Register() {
  const [role, setRole] = useState("TALENT");

  useEffect(() => {});

  return (
    <>
      <Helmet>
        <title>Sign Up</title>
      </Helmet>

      <div>
        <div
          className={` flex flex-col lg:flex-row items-center max-w-screen-xl mx-auto justify-between md:px-5 lg:px-0  py-64 md:py-7 px-7  gap-3 `}
        >
          {/* /*******************   image   ******************** */}
          <div className=" w-1/2 bg-blue-600">
            <img src={signupImage} className="w-full h-auto " alt="sign up" />
          </div>

          <div className=" w-full lg:w-1/2 ">
            <span className="w-full flex justify-center">
              <h1 className="text-3xl font-bold text-heading pb-2 ">Signup</h1>
            </span>

            {/*******************   tabs   ******************** */}
            <div className="text-sm font-medium text-center text-body border-b border-default ">
              <ul className="flex flex-wrap -mb-px">
                {/* talent tab */}
                <li className="me-2">
                  <button
                    onClick={() => {
                      setRole("TALENT");
                    }}
                    className={`inline-block p-4  rounded-t-base font-thin transition-colors duration-300 
                                ${
                                  role === "TALENT"
                                    ? "text-fuchsia-800 border-b-2 border-fuchsia-800"
                                    : " text-gray-900 border-b border-transparent hover:text-fuchsia-800 hover:border-fuchsia-800 "
                                }`}
                  >
                    Talent
                  </button>
                </li>

                {/* employer tab */}
                <li className="me-2">
                  <button
                    onClick={() => setRole("EMPLOYER")}
                    className={`inline-block p-4 rounded-t-base 
                                 ${
                                   role === "EMPLOYER"
                                     ? "text-fuchsia-800 border-b-2 border-fuchsia-800"
                                     : " text-gray-900 border-b border-transparent hover:text-fuchsia-800 hover:border-fuchsia-800 "
                                 }`}
                    aria-current="page"
                  >
                    Employer
                  </button>
                </li>
              </ul>
            </div>

            {/* ************* register form ******************** */}
            {role === "TALENT" ? <TalentSignupForm role='TALENT' /> : <EmployerSigupForm role='EMPLOYER' />}

            {/* ********************* login link ************************ */}

            <div className="w-full flex  items-center justify-center pt-3 mt-3">
              <p to="/login" className="text-sm font-medium text-slate-800 ">
                Already have an account?{" "}
                <Link
                  to="login"
                  className=" text-blue-600 hover:underline hover:text-blue-400"
                >
                  Login
                </Link>
              </p>
            </div>

            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
