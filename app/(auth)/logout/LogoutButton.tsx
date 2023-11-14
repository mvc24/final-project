import React from 'react';
import { logout } from './actions';

export default function LogoutButton() {
  return (
    <div>
      <button
        formAction={logout}
        className="btn px-4 rounded-full btn-outline border-t-main-700 text-main-700 hover:bg-main-200 hover:text-main-700 hover:border-main-200 lowercase text-lg"
      >
        logout
      </button>
    </div>
  );
}
