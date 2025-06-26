-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : jeu. 26 juin 2025 à 01:18
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `techstore`
--

-- --------------------------------------------------------

--
-- Structure de la table `commandes`
--

CREATE TABLE `commandes` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `prix` decimal(10,2) NOT NULL,
  `quantite` int(11) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `image` text DEFAULT NULL,
  `date_commande` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `commandes`
--

INSERT INTO `commandes` (`id`, `nom`, `prix`, `quantite`, `total`, `image`, `date_commande`) VALUES
(1, 'HP Laptop 15-fd0297', 800.00, 1, 800.00, 'http://localhost/zzzzz/images/Img3.jpg', '2025-06-23 21:50:15'),
(2, 'Samsung Galaxy Book Flex', 349.00, 1, 349.00, 'http://localhost/zzzzz/images/img%204.png', '2025-06-23 21:50:15'),
(3, 'Apple iMac 27\" écran Retina 5K', 1.30, 2, 2.60, 'http://localhost/zzzzz/images/img%20f%201.jpg', '2025-06-23 21:50:15'),
(4, 'Logitech Mx Key Mini Wireless Bluetooth Keybord-Black Target', 70.00, 1, 70.00, 'http://localhost/zzzzz/images/imgc-2.avif', '2025-06-23 21:52:37'),
(5, 'Souris Wi-Fi optique Logitech M175 noir', 12.00, 1, 12.00, 'http://localhost/zzzzz/images/imgsou2.jpg', '2025-06-23 21:52:37');

-- --------------------------------------------------------

--
-- Structure de la table `paniers`
--
-- Erreur de lecture de structure pour la table techstore.paniers : #1932 - Table 'techstore.paniers' doesn't exist in engine
-- Erreur de lecture des données pour la table techstore.paniers : #1064 - Erreur de syntaxe près de 'FROM `techstore`.`paniers`' à la ligne 1

-- --------------------------------------------------------

--
-- Structure de la table `panier_produits`
--
-- Erreur de lecture de structure pour la table techstore.panier_produits : #1932 - Table 'techstore.panier_produits' doesn't exist in engine
-- Erreur de lecture des données pour la table techstore.panier_produits : #1064 - Erreur de syntaxe près de 'FROM `techstore`.`panier_produits`' à la ligne 1

-- --------------------------------------------------------

--
-- Structure de la table `produits`
--
-- Erreur de lecture de structure pour la table techstore.produits : #1932 - Table 'techstore.produits' doesn't exist in engine
-- Erreur de lecture des données pour la table techstore.produits : #1064 - Erreur de syntaxe près de 'FROM `techstore`.`produits`' à la ligne 1

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `commandes`
--
ALTER TABLE `commandes`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `commandes`
--
ALTER TABLE `commandes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
