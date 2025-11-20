// Externalized JS for Login Admin and Client page
// Moved from inline <script> in Login Admin and Client.html
// ---------- Simple localStorage user system ---------
const USERS_KEY = 'cts_users_v1';
const CURRENT_KEY = 'cts_current_user';

function getUsers(){
    try{ return JSON.parse(localStorage.getItem(USERS_KEY) || '[]'); }
    catch(e){ return []; }
}
function saveUsers(u){ localStorage.setItem(USERS_KEY, JSON.stringify(u)); }

function showAlert(message, type='success'){
    const a = document.getElementById('alert');
    if(!a) return;
    a.className = 'alert alert-' + type;
    a.textContent = message;
    a.classList.remove('d-none');
    setTimeout(()=> a.classList.add('d-none'), 4000);
}

function initDefaultAccounts(){
    const users = getUsers();
    // ensure default admin
    if(!users.some(u => u.email.toLowerCase() === 'admin@admin.com')){
        users.push({name:'Administrator', email:'admin@admin.com', password:'admin123', role:'admin'});
    }
    // demo client
    if(!users.some(u => u.email.toLowerCase() === 'client1@demo.com')){
        users.push({name:'Demo Client', email:'client1@demo.com', password:'password123', role:'client'});
    }
    saveUsers(users);
}

function fillDemo(email, password, role){
    const le = document.getElementById('loginEmail');
    const lp = document.getElementById('loginPassword');
    if(le) le.value = email;
    if(lp) lp.value = password;
    const el = document.querySelector(`input[name=loginRole][value=${role}]`);
    if(el) el.checked = true;
}

function handleSignup(e){
    e.preventDefault();
    const name = (document.getElementById('signupName') || {}).value || '';
    const email = ((document.getElementById('signupEmail') || {}).value || '').trim().toLowerCase();
    const password = (document.getElementById('signupPassword') || {}).value || '';
    if(!name || !email || !password) return showAlert('Please fill all fields','danger');
    const users = getUsers();
    if(users.some(u => u.email.toLowerCase() === email)) return showAlert('Email already exists', 'danger');
    users.push({name, email, password, role:'client'});
    saveUsers(users);
    showAlert('Account created — you can now sign in', 'success');
    // switch to login and prefill if UI exists
    const showLoginBtn = document.getElementById('showLoginBtn');
    if(showLoginBtn) showLoginBtn.click();
    const loginEmail = document.getElementById('loginEmail');
    if(loginEmail) loginEmail.value = email;
}

function handleLogin(e){
    e.preventDefault();
    const email = ((document.getElementById('loginEmail') || {}).value || '').trim().toLowerCase();
    const password = (document.getElementById('loginPassword') || {}).value || '';
    const selectedRole = (document.querySelector('input[name=loginRole]:checked') || {}).value;
    const users = getUsers();
    const user = users.find(u => u.email.toLowerCase() === email && u.password === password);
    if(!user) return showAlert('Invalid email or password', 'danger');
    if(user.role !== selectedRole) return showAlert('Selected role does not match account role', 'danger');
    // save current user
    localStorage.setItem(CURRENT_KEY, JSON.stringify(user));
    // Redirect clients to the client dashboard page
    if(user.role === 'client'){
        window.location.href = 'Client Dashboard.html';
        return;
    }
    // Redirect admins to the admin dashboard page
    if(user.role === 'admin'){
        window.location.href = 'AdminDashboard .html';
        return;
    }
    // fallback: show in-page dashboard if role is unexpected
    showDashboardFor(user);
}

function showDashboardFor(user){
    const loginView = document.getElementById('loginView');
    const signupView = document.getElementById('signupView');
    const alertEl = document.getElementById('alert');
    try{ if(loginView) loginView.classList.add('d-none'); }catch(e){}
    try{ if(signupView) signupView.classList.add('d-none'); }catch(e){}
    try{ if(alertEl) alertEl.classList.add('d-none'); }catch(e){}
    if(user.role === 'admin'){
        const adminPanel = document.getElementById('adminPanel');
        const clientPanel = document.getElementById('clientPanel');
        if(adminPanel) adminPanel.classList.remove('d-none');
        if(clientPanel) clientPanel.classList.add('d-none');
        const adminWelcome = document.getElementById('adminWelcome');
        if(adminWelcome) adminWelcome.textContent = `Hello ${user.name} (${user.email})`;
    } else {
        const clientPanel = document.getElementById('clientPanel');
        const adminPanel = document.getElementById('adminPanel');
        if(clientPanel) clientPanel.classList.remove('d-none');
        if(adminPanel) adminPanel.classList.add('d-none');
        const clientWelcome = document.getElementById('clientWelcome');
        if(clientWelcome) clientWelcome.textContent = `Hello ${user.name} — welcome to your client dashboard`;
    }
}

function logout(){
    localStorage.removeItem(CURRENT_KEY);
    const loginView = document.getElementById('loginView');
    const signupView = document.getElementById('signupView');
    const adminPanel = document.getElementById('adminPanel');
    const clientPanel = document.getElementById('clientPanel');
    if(loginView) loginView.classList.remove('d-none');
    if(signupView) signupView.classList.add('d-none');
    if(adminPanel) adminPanel.classList.add('d-none');
    if(clientPanel) clientPanel.classList.add('d-none');
    showAlert('Logged out', 'info');
}

// Attach UI handlers (safe to run when this script is loaded at end of body)
document.addEventListener('DOMContentLoaded', function(){
    const showSignupBtn = document.getElementById('showSignupBtn');
    const showLoginBtn = document.getElementById('showLoginBtn');
    if(showSignupBtn) showSignupBtn.addEventListener('click', ()=>{
        const signupView = document.getElementById('signupView');
        const loginView = document.getElementById('loginView');
        if(signupView) signupView.classList.remove('d-none');
        if(loginView) loginView.classList.add('d-none');
    });
    if(showLoginBtn) showLoginBtn.addEventListener('click', ()=>{
        const loginView = document.getElementById('loginView');
        const signupView = document.getElementById('signupView');
        if(loginView) loginView.classList.remove('d-none');
        if(signupView) signupView.classList.add('d-none');
    });

    const signupForm = document.getElementById('signupForm');
    const loginForm = document.getElementById('loginForm');
    if(signupForm) signupForm.addEventListener('submit', handleSignup);
    if(loginForm) loginForm.addEventListener('submit', handleLogin);

    // on load
    initDefaultAccounts();
    const current = localStorage.getItem(CURRENT_KEY);
    if(current){
        try{ showDashboardFor(JSON.parse(current)); }catch(e){ /* ignore */ }
    }
});
