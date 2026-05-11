requireAuth();

const form = document.getElementById('formEdit');
const message = document.getElementById('message');
const params = new URLSearchParams(window.location.search);
const id = params.get('id');

function showMessage(text, isError = false) {
    message.innerHTML = `<div class="message ${isError ? 'error' : ''}">${text}</div>`;
}

async function chargerCommentaires() {
    try {
        const res = await apiFetch('/api/Commentaire/' + id);
        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Erreur lors du chargement');
        }

        document.getElementById('Joueurs_id').value = data.Joueurs_id;
        document.getElementById('Console_type').value = data.Console_type;
        document.getElementById('Plateforme_nom').value = data.Plateforme_nom;
        document.getElementById('Commentaire_jeu').value = data.Commentaire_jeu;
    } catch (err) {
        showMessage(err.message, true);
    }
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const Joueurs_id = document.getElementById('Joueurs_id').value.trim();
    const Console_type = document.getElementById('Console_type').value.trim();
    const Plateforme_nom = document.getElementById('Plateforme_nom').value.trim();
    const Commentaire_jeu = document.getElementById('Commentaire_jeu').value.trim();

    try {
        const res = await apiFetch('/api/Commentaire/' + id, {
            method: 'PUT',
            body: JSON.stringify({ Joueurs_id, Console_type, Plateforme_nom, Commentaire_jeu })
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Erreur lors de la modification');
        }

        showMessage(data.message);
        setTimeout(() => {
            window.location.href = '/listeCommentaire.html';
        }, 800);
    } catch (err) {
        showMessage(err.message, true);
    }
});

if (!id) {
    showMessage('ID commentaire manquant', true);
} else {
    chargerCommentaires();
}
