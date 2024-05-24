-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3308
-- Généré le : mer. 22 mai 2024 à 03:48
-- Version du serveur : 10.4.28-MariaDB
-- Version de PHP : 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `2024ski`
--

-- --------------------------------------------------------

--
-- Structure de la table `chats`
--

CREATE TABLE `chats` (
  `id_chat` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `message` text NOT NULL,
  `timestamp` datetime NOT NULL,
  `audio` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `chats`
--

INSERT INTO `chats` (`id_chat`, `id_user`, `message`, `timestamp`, `audio`) VALUES
(1, 1, 'nsdnda', '0000-00-00 00:00:00', NULL),
(2, 1, 'sdasdsad', '0000-00-00 00:00:00', NULL),
(3, 1, 'cdcxzcz', '0000-00-00 00:00:00', NULL),
(4, 1, 'zxcxzzc', '0000-00-00 00:00:00', NULL),
(5, 14, 'zmdnmssdv', '0000-00-00 00:00:00', NULL),
(6, 1, 'oui ', '0000-00-00 00:00:00', NULL),
(7, 1, 'xczczc', '0000-00-00 00:00:00', NULL),
(8, 1, 'zcdzz', '0000-00-00 00:00:00', NULL),
(9, 1, 'czzxczx', '0000-00-00 00:00:00', NULL),
(10, 1, 'zcxczxc', '0000-00-00 00:00:00', NULL),
(11, 1, 'czxczx', '0000-00-00 00:00:00', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `commentaires_pistes`
--

CREATE TABLE `commentaires_pistes` (
  `id_commentaire` int(11) NOT NULL,
  `contenu` text NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_piste` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `commentaires_pistes`
--

INSERT INTO `commentaires_pistes` (`id_commentaire`, `contenu`, `id_user`, `id_piste`) VALUES
(15, 'vxxcvcbcb', 1, 6),
(16, 'cxvxxxc', 1, 5),
(17, 'xccxx', 1, 8),
(18, 'sdfsdfns', 14, 7),
(19, 'vxcxv', 14, 5),
(20, 'cxvxcvx', 14, 4),
(21, 'cx x ', 14, 8),
(22, 'bn bn', 14, 11),
(23, 'hfdjsfns', 14, 2),
(24, 'jghnhgghjvmj', 14, 1),
(25, 'jvghvhmnb', 14, 1),
(26, 'gjvhvhgh', 14, 17),
(27, 'xczzc', 14, 6),
(28, 'dsvv', 14, 11),
(29, 'fddss', 1, 10);

-- --------------------------------------------------------

--
-- Structure de la table `commentaires_remontees`
--

CREATE TABLE `commentaires_remontees` (
  `id_commentaire` int(11) NOT NULL,
  `contenu` text NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_remonte` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `commentaires_remontees`
--

INSERT INTO `commentaires_remontees` (`id_commentaire`, `contenu`, `id_user`, `id_remonte`) VALUES
(1, 'xcvxcx', 1, 4),
(2, 'dxvx', 14, 3),
(3, 'vdzv', 14, 3),
(4, 'dncxvx', 14, 6),
(5, 'zxczxcz', 1, 4),
(6, 'zxczc', 1, 4),
(7, 'zcxzcz', 14, 3),
(8, 'dsgsg', 14, 4),
(9, 'vdxxx', 14, 9),
(10, 'zxcxzz', 14, 4),
(11, 'bbb', 14, 9),
(12, 'czxxzc', 14, 3),
(13, 'h', 14, 1),
(14, 'xcvxv', 14, 5),
(15, 'xc cxc', 14, 6),
(16, 'zxczx', 14, 1),
(17, 'zxcxc', 14, 8);

-- --------------------------------------------------------

--
-- Structure de la table `itineraires`
--

CREATE TABLE `itineraires` (
  `id_itineraire` int(11) NOT NULL,
  `id_piste_depart` int(11) NOT NULL,
  `id_piste_arrivee` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `pistes`
--

CREATE TABLE `pistes` (
  `id_piste` int(11) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `couleur` varchar(50) NOT NULL,
  `etat` tinyint(1) NOT NULL COMMENT '0 pour fermée, 1 pour ouverte',
  `canon_a_neige` varchar(10) NOT NULL,
  `id_remonte` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `pistes`
--

INSERT INTO `pistes` (`id_piste`, `nom`, `couleur`, `etat`, `canon_a_neige`, `id_remonte`) VALUES
(1, 'La Draye', 'rouge', 0, 'non', 1),
(2, 'Les Sagnières', 'rouge', 0, 'non', 1),
(3, 'La Gerabio', 'bleu', 0, 'non', 1),
(4, 'L\'Inglin', 'bleu', 1, 'oui', 2),
(5, 'Le Grand Serre', 'bleu', 0, 'oui', 2),
(6, 'Barrigart', 'rouge', 0, 'non', 2),
(7, 'Pré Méan', 'rouge', 1, 'oui', 2),
(8, 'Le Forest', 'vert', 1, 'oui', 3),
(9, 'La Rouge Bouticari', 'rouge', 0, 'oui', 3),
(10, 'Bouticari Bleu', 'bleu', 1, 'oui', 12),
(11, 'Bouticari Vert', 'vert', 1, 'non', 12),
(12, 'Les Douzeaux', 'bleu', 1, 'oui', 6),
(13, 'L\'Arbre', 'bleu', 1, 'oui', 4),
(14, 'L\'Ousselat', 'rouge', 0, 'non', 2),
(15, 'Les Lampions', 'bleu', 0, 'oui', 5),
(16, 'La Mandarine', 'rouge', 1, 'non', 5),
(17, 'Le Gourq', 'bleu', 1, 'oui', 6),
(18, 'L\'Ecureuil', 'rouge', 1, 'non', 6),
(19, '5 du Chamois', 'bleu', 1, 'oui', 7),
(20, 'Lievre', 'noire', 1, 'non', 5),
(21, 'Le Tétras', 'noire', 1, 'non', 5),
(22, 'Les Casses', 'bleu', 1, 'oui', 8),
(23, 'Le Chamois', 'rouge', 1, 'oui', 7),
(24, 'Les Jockeys', 'rouge', 1, 'oui', 7),
(25, 'La Fronthery', 'vert', 1, 'oui', 12),
(26, 'Les Ramiers', 'vert', 1, 'oui', 9),
(27, 'Les Bambinos', 'vert', 1, 'oui', 10),
(28, 'Les Rhodos', 'bleu', 1, 'non', 11),
(29, 'Les Ribettes', 'bleu', 1, 'non', 11),
(30, 'Jonction Basse', 'vert', 1, 'non', 12);

-- --------------------------------------------------------

--
-- Structure de la table `remontees`
--

CREATE TABLE `remontees` (
  `id_remonte` int(11) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `type` varchar(50) NOT NULL,
  `etat` tinyint(1) NOT NULL COMMENT '0 pour fermée, 1 pour ouverte',
  `difficulte` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `remontees`
--

INSERT INTO `remontees` (`id_remonte`, `nom`, `type`, `etat`, `difficulte`) VALUES
(1, 'Le grand Serre', 'tire_fesse', 1, 'facile'),
(2, 'Les Cassettes', 'tele_siege', 0, 'facile'),
(3, 'Bouticari I', 'tire_fesse', 0, 'facile'),
(4, 'Ste Marie Madeleine', 'tire_fesse', 1, 'facile'),
(5, 'Le Beauregard I', 'tire_fesse', 0, 'difficile'),
(6, 'Le Beauregard II', 'tire_fesse', 0, 'facile'),
(7, 'La Burge', 'télé_siege', 0, 'facile'),
(8, 'Les Amoureux', 'tire_fesse', 0, 'facile'),
(9, 'La Troïka', 'tire_fesse', 1, 'facile'),
(10, 'Les torres', 'tire_fesse', 1, 'facile'),
(11, 'Le Moulin', 'tire_fesse', 1, 'facile'),
(12, 'Bouticari II', 'tire_fesse', 1, 'facile');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `name`) VALUES
(1, 'Pedro01', 'badr01@gmail.com', '$2a$10$ueOJWeCIKwCbkeQHXGSSneJZmOZ69.pTTdAkg3EDcOMlU6NphB/vm', 'badr01'),
(2, 'pedro100', 'badrmoussaoui100@gmail.com', '$2a$10$t..HuoGjeRVmv5Ax39pDF.YU4UpFbRJm9dOBJwTOP.uXQDCc/YEvS', 'badr100'),
(3, 'badr101', 'badr101@gmail.com', '$2a$10$Y8/fkLeK6i9lXoHrd4Mrneecf17DEgAhsx6IROwgK21zoWC2R/oye', 'Badr101'),
(4, '', '', '$2a$10$TqFxu9K2T/XuNxCnevo8LOrcRTiqatiJt7.zpULVpXK31xe9PlGxC', ''),
(5, 'badr.moussaoui', 'badr.moussaoui2@gmail.com', '$2a$10$FRjyXjIGYX2ZkUlUSRToNewwFobwP/XEFYul9UHMUwS8VzNBXzWwu', 'Badr Moussaoui'),
(6, 'sylouane', 'sylouane@gmail.com', '$2a$10$Al0W5R5e6WKp5O5F7mtyXuMxUtU5unCFMNfNYySZJFHPr.9ouLc/.', 'nehemie sylouane'),
(7, 'JDJD', 'DJDHJ@GMAIL.COM', '$2a$10$mumXSAfmtHWmQoZhbf0e4OQUsnz4eMPG2GPs2uUnVJPqkQxJP74cO', 'BADR'),
(8, 'Pedro1000', 'badr1000@gmail.com', '$2a$10$er9nnSPrqKFGmw7MNHkeOepctQXxLEU8fbpsJyMtuO5cUAIiE6Mdu', 'BADR'),
(10, 'Pedro15', 'badr15@gmail.com', '$2a$10$iH6IOtCmsiLlD//T0S4RPeM2fLkJrhVqEUBiWsZPNLiy9syg1SPgK', 'badr15'),
(11, 'Pedro00', 'badr@gmail.com', '$2a$10$B8o269zStoypPB3JpfvhQ.eRx2AhSa2LE66O/ViHCFXjUR1KdS2xK', 'Badr'),
(13, 'Pedro1100', 'badre@gmail.com', '$2a$10$u0faZmoSVuaYUXCpERz12OyAKUxrjxcXmreOnMztZymdAIGSjTiLi', 'Badr'),
(14, 'badr1', 'badr1@gmail.com', '$2a$10$7/v8/K/h1ewLpPdM3CPSWe.olFvh94Gfu6VIKlDTTTmD0otE2UtgC', 'badr'),
(15, 'badr2', 'badr2@gmail.com', '$2a$10$quwLt1a9dI1hqdYf7TzYluzqC/JGkmaXgVLFPkaJ5syrsNU3fuOj2', 'badr'),
(16, 'Pedro001', 'badr001@gmail.com', '$2a$10$pJ1tGEnJCsaiPsqRTlHV1emUERdeDrrTNelPl9klQSRJhZ5UbC23y', 'badr001');

-- --------------------------------------------------------

--
-- Structure de la table `user_piste`
--

CREATE TABLE `user_piste` (
  `id_piste` int(11) NOT NULL,
  `id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `user_remonte`
--

CREATE TABLE `user_remonte` (
  `id_remonte` int(11) NOT NULL,
  `id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `chats`
--
ALTER TABLE `chats`
  ADD PRIMARY KEY (`id_chat`),
  ADD KEY `id_user` (`id_user`);

--
-- Index pour la table `commentaires_pistes`
--
ALTER TABLE `commentaires_pistes`
  ADD PRIMARY KEY (`id_commentaire`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_piste` (`id_piste`);

--
-- Index pour la table `commentaires_remontees`
--
ALTER TABLE `commentaires_remontees`
  ADD PRIMARY KEY (`id_commentaire`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_remonte` (`id_remonte`);

--
-- Index pour la table `itineraires`
--
ALTER TABLE `itineraires`
  ADD PRIMARY KEY (`id_itineraire`),
  ADD KEY `id_piste_depart` (`id_piste_depart`),
  ADD KEY `id_piste_arrivee` (`id_piste_arrivee`);

--
-- Index pour la table `pistes`
--
ALTER TABLE `pistes`
  ADD PRIMARY KEY (`id_piste`),
  ADD KEY `id_remonte` (`id_remonte`);

--
-- Index pour la table `remontees`
--
ALTER TABLE `remontees`
  ADD PRIMARY KEY (`id_remonte`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Index pour la table `user_piste`
--
ALTER TABLE `user_piste`
  ADD PRIMARY KEY (`id_piste`,`id_user`),
  ADD KEY `id_user` (`id_user`);

--
-- Index pour la table `user_remonte`
--
ALTER TABLE `user_remonte`
  ADD PRIMARY KEY (`id_remonte`,`id_user`),
  ADD KEY `id_user` (`id_user`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `chats`
--
ALTER TABLE `chats`
  MODIFY `id_chat` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT pour la table `commentaires_pistes`
--
ALTER TABLE `commentaires_pistes`
  MODIFY `id_commentaire` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT pour la table `commentaires_remontees`
--
ALTER TABLE `commentaires_remontees`
  MODIFY `id_commentaire` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT pour la table `itineraires`
--
ALTER TABLE `itineraires`
  MODIFY `id_itineraire` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `pistes`
--
ALTER TABLE `pistes`
  MODIFY `id_piste` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT pour la table `remontees`
--
ALTER TABLE `remontees`
  MODIFY `id_remonte` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `chats`
--
ALTER TABLE `chats`
  ADD CONSTRAINT `chats_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `commentaires_pistes`
--
ALTER TABLE `commentaires_pistes`
  ADD CONSTRAINT `commentaires_pistes_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `commentaires_pistes_ibfk_2` FOREIGN KEY (`id_piste`) REFERENCES `pistes` (`id_piste`) ON DELETE CASCADE;

--
-- Contraintes pour la table `commentaires_remontees`
--
ALTER TABLE `commentaires_remontees`
  ADD CONSTRAINT `commentaires_remontees_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `commentaires_remontees_ibfk_2` FOREIGN KEY (`id_remonte`) REFERENCES `remontees` (`id_remonte`) ON DELETE CASCADE;

--
-- Contraintes pour la table `itineraires`
--
ALTER TABLE `itineraires`
  ADD CONSTRAINT `itineraires_ibfk_1` FOREIGN KEY (`id_piste_depart`) REFERENCES `pistes` (`id_piste`),
  ADD CONSTRAINT `itineraires_ibfk_2` FOREIGN KEY (`id_piste_arrivee`) REFERENCES `pistes` (`id_piste`);

--
-- Contraintes pour la table `pistes`
--
ALTER TABLE `pistes`
  ADD CONSTRAINT `pistes_ibfk_1` FOREIGN KEY (`id_remonte`) REFERENCES `remontees` (`id_remonte`) ON DELETE SET NULL;

--
-- Contraintes pour la table `user_piste`
--
ALTER TABLE `user_piste`
  ADD CONSTRAINT `user_piste_ibfk_1` FOREIGN KEY (`id_piste`) REFERENCES `pistes` (`id_piste`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_piste_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `user_remonte`
--
ALTER TABLE `user_remonte`
  ADD CONSTRAINT `user_remonte_ibfk_1` FOREIGN KEY (`id_remonte`) REFERENCES `remontees` (`id_remonte`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_remonte_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
