<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


// Connexion à la base de données MySQL
$host = 'localhost';
$dbname = 'techstore';
$user = 'root';
$pass = '';

// Connexion PDO
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Erreur de connexion à la base de données : " . $e->getMessage());
}

// Vérifie si les données du panier ont été envoyées
if (isset($_POST['orderData'])) {
    $orderData = json_decode($_POST['orderData'], true);

    if (is_array($orderData)) {
        $stmt = $pdo->prepare("INSERT INTO commandes (nom, prix, quantite, total, image, date_commande) VALUES (?, ?, ?, ?, ?, NOW())");

        foreach ($orderData as $produit) {
            $nom = $produit['nom'];
            $prix = floatval($produit['prix']);
            $quantite = intval($produit['quantite']);
            $total = $prix * $quantite;
            $image = $produit['image'];

            $stmt->execute([$nom, $prix, $quantite, $total, $image]);
        }

        $success = true;
    } else {
        $error = "Les données du panier sont invalides.";
    }
} else {
    $error = "Aucune donnée de commande reçue.";
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Validation du Paiement</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <!-- Bootstrap 5 CDN -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">

  <style>
    body {
      background-color: #f8f9fa;
    }
    .success-box, .error-box {
      margin-top: 80px;
    }
  </style>
</head>
<body>

<div class="container text-center success-box">
    <?php if (isset($success) && $success): ?>
        <div class="alert alert-success shadow">
            <h2><i class="fas fa-check-circle me-2"></i>Merci de votre confiance !</h2>
            <p class="lead">Votre paiement a été effectué avec succès.</p>
            <a href="../index.html" class="btn btn-primary mt-3"><i class="fas fa-arrow-left"></i> Retour à l'accueil</a>
        </div>
        <script>
            // Nettoyage du panier localStorage
            localStorage.removeItem('panier');
        </script>
    <?php else: ?>
        <div class="alert alert-danger error-box shadow">
            <h2><i class="fas fa-exclamation-triangle me-2"></i>Erreur lors de la commande</h2>
            <p><?= htmlspecialchars($error) ?></p>
            <a href="../index.html" class="btn btn-secondary mt-3"><i class="fas fa-arrow-left"></i> Retour</a>
        </div>
    <?php endif; ?>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
<script src="../js/JavaScript.js"></script>
</body>
</html>
