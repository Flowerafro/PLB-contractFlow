import { logout } from "../app/actions/auth";

export function LogoutButton() {
  const handleLogout = async () => {
    try {
      const result = await logout();
      
      // Clear localStorage
      if (result.clearSession) {
        localStorage.removeItem('user_session');
      }
      
      // Clear cookie
      if (result.clearCookie) {
        document.cookie = result.clearCookie;
      }
      
      // Redirect
      if (result.redirect) {
        window.location.href = result.redirect;
      }
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