<?php
// clear_cart.php
session_start();
unset($_SESSION['panier']);
echo json_encode(['message' => 'Panier vidé']);
?>
