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

async function chargerJeux() {
    try {
        const res = await apiFetch('/api/Jeux');
        const data = await res.json();

        tbody.innerHTML = '';

        data.forEach(Jeux => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${Jeux.Jeux_id}</td>
                <td>${escapeHtml(Jeux.nom)}</td>
                <td>${escapeHtml(Jeux.note)}</td>
                <td>
                    <a class="btn-link" href="/edit.html?id=${Jeux.Jeux_id}">Modifier</a>
                    <button class="danger" onclick="supprimerJeux(${Jeux.Jeux_id})">Supprimer</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (err) {
        showMessage(err.message, true);
    }
}

async function supprimerJeux(Jeux_id) {
    if (!confirm('Voulez-vous vraiment supprimer ce jeux ?')) return;

    try {
        const res = await apiFetch('/api/Jeux/' + Jeux_id, { method: 'DELETE' });
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
