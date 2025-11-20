// Simple logout functionality
// Clears current user session and redirects to login page

const CURRENT_USER_KEY = 'cts_current_user';

function logout() {
    // Clear the current user from localStorage
    localStorage.removeItem(CURRENT_USER_KEY);
    
    // Redirect to login page
    window.location.href = 'Login Admin and Client.html';
}
