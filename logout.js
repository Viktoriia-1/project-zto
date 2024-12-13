const logoutBtn = document.querySelector(".logout-btn")

logoutBtn.addEventListener("click",()=>{
    window.location.replace("login.html")
})
class AuthManager {
    static instance;
  
    constructor() {
      if (AuthManager.instance) return AuthManager.instance;
      AuthManager.instance = this;
      this.accessToken = localStorage.getItem('accessToken');
      this.refreshToken = localStorage.getItem('refreshToken');
    }
  
    async logout() {
      try {
        const response = await fetch('http://localhost:3000/logout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refreshToken: this.refreshToken }),
        });
  
        if (response.ok) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.location.href = 'login.html'; // Redirect back to login after logout
        } else {
          console.error('Logout failed');
        }
      } catch (error) {
        console.error('Logout error:', error);
      }
    }
  
    getInstance() {
      return this;
    }
  }
  
  // Log out after 1 minute
  setTimeout(() => {
    const authManager = new AuthManager();
    authManager.logout();
  }, 60000); // 1 minute = 60000 milliseconds