document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signupForm');
    const msgBox = document.getElementById('msg');
    const loginBtnContainer = document.getElementById('loginBtnContainer');
    const goToLoginBtn = document.getElementById('goToLoginBtn');
  
    if (!form) {
      console.error("Signup form not found.");
      return;
    }
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();
      const termsAccepted = document.getElementById('terms').checked;
  
      msgBox.innerText = "";
      msgBox.classList.remove("text-danger", "text-success");
      loginBtnContainer.style.display = "none";
  
      if (!termsAccepted) {
        msgBox.classList.add("text-danger");
        msgBox.innerText = "Please accept the terms and conditions.";
        return;
      }
  
      try {
        const res = await fetch('http://localhost:3000/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password }),
        });
  
        const data = await res.json();
        console.log(data);
  
        if (data.success) {
          msgBox.classList.add("text-success");
          msgBox.innerText = "Signup successful! You can now log in.";
  
          // Show login button
          loginBtnContainer.style.display = "block";
  
          // Optional: Redirect if clicked
          goToLoginBtn.addEventListener('click', () => {
            msgBox.innerText = "Redirecting to login...";
            setTimeout(() => {
              window.location.href = "login.html";
            }, 1000);
          });
  
        } else {
          msgBox.classList.add("text-danger");
          msgBox.innerText = data.message || "Signup failed.";
        }
      } catch (err) {
        console.error("Signup error:", err);
        msgBox.classList.add("text-danger");
        msgBox.innerText = "Server error. Please try again.";
      }
    });
  });
  