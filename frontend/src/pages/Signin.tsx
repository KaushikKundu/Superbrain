import { User, EyeOff, Eye, ArrowRight } from "lucide-react";
import { useRef, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";
import z from "zod";
import { useNavigate } from "react-router-dom";


const signinSchema = z.object({
    username: z.string().min(3).max(10),
    password: z.string().min(4).max(10),
});

function SignIn() {
    const navigate = useNavigate();
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const [showPassword, setShowPassword] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const handleSignIn = async () => {
        const username = usernameRef.current?.value || '';
        const password = passwordRef.current?.value || '';
        setError('');
        setSuccess('');
        const parsedData = signinSchema.safeParse({ username, password });
        if (!parsedData.success) {
            setError(parsedData.error.issues[0].message);
            return;
        }
        try {
            const res = await axios.post(BACKEND_URL + "api/v1/signin", {
                username,
                password
            }, {
                withCredentials: true
            });

            if (res.status === 200) {
                const {  message } = res.data;
                setSuccess(message || 'Signed in successfully!');
                navigate('/dashboard');
            }
        } catch (err: any) {
            if (err.response) {
                setError(err.response.data.message || 'Sign In failed.');
            } else {
                setError('An error occurred while signing in.');
            }
        }

    };
    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-md">
                <div className="p-8">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-800">Sign In to Your Account</h2>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Username
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    name="username"
                                    ref={usernameRef}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                                    placeholder="enter a username"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        ref={passwordRef}
                                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                                        placeholder="enter a password"
                                    />
                                    <button
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            <button
                                onClick={handleSignIn}
                                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                            >
                                Sign In
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="mt-6 text-center">
                            <button
                                onClick={() => navigate('/signup')}
                                className="text-emerald-600 hover:text-emerald-700 font-medium cursor-pointer"
                            >
                                Don't have an account? Sign up
                            </button>
                        </div>
                        {error.length > 0 && (
                            <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
                                {error}
                            </div>
                        )}
                    </div>

                    {success.length > 0 && (
                        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl mb-4">
                            {success}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
export default SignIn;