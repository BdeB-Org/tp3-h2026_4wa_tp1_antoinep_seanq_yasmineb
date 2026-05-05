requireAuth();

const tbody = document.getElementById('tbodyListe');
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
                <td>${Commentaire.Commentaire_id}</td>
                <td>${escapeHtml(Commentaire.Joueurs_id)}</td>
                <td>${escapeHtml(Commentaire.Console_type)}</td>
                <td>${escapeHtml(Commentaire.Plateforme_nom)}</td>
                <td>${escapeHtml(Commentaire.Commentaire_jeu)}</td>
                <td>
                    <a class="btn-link" href="/editCommentaires.html?id=${Commentaire.Commentaire_id}">Modifier</a>
                    <button class="danger" onclick="supprimerCommentaire(${Commentaire.Commentaire_id})">Supprimer</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (err) {
        showMessage(err.message, true);
    }
}

async function supprimerCommentaire(Commentaire_id) {
    if (!confirm('Voulez-vous vraiment supprimer ce commentaire?')) return;

    try {
        const res = await apiFetch('/api/Commentaire/' + Commentaire_id, { method: 'DELETE' });
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
