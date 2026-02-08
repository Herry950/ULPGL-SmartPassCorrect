/* jshint esversion: 6 */

/**
 * Génération du QR Code pour l'accès étudiant
 * Assurez-vous que la bibliothèque qrcode.js est chargée dans le HTML
 */
function genererMonQR() {
    // 1. Récupération avec vérification (trim pour éviter les espaces inutiles)
    var elMatricule = document.getElementById('matricule-input');
    var elSession = document.getElementById('session-type');
    var area = document.getElementById('qrcode-area');
    var status = document.getElementById('status-box');

    if (!elMatricule || !elSession || !area) {
        console.error("Éléments HTML manquants");
        return;
    }

    var mat = elMatricule.value.trim();
    var sess = elSession.value;

    if (mat === "") {
        alert("Attention : Le matricule est obligatoire !");
        elMatricule.focus();
        return;
    }

    // 2. Nettoyage de la zone
    area.innerHTML = "";
    status.innerText = "Génération en cours...";
    status.style.color = "#003366"; // Bleu ULPGL

    // 3. Construction de la donnée (Format pipe pour un scan facile)
    var texteFinal = "ULPGL|" + mat + "|" + sess + "|" + new Date().toLocaleDateString();

    // 4. Création du QR Code avec gestion d'erreur
    try {
        if (typeof QRCode === "undefined") {
            throw new Error("Bibliothèque QRCode non chargée");
        }

        new QRCode(area, {
            text: texteFinal,
            width: 250,
            height: 250,
            colorDark : "#003366", // Couleur officielle de ton app
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H // Haute tolérance aux erreurs
        });
        
        status.innerText = "✅ QR Code prêt pour le contrôle";
        status.style.color = "green";
    } catch (e) {
        status.innerText = "❌ Erreur technique de génération";
        status.style.color = "red";
        console.error(e);
    }
}