document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');

    if (registerForm) {
        registerForm.addEventListener('submit', (event) => {
            event.preventDefault(); 

            const fullName = document.getElementById('fullName').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const agreeTerms = document.getElementById('agreeTerms').checked;

            
            if (!fullName || !email || !password || !confirmPassword) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }

            if (password !== confirmPassword) {
                alert('As senhas não coincidem!');
                return;
            }

            if (password.length < 6) { 
                alert('A senha deve ter pelo menos 6 caracteres.');
                return;
            }

            if (!agreeTerms) {
                alert('Você precisa concordar com os Termos de Serviço e Política de Privacidade.');
                return;
            }

            console.log('Dados do formulário de registro:', { fullName, email, password });
            alert('Validação front-end OK! Enviando para o backend (simulação)...');
        });
    }

    const googleSignUpButton = document.getElementById('googleSignUpButton');
    if (googleSignUpButton) {
        googleSignUpButton.addEventListener('click', () => {
            alert('Cadastro com Google a ser implementado com OAuth! (ver script_index.js para exemplo de chamada)');
        });
    }
});

function togglePasswordVisibility(inputId, iconId) {
    const passwordInput = document.getElementById(inputId);
    const icon = document.getElementById(iconId);
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}