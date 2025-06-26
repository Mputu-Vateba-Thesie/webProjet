
<?php
// get_cart.php
session_start();
$panier = $_SESSION['panier'] ?? [];
$resultat = [];
foreach ($panier as $item) {
    $item['sous_total'] = $item['prix'] * $item['quantite'];
    $resultat[] = $item;
}
echo json_encode($resultat);
?>