document.getElementById('loginForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const msgBox = document.getElementById('msg');

  msgBox.classList.remove("text-danger", "text-success");
  msgBox.innerText = "";

  try {
    const res = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (data.success) {
      localStorage.setItem("userEmail", email); // ✅ Store email in localStorage

      msgBox.classList.add("text-success");
      msgBox.innerText = data.message || "Login successful! Redirecting...";
      setTimeout(() => {
        window.location.href = "main.html";
      }, 2000);
    } else {
      msgBox.classList.add("text-danger");
      msgBox.innerText = data.message || "Login failed.";
    }
  } catch (error) {
    msgBox.classList.add("text-danger");
    msgBox.innerText = "An error occurred. Please try again.";
    console.error("Login Error:", error);
  }
});
