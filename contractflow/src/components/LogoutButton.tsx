import { logout } from "../app/actions/auth";

export function LogoutButton() {
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors"
    >
      Logout
    </button>
  );
}