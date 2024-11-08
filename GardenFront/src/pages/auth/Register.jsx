import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AlreadyLoggedInGuard from "../../guards/AlreadyLoggedIn";
import { signOut } from "firebase/auth";
import z from "zod";
import { useState } from "react";
import { useSpinner } from "../../components/Spinner/Spinner";
import { toast } from "react-toastify";
import { auth } from "../../firebase";

const RegisterFormScheme = z.object({
  name: z.string().min(),
  email: z.string().email("Email must be a valid email address!"),
  password: z.string(),
  repassword: z.string(),
});

function RegisterPage() {
  const { register } = useAuth();
  const { setLoading } = useSpinner();
  const [fieldErrors, setFieldErrors] = useState({});

  const nav = useNavigate();
  const onRegister = async (e) => {
    e.preventDefault();
    const details = Object.fromEntries(new FormData(e.target).entries());

    const parseResult = RegisterFormScheme.safeParse(details);
    if (parseResult.success) {
      const { data: validatedData } = parseResult;

      if (validatedData.password !== validatedData.repassword) {
        return alert("Passwords do not match!");
      }
      setLoading(true);
      try {
        await register(details);
        await signOut(auth);
        nav("/auth/login");
        toast("Thank you for registering, have a wonderful time!");
      } catch (e) {
        toast(e.message);
      }
      setLoading(false);
    } else {
      const { errors } = parseResult.error;
      const additionalErrorMap = errors.reduce((prev, next) => {
        prev[next.path[0]] = next.message;
        return prev;
      }, {});
      setFieldErrors({ ...fieldErrors, ...additionalErrorMap });
    }
  };
  return (
    <div className="flex flex-col items-center">
      <form
        onSubmit={onRegister}
        className="grid grid-rows-2 grid-cols-2 gap-4 p-4 border-2 m-4 rounded-md min-w-[300px] max-w-[90%]"
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-[13px] font-bold p-[2px]">
              Full name
            </label>
            <input
              id="name"
              required
              className="border-2 p-2 outline-none rounded-full"
              type="text"
              name="name"
              placeholder="Enter full name"
            />
            <div className="text-[12px] text-[#bd3333]">{fieldErrors["name"]}</div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="text-[13px] font-bold p-[2px]">
              Email address
            </label>
            <input
              id="email"
              required
              className="border-2 p-2 outline-none rounded-full"
              type="email"
              name="email"
              placeholder="Enter email"
            />
            <div className="text-[12px] text-[#bd3333] text-center">{fieldErrors["email"]}</div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="password" className="text-[13px] font-bold p-[2px]">
              Password
            </label>
            <input
              id="password"
              required
              className="border-2 p-2 outline-none rounded-full"
              type="password"
              name="password"
              placeholder="Enter password"
            />
            <div className="text-[12px] text-[#bd3333] text-center">{fieldErrors["password"]}</div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="re-password" className="text-[13px] font-bold p-[2px]">
              Re enter Password
            </label>
            <input
              id="re-password"
              required
              className="border-2 p-2 outline-none rounded-full"
              type="password"
              name="repassword"
              placeholder="Re Enter password"
            />
            <div className="text-[12px] text-[#bd3333] text-center">
              {fieldErrors["repassword"]}
            </div>
          </div>
        </div>

        <div className="flex flex-col col-span-2 h-[fit-content]">
          <button className="border-[green] bg-[#458645] text-white">Register</button>
          <span className="text-center text-[12px] mt-[20px] max-w-[400px]">
            By registering, you agree to our Terms of Service and acknowledge our Privacy Policy.
            Let's grow together!
          </span>
        </div>
      </form>
      <div className="text-[14px] text-[gray]">
        Already have an account? <Link to="/auth/login">Sign in now</Link>
      </div>
    </div>
  );
}

export default AlreadyLoggedInGuard(RegisterPage);
