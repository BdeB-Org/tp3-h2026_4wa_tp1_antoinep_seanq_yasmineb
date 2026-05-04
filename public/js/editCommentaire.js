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

        document.getElementById('console').value = data.Console_type;
        document.getElementById('plateforme').value = data.Plateforme_nom;
        document.getElementById('commentaire').value = data.Commentaire_jeu;
    } catch (err) {
        showMessage(err.message, true);
    }
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const console = document.getElementById('console').value.trim();
    const plateforme = document.getElementById('plateforme').value.trim();
    const commentaire = document.getElementById('commentaire').value.trim();

    try {
        const res = await apiFetch('/api/Commentaire/' + Joueurs_id, {
            method: 'PUT',
            body: JSON.stringify({ console, plateforme, commentaire })
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Erreur lors de la modification');
        }

        showMessage(data.message);
        setTimeout(() => {
            window.location.href = '/liste.html';
        }, 800);
    } catch (err) {
        showMessage(err.message, true);
    }
});

if (!id) {
    showMessage('ID joueur manquant', true);
} else {
    chargerCommentaires();
}
