const form = document.querySelector("form")

form.addEventListener("submit",(e)=>{
    e.preventDefault()

    const username = form.username.value
    const password = form.password.value

    const authenticated = authentication(username,password)

    if(authenticated){
        window.location.href = "logout.html"
    }else{
        alert("wrong")
    }
})

// 

function authentication(username,password){
    if(username === "admin" && password === "password"){
        return true
    }else{
        return false
    }
}
class AuthManager {
    static instance;
  
    constructor() {
      if (AuthManager.instance) return AuthManager.instance;
      AuthManager.instance = this;
      this.accessToken = null;
      this.refreshToken = null;
    }
  
    async login(username, password) {
      try {
        const response = await fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });
  
        const data = await response.json();
        if (data.accessToken && data.refreshToken) {
          this.accessToken = data.accessToken;
          this.refreshToken = data.refreshToken;
  
          localStorage.setItem('accessToken', this.accessToken);
          localStorage.setItem('refreshToken', this.refreshToken);
  
          window.location.href = 'logout.html'; // Redirect to logout page after login
        } else {
          document.getElementById('errorMessage').innerText = 'Invalid credentials';
        }
      } catch (error) {
        console.error('Login failed:', error);
      }
    }
  
    getInstance() {
      return this;
    }
  }
  
  // Event listener for form submission
  document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const authManager = new AuthManager();
    authManager.login(username, password);
  });