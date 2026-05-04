requireAuth();

const form = document.getElementById('formAjout');
const tbody = document.getElementById('tbodyCommentaire');
const message = document.getElementById('message');

function showMessage(text, isError = false) {
    message.innerHTML = `<div class="message ${isError ? 'error' : ''}">${text}</div>`;
}

function escapeHtml(value) {
    return String(value)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
}

async function chargerCommentaires() {
    try {
        const res = await apiFetch('/api/Commentaire');
        const data = await res.json();

        tbody.innerHTML = '';

        data.forEach(Commentaire => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${Commentaire.Joueurs_id}</td>
                <td>${escapeHtml(Commentaire.Console_type)}</td>
                <td>${escapeHtml(Commentaire.Plateforme_nom)}</td>
                <td>${escapeHtml(Commentaire.Commentaire_jeu)}</td>
                <td>
                    <a class="btn-link" href="/edit.html?id=${Commentaire.Joueurs_id}">Modifier</a>
                    <button class="danger" onclick="supprimerCommentaire(${Commentaire.Joueurs_id})">Supprimer</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
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
        const res = await apiFetch('/api/etudiants', {
            method: 'POST',
            body: JSON.stringify({ console, plateforme, commentaire })
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Erreur lors de l\'ajout');
        }

        form.reset();
        showMessage('Commentaire ajouté avec succès');
        chargerCommentaires();
    } catch (err) {
        showMessage(err.message, true);
    }
});

async function supprimerCommentaire(Joueurs_id) {
    if (!confirm('Voulez-vous vraiment supprimer ce commentaire?')) return;

    try {
        const res = await apiFetch('/api/Commentaire/' + Joueurs_id, {
            method: 'DELETE'
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Erreur lors de la suppression');
        }

        showMessage(data.message);
        chargerCommentaires();
    } catch (err) {
        showMessage(err.message, true);
    }
}

chargerCommentaires();
