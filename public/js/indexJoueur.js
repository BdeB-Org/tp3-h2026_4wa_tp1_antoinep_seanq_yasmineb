requireAuth();

const form = document.getElementById('formAjout');
const tbody = document.getElementById('tbodyJoueur');
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
                    <a class="btn-link" href="/editJoueurs.html?id=${Joueur.Joueurs_id}">Modifier</a>
                    <button class="danger" onclick="supprimerJoueur(${Joueur.Joueurs_id})">Supprimer</button>
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

    const Nom = document.getElementById('Nom').value.trim();
    const Prénom = document.getElementById('Prénom').value.trim();
    const Pseudo = document.getElementById('Pseudo').value.trim();
    const Nbr_jeux_joues = document.getElementById('Nbr_jeux_joues').value.trim();

    try {
        const res = await apiFetch('/api/Joueur', {
            method: 'POST',
            body: JSON.stringify({ Nom, Prénom, Pseudo, Nbr_jeux_joues })
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Erreur lors de l\'ajout');
        }

        form.reset();
        showMessage('Joueur ajouté avec succès');
        chargerJoueurs();
    } catch (err) {
        showMessage(err.message, true);
    }
});

async function supprimerJoueur(Joueurs_id) {
    if (!confirm('Voulez-vous vraiment supprimer ce joueur?')) return;

    try {
        const res = await apiFetch('/api/Joueur/' + Joueurs_id, {
            method: 'DELETE'
        });

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