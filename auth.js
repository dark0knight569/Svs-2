// auth.js
function getCurrentUserEmail() {
    return localStorage.getItem('currentUserEmail');
}

function getCurrentUserName() {
    return localStorage.getItem('userName');
}

function checkAuth() {
    const userEmail = getCurrentUserEmail();
    const userName = getCurrentUserName();
    const path = window.location.pathname;
    const isLoginPage = path.endsWith('login.html');
    const isIndexPage = path.endsWith('index.html') || path.endsWith('/');

    const isProtectedPage = path.endsWith('catalog.html') || 
                            path.endsWith('cart.html') || 
                            path.endsWith('checkout.html') || 
                            path.endsWith('order.html');

    if (isIndexPage) {
        return; // index.html handles its own redirect
    }

    if (isLoginPage) {
        if (userEmail) {
            window.location.href = 'home.html';
        }
        return;
    }

    if (!userEmail) {
        if (isProtectedPage) {
            window.location.href = 'login.html';
            return;
        }
        
        // If not protected but user is not logged in, change account icon to a login button
        document.addEventListener("DOMContentLoaded", () => {
            const accountIcons = Array.from(document.querySelectorAll('.material-symbols-outlined')).filter(icon => icon.textContent.trim() === 'account_circle');
            accountIcons.forEach(icon => {
                const btn = icon.parentElement;
                if (btn && btn.tagName === 'BUTTON' || btn && btn.tagName === 'A') {
                    btn.outerHTML = `
                        <button onclick="window.location.href='login.html'" class="flex items-center gap-2 text-primary hover:text-secondary transition-colors duration-300 active:scale-95 p-1 rounded-full border border-primary/20 hover:bg-primary/5 px-3">
                            <span class="material-symbols-outlined text-sm">login</span>
                            <span class="font-label-bold text-sm">Login</span>
                        </button>
                    `;
                }
            });
        });
    } else {
        document.addEventListener("DOMContentLoaded", () => {
            // Find account buttons and replace with user name
            const accountIcons = Array.from(document.querySelectorAll('.material-symbols-outlined')).filter(icon => icon.textContent.trim() === 'account_circle');
            
            accountIcons.forEach(icon => {
                const btn = icon.parentElement;
                if (btn && btn.tagName === 'BUTTON') {
                    btn.outerHTML = `
                        <div class="flex items-center gap-2">
                            <span class="font-label-bold text-label-bold text-primary capitalize">Hi, ${userName}</span>
                            <button onclick="logout()" class="text-on-surface-variant hover:text-error transition-colors duration-300 active:scale-95 p-1 rounded-full hover:bg-surface-variant/50 flex items-center" title="Logout">
                                <span class="material-symbols-outlined">logout</span>
                            </button>
                        </div>
                    `;
                }
            });
        });
    }
}

function logout() {
    localStorage.removeItem('currentUserEmail');
    localStorage.removeItem('userName');
    window.location.href = 'login.html';
}

checkAuth();
