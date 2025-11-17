"use client"

import React, { useState } from 'react';
import { InputWLabelClient } from '../../components/InputWLabelClient';
import { InputWithLabelSubmitForm } from '../../components/InputWithLabelSubmitForm';
import Button from '../../components/Button';
import Logo from '../../components/Logo';
import Footer from '../../components/Footer';

interface LoginProps {
  onLogin?: () => void;
}

export function Login({ onLogin }: LoginProps) {
      const [username, setUsername] = useState('');
      const [password, setPassword] = useState('');
      const [error, setError] = useState<string | null>(null);
      const [isLoading, setIsLoading] = useState(false);

      const checkLogin = async (user: string, pass: string) => {
        await new Promise((r) => setTimeout(r, 400));
        return user === 'admin' && pass === 'admin';
      }

      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isLoading) return;
        setError(null);

        if(!username || !password) {
            setError('Please enter both username and password.');
            return;
        }

        setIsLoading(true);
       
        try {
          const isValid = true; // midlertidig: alltid godkjent

            /*const isValid = await checkLogin(username, password);
            if (!isValid) {
                setError("Invalid username or password")
                return;
            }
                */
            if (onLogin) {
                onLogin();
            } else {
                window.location.href = '/Home'; // suksessfull login sender til /Home
            }
        } catch (err) {
            console.error(err);
            setError('An error occurred during login. Please try again.');
        } finally {
            setUsername('');
            setPassword('');
            setIsLoading(false);
        }
    }

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

/* 

kodestyling inspirert av dette: https://flowbite.com/docs/components/forms/

Line kommenterer:

Koden over:

interface LoginProps { onLogin?: () => void;}
- Komponentet skal motta en 

await new Promise((r) => setTimeout(r, 400)); 
- denne simulerer kun en forsinkelse som kan oppstå ved en ekte nettverksforespørsel. Skal erstattes med ekte API-kall senere.

try: "kjør kode som kan feile"
if (onLogin) {onLogin();} else {window.location.href = '/';}
- window.location.href er brukt som en midlertidig løsning som omdirigerer brukeren til home etter vellykket passord/brukernavn sjekk.
catch: "håndter feilen"
finally: "kjør kode uansett om det feilet eller ikke"



Få Login til å fungere, endre i worker.tsx:

legg til:
import { Login } from "@/app/pages/Login";

endre render:
render(Document, [
    route("/", () => <Home />),
    route("/login", () => <Login />)
  ]),


Koden under:
Jeg lagde først koden under basert på login.tsx som Marius har lagt ut på sin github:
https://github.com/mariuswallin/hiof-2025-mobile/blob/main/lectures/l-13/app/login.tsx

men den krever at man installerer next-auth og bruker useAuth hooken som er laget der, så jeg lagde versjonen over som er litt enklere og kan endres senere når vi får installert Auth, Tailwind osv.. 
Han har også brukt egne UI-komponenter   View, Text,TextInput,TouchableOpacity,StyleSheet,ActivityIndicator som jeg ikke har brukt da det krever innstallasjon av react-native og react-native-web.

Her er koden jeg startet med:

"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/auth/AuthProvider';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login, isLoading } = useAuth();
    const router = useRouter();

    const handlelogin = async () => {
        if (!username || !password) {
            setError("Please enter both username and password.");
            return;
        }
        try {
            setError("");
            await login(username, password);
            router.replace("/");
        } catch (err) {
            setError("Login failed. Invalid username or password.");
        }
    }
    return (
        <section style={{ minHeight: '100vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', backgroundColor: '#1D391D' }}>
            <div style={{ position: 'relative', zIndex: 10, background: 'white', borderRadius: 12, boxShadow: '0 10px 30px rgba(0,0,0,0.2)', padding: 48, width: '100%', maxWidth: 420 }}>
                <h1 style={{ textAlign: 'center', marginBottom: 32, color: '#1E1E1E' }}>Login</h1>
                {error ? <div style={{ color: 'red', marginBottom: 16 }}>{error}</div> : null}
                <form onSubmit={handleLogin} style={{ display: 'grid', gap: 24 }}>
                    <div>
                        <label htmlFor={username} style={{ display: 'block', marginBottom: 8, color: '#1E1E1E' }}>User:</label>
                        <input id={username} type="text" placeholder="User name" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor={password} style={{ display: 'block', marginBottom: 8, color: '#1E1E1E' }}>Password:</label>
                        <input id={password} type="text" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                   <div>
                        <button type="submit" disabled={isLoading} style={{ width: '100%', backgroundColor: '#D6E897', color: '#1E1E1E', padding: 10, border: 'none', borderRadius: 6, cursor: isLoading ? 'not-allowed' : 'pointer', opacity: isLoading ? 0.8 : 1 }}> {isLoading ? 'Logging in..' : 'Login' }</button>
                    </div>
                </form>
            </div>
        </section>
)
}
 */

