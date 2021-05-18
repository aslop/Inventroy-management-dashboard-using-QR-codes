import { SyntheticEvent, useState } from 'react';
import { useAuth } from '../hooks';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleLogin = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      await login(email, password);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form
        className="flex flex-col bg-white shadow-lg w-full h-full p-10 rounded-md"
        onSubmit={handleLogin}
      >
        <div className="text-xl font-bold text-gray-800 mb-4">Login</div>
        <input
          className="my-2 p-2 px-3 rounded border-none bg-gray-100 focus:outline-none focus:ring focus:border-blue-200"
          type="email"
          placeholder="your@email.com"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          className="my-2 p-2 px-3 rounded border-none bg-gray-100 focus:outline-none focus:ring focus:border-blue-200"
          type="password"
          placeholder="s3cur3p4sSw0rd!"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button className="bg-green-400 text-white p-2 mt-4  rounded-sm" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};
