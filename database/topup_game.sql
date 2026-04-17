-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Waktu pembuatan: 10 Apr 2026 pada 09.53
-- Versi server: 8.0.44
-- Versi PHP: 8.3.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Basis data: `topup_game`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `games`
--

CREATE TABLE `games` (
  `id` int NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `currency` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data untuk tabel `games`
--

INSERT INTO `games` (`id`, `name`, `image`, `currency`) VALUES
(1, 'Mobile Legends', 'ml.jpg', 'Diamond'),
(2, 'PUBG Mobile', 'pubg.jpg', 'UC'),
(3, 'Free Fire', 'ff.jpg', 'Diamond'),
(4, 'Genshin Impact', 'genshin.jpg', 'Genesis Crystal');

-- --------------------------------------------------------

--
-- Struktur dari tabel `orders`
--

CREATE TABLE `orders` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `package_id` int NOT NULL,
  `promo_id` int DEFAULT NULL,
  `account_game_id` varchar(100) NOT NULL,
  `status` enum('pending','success','failed') DEFAULT 'pending',
  `total_price` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data untuk tabel `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `package_id`, `promo_id`, `account_game_id`, `status`, `total_price`, `created_at`) VALUES
(2, 1, 8, NULL, '1111111', 'pending', NULL, '2026-03-13 22:17:17'),
(3, 1, 8, NULL, '1982911', 'pending', 25000, '2026-03-13 22:33:03'),
(4, 1, 8, 1, '011022911', 'pending', 25000, '2026-03-13 22:35:18'),
(5, 1, 10, NULL, '00981123993', 'pending', 75000, '2026-03-14 17:41:08'),
(6, 1, 2, NULL, '2348772829', 'pending', 40000, '2026-03-14 18:20:06'),
(7, 1, 10, NULL, '101010101', 'success', 75000, '2026-03-14 19:12:21'),
(8, 1, 1, NULL, '8888888', 'pending', 20000, '2026-03-18 18:47:33'),
(9, 1, 3, 1, '5278110', 'pending', 50000, '2026-03-18 19:11:35'),
(10, 1, 9, NULL, '129192772', 'success', 15000, '2026-03-18 19:27:09'),
(11, 1, 8, 1, '4445676655544', 'failed', 25000, '2026-03-18 19:30:54'),
(12, 2, 8, 1, '5555677778', 'success', 25000, '2026-03-18 19:45:19'),
(13, 2, 5, NULL, '565678', 'failed', 45000, '2026-03-18 19:46:30'),
(14, 3, 9, NULL, '1291827', 'success', 15000, '2026-03-26 13:03:11'),
(15, 4, 5, 1, '11112233', 'success', 35000, '2026-03-26 13:06:11');

-- --------------------------------------------------------

--
-- Struktur dari tabel `packages`
--

CREATE TABLE `packages` (
  `id` int NOT NULL,
  `game_id` int DEFAULT NULL,
  `amount` int DEFAULT NULL,
  `price` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data untuk tabel `packages`
--

INSERT INTO `packages` (`id`, `game_id`, `amount`, `price`) VALUES
(1, 1, 86, 20000),
(2, 1, 172, 40000),
(3, 1, 257, 60000),
(4, 2, 60, 15000),
(5, 2, 180, 45000),
(6, 2, 325, 75000),
(7, 3, 100, 12000),
(8, 3, 310, 35000),
(9, 4, 60, 15000),
(10, 4, 300, 75000);

-- --------------------------------------------------------

--
-- Struktur dari tabel `promos`
--

CREATE TABLE `promos` (
  `id` int NOT NULL,
  `promo_name` varchar(100) DEFAULT NULL,
  `promo_code` varchar(50) DEFAULT NULL,
  `discount_amount` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data untuk tabel `promos`
--

INSERT INTO `promos` (`id`, `promo_name`, `promo_code`, `discount_amount`, `created_at`) VALUES
(1, 'DISKON RAMADHAN', 'RAMADHAN2026', 10000, '2026-03-13 22:21:55');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `username` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('user','admin') DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `role`) VALUES
(1, 'dinda', 'dinda@mail.com', '$2b$10$OjBpgjsa4wIqGBfNR8n70uQyGuA06uP45i9pPgTBQxifA4ym2riXG', 'user'),
(2, 'adin', 'adin@gmail.com', '$2b$10$eXQsQ6FwoU2YQqQ8CkHhOe4awISvvXki7pj6XtAc6IWrwuqwnvyyi', 'user'),
(3, 'dienda', 'adindaac12@gmail.com', '$2b$10$3Ev1Li3qlAVM638Ty8roU.CinIRH3.Zdm2ajE5ZZ0OvPxADVvkhhO', 'user'),
(4, 'adstcz', 'kampung@gmail.com', '$2b$10$/QfsOSYG5u0j8DH.pLeLa.3Ra93R2.YPn5GHz7Po4o2RLD8M0sK1O', 'user');

--
-- Indeks untuk tabel yang dibuang
--

--
-- Indeks untuk tabel `games`
--
ALTER TABLE `games`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `package_id` (`package_id`),
  ADD KEY `promo_id` (`promo_id`);

--
-- Indeks untuk tabel `packages`
--
ALTER TABLE `packages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `game_id` (`game_id`);

--
-- Indeks untuk tabel `promos`
--
ALTER TABLE `promos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `promo_code` (`promo_code`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `games`
--
ALTER TABLE `games`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT untuk tabel `packages`
--
ALTER TABLE `packages`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT untuk tabel `promos`
--
ALTER TABLE `promos`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`package_id`) REFERENCES `packages` (`id`),
  ADD CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`promo_id`) REFERENCES `promos` (`id`);

--
-- Ketidakleluasaan untuk tabel `packages`
--
ALTER TABLE `packages`
  ADD CONSTRAINT `packages_ibfk_1` FOREIGN KEY (`game_id`) REFERENCES `games` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
