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
                <td>${escapeHtml(Commentaire.Joueurs_id)}</td>
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

    const Joueurs_id = document.getElementById('Joueurs_id').value.trim();
    const Console_type = document.getElementById('Console_type').value.trim();
    const Plateforme_nom = document.getElementById('Plateforme_nom').value.trim();
    const Commentaire_jeu = document.getElementById('Commentaire_jeu').value.trim();

    try {
        const res = await apiFetch('/api/Commentaire', {
            method: 'POST',
            body: JSON.stringify({ Joueurs_id, Console_type, Plateforme_nom, Commentaire_jeu })
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
