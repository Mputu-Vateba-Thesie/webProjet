<?php
session_start();
require 'db.php';
$data = json_decode(file_get_contents('php://input'), true);
$id = intval($data['id']);

$stmt = $pdo->prepare("SELECT * FROM produits WHERE id = ?");
$stmt->execute([$id]);
$produit = $stmt->fetch();

if (!$produit) {
    echo json_encode(['message' => 'Produit introuvable']);
    exit();
}

if (!isset($_SESSION['panier'])) $_SESSION['panier'] = [];
if (isset($_SESSION['panier'][$id])) {
    $_SESSION['panier'][$id]['quantite'] += 1;
} else {
    $_SESSION['panier'][$id] = [
        'id' => $produit['id'],
        'nom' => $produit['nom'],
        'prix' => $produit['prix'],
        'quantite' => 1
    ];
}

echo json_encode(['message' => 'Produit ajouté au panier']);
?>