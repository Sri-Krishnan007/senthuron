document.getElementById('resetForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
  
    const res = await fetch('http://localhost:3000/reset-request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email })
    });
  
    const data = await res.json();
    document.getElementById('msg').innerText = data.message;
  });
  