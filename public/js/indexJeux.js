requireAuth();

const form = document.getElementById('formAjout');
const tbody = document.getElementById('tbodyJeux');
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

async function chargerJeux() {
    try {
        const res = await apiFetch('/api/Jeux');
        const data = await res.json();

        tbody.innerHTML = '';

        data.forEach(Jeux => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${Jeux.Jeux_id}</td>
                <td>${escapeHtml(Jeux.Jeux_nom)}</td>
                <td>${escapeHtml(Jeux.Jeux_note)}</td>
                <td>
                    <a class="btn-link" href="/editJeux.html?id=${Jeux.Jeux_id}">Modifier</a>
                    <button class="danger" onclick="supprimerJeu(${Jeux.Jeux_id})">Supprimer</button>
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

    const Jeux_nom = document.getElementById('Jeux_nom').value.trim();
    const Jeux_note = document.getElementById('Jeux_note').value.trim();

    try {
        const res = await apiFetch('/api/Jeux/', {
            method: 'POST',
            body: JSON.stringify({ Jeux_nom, Jeux_note })
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Erreur lors de l\'ajout');
        }

        form.reset();
        showMessage('Jeux ajouté avec succès');
        chargerJeux();
    } catch (err) {
        showMessage(err.message, true);
    }
});

async function supprimerJeux(Jeux_id) {
    if (!confirm('Voulez-vous vraiment supprimer ce jeu ?')) return;

    try {
        const res = await apiFetch('/api/Jeux/' + Jeux_id, {
            method: 'DELETE'
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Erreur lors de la suppression');
        }

        showMessage(data.message);
        chargerJeux();
    } catch (err) {
        showMessage(err.message, true);
    }
}

chargerJeux();
