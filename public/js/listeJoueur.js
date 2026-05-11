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

async function chargerJoueurs() {
    try {
        const res = await apiFetch('/api/Joueur');
        const data = await res.json();

        tbody.innerHTML = '';

        data.forEach(Joueur => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${Joueur.Joueurs_id}</td>
                <td>${escapeHtml(Joueur.Nom)}</td>
                <td>${escapeHtml(Joueur.Prénom)}</td>
                <td>${escapeHtml(Joueur.Pseudo)}</td>
                <td>${escapeHtml(Joueur.Nbr_jeux_joues)}</td>
                <td>
                    <a class="btn-link" href="/editJoueur.html?id=${Joueur.Joueurs_id}">Modifier</a>
                    <button class="danger" onclick="supprimerJoueur(${Joueur.Joueurs_id})">Supprimer</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (err) {
        showMessage(err.message, true);
    }
}

async function supprimerJoueur(Joueur_id) {
    if (!confirm('Voulez-vous vraiment supprimer ce joueur?')) return;

    try {
        const res = await apiFetch('/api/Joueur/' + Joueur_id, { method: 'DELETE' });
        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Erreur lors de la suppression');
        }

        showMessage(data.message);
        chargerJoueurs();
    } catch (err) {
        showMessage(err.message, true);
    }
}

chargerJoueurs();
