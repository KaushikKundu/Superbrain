import React, { useState } from 'react';
import { User } from 'lucide-react';
import { BACKEND_URL } from '../config';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SignIn from './Signin';
import { SignUp } from './SignUp';
import z from "zod";

const signupSchema = z.object({
    username: z.string().min(3).max(10),
    password: z.string().min(4).max(10),
});
const signinSchema = z.object({
    username: z.string().min(3).max(10),
    password: z.string().min(4).max(10),
});
type User = {
    username: string;
    email: string;
    password: string;
};

type AuthMode = 'signin' | 'signup';

const AuthSystem: React.FC = () => {
    const [mode, setMode] = useState<AuthMode>('signin');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentUser, setCurrentUser] = useState<string>('');
    const navigate = useNavigate();

    const handleSignUp = async (username: string, password: string) => {
        setError('');
        setSuccess('');
        const parsedData = signupSchema.safeParse({ username, password });
        console.log(parsedData)
        if (!parsedData.success) {
            setError(parsedData.error.message);
            return;
        }
        try {
            const res = await axios.post(BACKEND_URL + "api/v1/signup", {
                username,
                password
            });

            if (res.status === 201) {
                setSuccess('User created successfully! Please sign in.');
                setMode('signin');
            }
        } catch (err: any) {
            if (err.response) {
                setError(err.response.data.message || 'Sign up failed.');
            } else {
                setError('An error occurred while signing up.');
            }
        }

    };

    const handleSignIn = async (username: string, password: string) => {
        setError('');
        setSuccess('');
        const parsedData = signinSchema.safeParse({ username, password });
        console.log(parsedData)
        if (!parsedData.success) {
            setError(parsedData.error.message);
            return;
        }
        try {
            const res = await axios.post(BACKEND_URL + "api/v1/signin", {
                username,
                password
            })
            if (res.status === 200) {
                setCurrentUser(username);
                setSuccess('Signed in successfully!');
                setIsAuthenticated(true);
                navigate("/dashboard");
            }
        } catch (error) {
            setError('An error occurred while signing in.');
            return;
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setCurrentUser('');
        setMode('signin');
        setError('');
        setSuccess('');
    };

    const handleSwitchMode = () => {
        setMode(mode === 'signin' ? 'signup' : 'signin');
        setError('');
        setSuccess('');
    };

    if (isAuthenticated) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md text-center">
                    <div className="mb-6">
                        <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full mx-auto flex items-center justify-center mb-4">
                            <User className="w-10 h-10 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome back!</h2>
                        <p className="text-gray-600">You're signed in as</p>
                        <p className="text-2xl font-semibold text-emerald-600 mt-2">{currentUser}</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                    >
                        Sign Out
                    </button>
                </div>
            </div>
        );
    }

    return mode === 'signin' ? (
        <SignIn
            onSignIn={handleSignIn}
            onSwitchMode={handleSwitchMode}
            error={error}
            success={success}
        />
    ) : (
        <SignUp
            onSignUp={handleSignUp}
            onSwitchMode={handleSwitchMode}
            error={error}
            success={success}
        />
    );
};

export default AuthSystem;