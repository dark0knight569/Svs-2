// auth.js
function checkAuth() {
    const userName = localStorage.getItem('userName');
    const path = window.location.pathname;
    const isLoginPage = path.endsWith('login.html');
    const isIndexPage = path.endsWith('index.html') || path.endsWith('/');

    if (isIndexPage) {
        return; // index.html handles its own redirect
    }

    if (isLoginPage) {
        if (userName) {
            window.location.href = 'home.html';
        }
        return;
    }

    if (!userName) {
        window.location.href = 'login.html';
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
    localStorage.removeItem('userName');
    window.location.href = 'login.html';
}

checkAuth();
