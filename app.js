/* jshint esversion: 6 */

function genererMonQR() {
    // 1. Récupération avec vérification
    var elMatricule = document.getElementById('matricule-input');
    var elSession = document.getElementById('session-type');
    var area = document.getElementById('qrcode-area');
    var status = document.getElementById('status-box');

    // On récupère les valeurs des champs (matricule et session concernee)
    var mat = elMatricule.value;
    var sess = elSession.value;

    if (mat === "") {
        alert("Attention : Le matricule est obligatoire !");
        return;
    }

    // 2. Nettoyage de la zone
    area.innerHTML = "";
    status.innerText = "Génération en cours...";
    status.style.color = "blue";

    // 3. Construction de la donnée (Version sécurisée sans backticks)
    var texteFinal = "ULPGL|" + mat + "|" + sess + "|" + Date.now();

    // 4. Création du QR Code
    try {
        new QRCode(area, {
            text: texteFinal,
            width: 250,
            height: 250,
            colorDark : "#003366",
            colorLight : "#ffffff"
        });
        status.innerText = "QR Code généré avec succès !";
        status.style.color = "green";
    } catch (e) {
        status.innerText = "Erreur : Bibliothèque manquante";
        status.style.color = "red";
    }
}