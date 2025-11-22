"use client"

import React, { useState } from 'react';
import { InputWLabelClient } from '../../components/InputWLabelClient';
import { InputWithLabelSubmitForm } from '../../components/InputWithLabelSubmitForm';
import Button from '../../components/Button';
import Logo from '../../components/Logo';
import Footer from '../../components/Footer';
import { login } from '../actions/auth';

interface LoginProps {
  onLogin?: () => void;
}

export function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    
    setError(null);
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);

      // Call server action
      const result = await login(formData);

      if (!result.success) {
        setError(result.error || 'Login failed');
        return;
      }

      // Success - handle session and redirect
      if (result.sessionData) {
        localStorage.setItem('user_session', result.sessionData);
      }
      
      // Set cookie for server-side authentication
      if (result.setCookie) {
        document.cookie = result.setCookie;
      }
      
      if (result.redirect) {
        window.location.href = result.redirect;
        return;
      }

      if (onLogin) {
        onLogin();
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred during login. Please try again.');
    } finally {
      setUsername('');
      setPassword('');
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden bg-[var(--primary-color)]">
      <div className="relative z-10 bg-white rounded-xl shadow-xl p-12 w-full max-w-sm">
        <h1 className="text-center mb-8 text-[#1E1E1E] text-2xl font-semibold">Login</h1>

        {error ? <div className="text-red-600 mb-4">{error}</div> : null}
        
        <form onSubmit={handleSubmit} className="grid gap-6 mt-6">
          <InputWithLabelSubmitForm value={username} onChange={(e) => setUsername(e.target.value)} id="username" label='User' name="username"/>
          <InputWithLabelSubmitForm label="Password" name="password" id="password" type="password"value={password} onChange={(e) => setPassword(e.target.value)}/>
          <div className='text-right mt-2'>
            <a href="#" className='opacity-60 text-[var(--text-color-gray)]'> Glemt passord? </a>
          </div>

          <div className='pt-4 flex justify-center'>
            <Button type='submit' disabled={isLoading} >Login</Button>
          </div>
        </form>

      </div>
      <Footer />
    </section>
  );
} 
