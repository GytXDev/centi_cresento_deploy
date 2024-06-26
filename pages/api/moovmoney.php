<?php
// Fonction pour générer une chaîne alphanumérique aléatoire de longueur spécifiée
function generateRandomString($length = 6) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, strlen($characters) - 1)];
    }
    return $randomString;
}

$numero = isset($_POST["numero"]) ? $_POST["numero"] : '';
$amount = isset($_POST["amount"]) ? $_POST["amount"] : '';

// Générer une référence unique de 6 caractères
$reference = generateRandomString();

$url = 'https://gateway.singpay.ga/v1/64/paiement';

// Données de la requête
$data = array(
    'amount' => $amount,
    'reference' => $reference,
    'client_msisdn' => $numero,
    'portefeuille' => '661766093fbb7a1bd42da1b5',
    'disbursement' => '66350a3b14b1131d0c6160a3',
    'isTransfer' => true
);

// En-têtes de la requête
$headers = array(
    'accept: /',
    'x-client-id: 0d2ced90-5398-4f6f-a830-b72fe4caefd2',
    'x-client-secret: 85a8209452c1d5fbeefd6006b8d1105608bf0d61ba7d8d86c211811b752422d0',
    'x-wallet: 661766093fbb7a1bd42da1b5',
    'Content-Type: application/json'
);

// Configuration de cURL
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10); // Temps d'attente pour la connexion
curl_setopt($ch, CURLOPT_TIMEOUT, 30); // Temps d'attente total

// Exécution de la requête
$response = curl_exec($ch);

// Gestion des erreurs cURL
if ($response === false) {
    $error = curl_error($ch);
    echo "Erreur lors de l'exécution de la requête : " . $error;
    curl_close($ch);
    exit(); // Arrêter le script en cas d'erreur
}

// Fermeture de la session cURL
curl_close($ch);

// Traitement de la réponse
$response = json_decode($response, true);

if ($response !== null && isset($response['transaction']['reference'])) {
    $reference = $response['transaction']['id'];

    $maxAttempts = 5; // Nombre maximum de tentatives
    $attempt = 0;
    $status = null;

    do {
        // URL pour vérifier le statut de la transaction
        $statusUrl = "https://gateway.singpay.ga/v1/transaction/api/status/".$reference;

        // Configuration de cURL pour la vérification du statut
        $curl = curl_init($statusUrl);
        curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_CONNECTTIMEOUT, 10); // Temps d'attente pour la connexion
        curl_setopt($curl, CURLOPT_TIMEOUT, 30); // Temps d'attente total

        // Exécution de la requête de vérification du statut
        $statusResponse = curl_exec($curl);

        // Gestion des erreurs cURL
        if ($statusResponse === false) {
            $error = curl_error($curl);
            echo "Erreur lors de l'exécution de la requête de vérification du statut : " . $error;
            curl_close($curl);
            exit(); // Arrêter le script en cas d'erreur
        }

        // Fermeture de la session cURL
        curl_close($curl);

        // Traitement de la réponse de vérification du statut
        $statusResponse = json_decode($statusResponse, true);

        if ($statusResponse !== null && isset($statusResponse['status']['message'])) {
            $status = $statusResponse['status']['message'];
            break; // Sortir de la boucle si le statut est disponible
        }

        // Attendre quelques secondes avant de réessayer
        sleep(2); // Réduire le délai à 2 secondes

        $attempt++;
    } while ($attempt < $maxAttempts);

    if ($status !== null) {
        // Écrire la réponse JSON avec le message de statut
        header('X-PHP-Response-Message: ' . $status);
        $responseArray = array("status_message" => $status);
        echo json_encode($responseArray);
    } else {
        // Réponse lorsque le statut n'est pas disponible
        $responseArray = array("status_message" => "Impossible d'obtenir le statut de la transaction après plusieurs tentatives.");
        echo json_encode($responseArray);
    }
} else {
    // Réponse lorsque la référence de transaction n'est pas valide
    $responseArray = array("status_message" => "Réponse invalide ou référence non trouvée.");
    echo json_encode($responseArray);
}
?>
