import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "./Button";
import { postData } from "../utils/fetch";
import { TextInput } from "./Text Input";
import { handlerError } from "../utils/error";

const LoginForm = () => {
    const router = useRouter();
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async () => {
        try {
            const response = await postData(`${process.env.NEXT_PUBLIC_API_URL}/participants/signin`, form)

            if (response?.data) {
                toast.success('Login successful, welcome back!', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                })
    
                Cookies.set('token', response.data.token);
                router.push('/');
            }
        } catch (error) {
            handlerError(error);
        }
    }

    return (
        <form action="" className="form-login d-flex flex-column mt-4 mt-md-0 p-30">
            <TextInput
                label={'Email'}
                name={'email'}
                placeholder={'Enter your email'}
                type={'email'}
                value={form.email}
                onChange={handleChange}
            />

            <TextInput
                label={'Password'}
                name={'password'}
                placeholder={'Enter your password'}
                type={'password'}
                value={form.password}
                onChange={handleChange}
            />

            <div className="d-grid mt-2 gap-4">
                <Button
                    action={() => handleSubmit()}
                    variant={'btn-green'}
                >
                    Sign In
                </Button>

                <Button
                    action={() => router.push('/signup')}
                    variant={'btn-navy'}
                >
                    Create New Account
                </Button>
            </div>
        </form>
    )
}

export { LoginForm };