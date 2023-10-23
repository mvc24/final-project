'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// incomplete!!!

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();

  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await fetch('api/login', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const data = response.json();
    console.log('Check: ', data);
  }
  if ('errors' in data) {
    setErrors(data.errors);
    return;
  }
  router.push(`/profile/${data.user.username}`);

  return (
    <div>
      <form onSubmit={async (event) => await handleRegister(event)}>
        <label>
          username
          <input onChange={(event) => setUsername(event.currentTarget.value)} />
        </label>
        <label>
          password
          <input
            type="password"
            onChange={(event) => setPassword(event.currentTarget.value)}
          />
        </label>
        <button>log in</button>
      </form>
    </div>
  );
}
