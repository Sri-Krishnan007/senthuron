window.onload = async () => {
    const email = localStorage.getItem("userEmail");
    if (!email) {
      alert("Not logged in!");
      window.location.href = "login.html";
      return;
    }
  
    try {
      const res = await fetch(`http://localhost:3000/profile?email=${encodeURIComponent(email)}`);
      const result = await res.json();
  
      if (result.success) {
        document.getElementById('name').value = result.data.name;
        document.getElementById('email').value = result.data.email;
      } else {
        alert("Failed to load profile.");
      }
    } catch (err) {
      console.error(err);
      alert("Error fetching profile.");
    }
  };
  
  function showSection(id) {
    document.querySelectorAll('.section').forEach(sec => sec.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
  }
  
  async function saveProfile() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    try {
      const res = await fetch('http://localhost:3000/update-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });
  
      const result = await res.json();
  
      if (result.success) {
        alert("Profile updated successfully!");
        document.getElementById('password').value = ''; // Clear password field
      } else {
        alert("Update failed: " + result.message);
      }
    } catch (err) {
      console.error(err);
      alert("Error updating profile.");
    }
  }
  
  function logout() {
    localStorage.clear();
    window.location.href = "login.html";
  }
  