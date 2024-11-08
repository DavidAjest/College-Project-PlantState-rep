import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import AlreadyLoggedInGuard from "../../guards/AlreadyLoggedIn";


import z from 'zod'
import { Link } from "react-router-dom";
import { useSpinner } from "../../components/Spinner/Spinner";
import { toast } from 'react-toastify'
const LoginFormScheme = z.object({
    email: z.string().email("Email must be a valid email address!"),
    password: z.string().min(6, "Password must be at least of length 6")
})

function LoginPage() {

    const { login } = useAuth()
    const { setLoading } = useSpinner()

    const [fieldErrors, setFieldErrors] = useState({})

    const onLogin = async (e) => {
        e.preventDefault()

        const details = Object.fromEntries(new FormData(e.target).entries())

        const parseResult = LoginFormScheme.safeParse(details)
        if (parseResult.success) {
            const { data: validatedData } = parseResult
            setLoading(true)
            try {
                const user = await login(validatedData)
                const notify = toast(`Welcome, ${user.name}`);
            } catch (e) {
                const notify = toast(e.message);
            }
            setLoading(false)
        }
        else {
            const { errors } = parseResult.error
            const additionalErrorMap = errors.reduce((prev, next) => {
                prev[next.path[0]] = next.message
                return prev
            }, {})
            setFieldErrors({ ...fieldErrors, ...additionalErrorMap })
        }

    }


    return (<div className="flex flex-col items-center">

        <form onSubmit={onLogin} className="flex flex-col gap-4 p-4 border-2 m-4 rounded-md min-w-[400px] max-w-[90%]">
            <div className="flex flex-col">
                <label htmlFor="email" className="text-[13px] font-bold p-[2px]">Email address</label>
                <input required id="email" className="border-2 p-2 outline-none rounded-full" type="email" name="email" placeholder="Enter email" />
                <div className="text-[12px] text-[#bd3333]">
                    {fieldErrors['email']}
                </div>
            </div>

            <div className="flex flex-col">
                <label htmlFor="password" className="text-[13px] font-bold p-[2px]">Password</label>
                <input required id="password" className="border-2 p-2 outline-none rounded-full" type="password" name="password" placeholder="Enter password" />
                <div className="text-[12px] text-[#bd3333]">
                    {fieldErrors['password']}
                </div>
            </div>

            <div className="grid">
                <button className="border-[green] bg-[#458645] text-white">Login</button>
            </div>
        </form>

        <div className="text-[14px] text-[gray]">Don't have an account? <Link to="/auth/register">Create one now</Link></div>
    </div>);
}

export default AlreadyLoggedInGuard(LoginPage);