requireAuth();

const form = document.getElementById('formEdit');
const message = document.getElementById('message');
const params = new URLSearchParams(window.location.search);
const id = params.get('id');

function showMessage(text, isError = false) {
    message.innerHTML = `<div class="message ${isError ? 'error' : ''}">${text}</div>`;
}

async function chargerJoueurs() {
    try {
        const res = await apiFetch('/api/Joueur/' + id);
        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Erreur lors du chargement');
        }

        document.getElementById('Nom').value = data.Nom;
        document.getElementById('Prénom').value = data.Prénom;
        document.getElementById('Pseudo').value = data.Pseudo;
        document.getElementById('Nbr_jeux_joues').value = data.Nbr_jeux_joues;
    } catch (err) {
        showMessage(err.message, true);
    }
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const Nom = document.getElementById('Nom').value.trim();
    const Prénom = document.getElementById('Prénom').value.trim();
    const Pseudo = document.getElementById('Pseudo').value.trim();
    const Nbr_jeux_joues = document.getElementById('Nbr_jeux_joues').value.trim();

    try {
        const res = await apiFetch('/api/Joueur/' + id, {
            method: 'PUT',
            body: JSON.stringify({ Nom, Prénom, Pseudo, Nbr_jeux_joues })
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Erreur lors de la modification');
        }

        showMessage(data.message);
        setTimeout(() => {
            window.location.href = '/listeJoueur.html';
        }, 800);
    } catch (err) {
        showMessage(err.message, true);
    }
});

if (!id) {
    showMessage('ID joueur manquant', true);
} else {
    chargerJoueurs();
}