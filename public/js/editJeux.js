requireAuth();

const form = document.getElementById('formEdit');
const message = document.getElementById('message');
const params = new URLSearchParams(window.location.search);
const id = params.get('id');

function showMessage(text, isError = false) {
    message.innerHTML = `<div class="message ${isError ? 'error' : ''}">${text}</div>`;
}

async function chargerJeux() {
    try {
        const res = await apiFetch('/api/Jeux/' + id);
        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Erreur lors du chargement');
        }

        document.getElementById('Jeux_nom').value = data.Jeux_nom;
        document.getElementById('Jeux_note').value = data.Jeux_note;
    } catch (err) {
        showMessage(err.message, true);
    }
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const Jeux_nom = document.getElementById('Jeux_nom').value.trim();
    const Jeux_note = document.getElementById('Jeux_note').value.trim();

    try {
        const res = await apiFetch('/api/Jeux/' + id, {
            method: 'PUT',
            body: JSON.stringify({ Jeux_nom, Jeux_note })
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Erreur lors de la modification');
        }

        showMessage(data.message);
        setTimeout(() => {
            window.location.href = '/listeJeux.html';
        }, 800);
    } catch (err) {
        showMessage(err.message, true);
    }
});

if (!id) {
    showMessage('ID jeux manquant', true);
} else {
    chargerJeux();
}
