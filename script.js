document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const loginTabBtn = document.getElementById('loginTabBtn');
  const registerTabBtn = document.getElementById('registerTabBtn');
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const toast = document.getElementById('toast');

  const regPassword = document.getElementById('regPassword');
  const regConfirmPassword = document.getElementById('regConfirmPassword');
  const strengthBar = document.getElementById('strengthBar');
  const strengthText = document.getElementById('strengthText');
  const matchError = document.getElementById('matchError');

  const loginEmail = document.getElementById('loginEmail');
  const rememberMe = document.getElementById('rememberMe');

  // --- 1. Tab Switching ---
  loginTabBtn.addEventListener('click', () => switchTab('login'));
  registerTabBtn.addEventListener('click', () => switchTab('register'));

  function switchTab(tab) {
    if (tab === 'login') {
      loginTabBtn.classList.add('active');
      registerTabBtn.classList.remove('active');
      loginForm.classList.add('active');
      registerForm.classList.remove('active');
    } else {
      registerTabBtn.classList.add('active');
      loginTabBtn.classList.remove('active');
      registerForm.classList.add('active');
      loginForm.classList.remove('active');
    }
  }

  // --- 2. Password Visibility Toggle ---
  document.querySelectorAll('.toggle-password').forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-target');
      const input = document.getElementById(targetId);

      if (input.type === 'password') {
        input.type = 'text';
        button.textContent = 'Hide';
      } else {
        input.type = 'password';
        button.textContent = 'Show';
      }
    });
  });

  // --- 3. Password Strength Meter ---
  regPassword.addEventListener('input', () => {
    const val = regPassword.value;
    let score = 0;

    if (val.length >= 8) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;

    switch (score) {
      case 0:
        strengthBar.style.width = '0%';
        strengthText.textContent = 'Password strength';
        break;
      case 1:
        strengthBar.style.width = '25%';
        strengthBar.style.backgroundColor = 'var(--error-color)';
        strengthText.textContent = 'Weak';
        break;
      case 2:
      case 3:
        strengthBar.style.width = '60%';
        strengthBar.style.backgroundColor = 'var(--warning-color)';
        strengthText.textContent = 'Medium';
        break;
      case 4:
        strengthBar.style.width = '100%';
        strengthBar.style.backgroundColor = 'var(--success-color)';
        strengthText.textContent = 'Strong';
        break;
    }

    validatePasswordMatch();
  });

  // --- 4. Password Match Verification ---
  regConfirmPassword.addEventListener('input', validatePasswordMatch);

  function validatePasswordMatch() {
    if (!regConfirmPassword.value) {
      matchError.classList.add('hidden');
      return true;
    }

    if (regPassword.value !== regConfirmPassword.value) {
      matchError.classList.remove('hidden');
      return false;
    } else {
      matchError.classList.add('hidden');
      return true;
    }
  }

  // --- 5. Remember Me (LocalStorage) ---
  const savedEmail = localStorage.getItem('rememberedEmail');
  if (savedEmail) {
    loginEmail.value = savedEmail;
    rememberMe.checked = true;
  }

  // --- 6. Form Submissions with Simulated Async Calls ---
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!loginEmail.value || !document.getElementById('loginPassword').value) {
      showToast('Please fill in all fields', 'error');
      return;
    }

    if (rememberMe.checked) {
      localStorage.setItem('rememberedEmail', loginEmail.value);
    } else {
      localStorage.removeItem('rememberedEmail');
    }

    handleFormSubmit('loginSubmitBtn', 'Logged in successfully!');
  });

  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!validatePasswordMatch()) {
      showToast('Passwords do not match', 'error');
      return;
    }

    handleFormSubmit('regSubmitBtn', 'Account created successfully!');
  });

  // Helper: Loading Spinner & API Simulation
  function handleFormSubmit(btnId, successMsg) {
    const btn = document.getElementById(btnId);
    const textSpan = btn.querySelector('.btn-text');
    const spinner = btn.querySelector('.spinner');

    // Show Loading
    btn.disabled = true;
    textSpan.classList.add('hidden');
    spinner.classList.remove('hidden');

    // Simulate 1.5s delay
    setTimeout(() => {
      btn.disabled = false;
      textSpan.classList.remove('hidden');
      spinner.classList.add('hidden');
      showToast(successMsg, 'success');
    }, 1500);
  }

  // Helper: Toast Notifications
  function showToast(message, type) {
    toast.textContent = message;
    toast.className = `toast ${type}`;

    setTimeout(() => {
      toast.classList.add('hidden');
    }, 3000);
  }
});
console.log("Application Load Testing")
const abc = 12346789