
<?php
// remove_from_cart.php
session_start();
$data = json_decode(file_get_contents("php://input"), true);
$id = intval($data['id']);
if (isset($_SESSION['panier'][$id])) {
    unset($_SESSION['panier'][$id]);
}
echo json_encode(['message' => 'Produit supprimé']);
?>