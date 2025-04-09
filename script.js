document.getElementById('resetForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const newPassword = document.getElementById('newPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const messageElement = document.getElementById('message');

  // Vérifier si les mots de passe correspondent
  if (newPassword !== confirmPassword) {
    messageElement.textContent = "Passwords do not match.";
    messageElement.style.color = "red";
    return;
  }

  // Extraire le token depuis l'URL
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');

  if (!token) {
    messageElement.textContent = "Invalid or expired reset link.";
    messageElement.style.color = "red";
    return;
  }

  try {
    // Envoyer le nouveau mot de passe et le token à l'API backend
    const response = await fetch('https://your-api-endpoint.com/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, newPassword }),
    });

    if (response.ok) {
      messageElement.textContent = "Password updated successfully!";
      messageElement.style.color = "green";
    } else {
      messageElement.textContent = "Failed to reset password. Please try again.";
      messageElement.style.color = "red";
    }
  } catch (error) {
    console.error(error);
    messageElement.textContent = "An error occurred while resetting the password.";
    messageElement.style.color = "red";
  }
});