-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 29, 2024 at 01:23 AM
-- Server version: 10.6.17-MariaDB
-- PHP Version: 8.1.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sanjayso_ecom`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `number` int(250) NOT NULL,
  `product_id` varchar(500) NOT NULL,
  `costumer_email` varchar(500) NOT NULL,
  `total` varchar(500) NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `catagories`
--

CREATE TABLE `catagories` (
  `id` int(250) NOT NULL,
  `catagory_name` varchar(500) NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `link` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `catagories`
--

INSERT INTO `catagories` (`id`, `catagory_name`, `date`, `link`) VALUES
(1, 'Marbles', '2023-05-28 12:22:53', 'marbles');

-- --------------------------------------------------------

--
-- Table structure for table `contact`
--

CREATE TABLE `contact` (
  `id` int(250) NOT NULL,
  `name` varchar(500) NOT NULL,
  `email` varchar(500) NOT NULL,
  `phone` varchar(500) NOT NULL,
  `subject` varchar(500) NOT NULL,
  `message` varchar(500) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(250) NOT NULL,
  `email` varchar(500) NOT NULL,
  `product_id` varchar(500) NOT NULL,
  `total` varchar(500) NOT NULL,
  `status` varchar(500) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `email`, `product_id`, `total`, `status`, `date`) VALUES
(1, '1', '1', '1', '0', '2023-12-24 13:46:09');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(250) NOT NULL,
  `name` varchar(500) NOT NULL,
  `catagory` varchar(500) NOT NULL,
  `image` varchar(500) NOT NULL,
  `inStock` varchar(500) NOT NULL,
  `price` varchar(500) NOT NULL,
  `del` varchar(500) NOT NULL,
  `desc` longtext NOT NULL,
  `small` varchar(500) NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `catagory`, `image`, `inStock`, `price`, `del`, `desc`, `small`, `date`) VALUES
(1, 'Alabaster white', '1', '746728_1685276589005_a.jpg', '', '17899', '28999', '<table class=\"a-normal a-spacing-micro\">\r\n<tbody>\r\n<tr class=\"a-spacing-small po-brand\">\r\n<td class=\"a-span3\"><span class=\"a-size-base a-text-bold\">Brand</span></td>\r\n<td class=\"a-span9\"><span class=\"a-size-base po-break-word\">Vivo</span></td>\r\n</tr>\r\n<tr class=\"a-spacing-small po-model_name\">\r\n<td class=\"a-span3\"><span class=\"a-size-base a-text-bold\">Model Name</span></td>\r\n<td class=\"a-span9\"><span class=\"a-size-base po-break-word\">Vivo V23e 5G</span></td>\r\n</tr>\r\n<tr class=\"a-spacing-small po-wireless_provider\">\r\n<td class=\"a-span3\"><span class=\"a-size-base a-text-bold\">Network Service Provider</span></td>\r\n<td class=\"a-span9\"><span class=\"a-size-base po-break-word\">Total Wireless</span></td>\r\n</tr>\r\n<tr class=\"a-spacing-small po-operating_system\">\r\n<td class=\"a-span3\"><span class=\"a-size-base a-text-bold\">OS</span></td>\r\n<td class=\"a-span9\"><span class=\"a-size-base po-break-word\">Funtouch OS 12</span></td>\r\n</tr>\r\n<tr class=\"a-spacing-small po-cellular_technology\">\r\n<td class=\"a-span3\"><span class=\"a-size-base a-text-bold\">Cellular Technology</span></td>\r\n<td class=\"a-span9\"><span class=\"a-size-base po-break-word\">5G</span></td>\r\n</tr>\r\n<tr class=\"a-spacing-small po-memory_storage_capacity\">\r\n<td class=\"a-span3\"><span class=\"a-size-base a-text-bold\">Memory Storage Capacity</span></td>\r\n<td class=\"a-span9\"><span class=\"a-size-base po-break-word\">128 GB</span></td>\r\n</tr>\r\n<tr class=\"a-spacing-small po-connectivity_technology\">\r\n<td class=\"a-span3\"><span class=\"a-size-base a-text-bold\">Connectivity technologies</span></td>\r\n<td class=\"a-span9\"><span class=\"a-size-base po-break-word\">Wi-Fi</span></td>\r\n</tr>\r\n<tr class=\"a-spacing-small po-color\">\r\n<td class=\"a-span3\"><span class=\"a-size-base a-text-bold\">Color</span></td>\r\n<td class=\"a-span9\"><span class=\"a-size-base po-break-word\">Midnight Blue</span></td>\r\n</tr>\r\n<tr class=\"a-spacing-small po-display.size\">\r\n<td class=\"a-span3\"><span class=\"a-size-base a-text-bold\">Screen Size</span></td>\r\n<td class=\"a-span9\"><span class=\"a-size-base po-break-word\">6.44 Inches</span></td>\r\n</tr>\r\n<tr class=\"a-spacing-small po-wireless_network_technology\">\r\n<td class=\"a-span3\"><span class=\"a-size-base a-text-bold\">Wireless network technology</span></td>\r\n<td class=\"a-span9\"><span class=\"a-size-base po-break-word\">LTE</span></td>\r\n</tr>\r\n</tbody>\r\n</table>', 'Alabaster white', '2023-05-28 12:24:28');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(250) NOT NULL,
  `name` varchar(500) NOT NULL,
  `email` varchar(500) NOT NULL,
  `phone` varchar(500) NOT NULL,
  `password` varchar(500) NOT NULL,
  `address` varchar(500) NOT NULL,
  `pincode` varchar(500) NOT NULL,
  `city` varchar(500) NOT NULL,
  `state` varchar(500) NOT NULL,
  `verify` varchar(500) NOT NULL,
  `otp` varchar(500) NOT NULL,
  `type` varchar(500) NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `phone`, `password`, `address`, `pincode`, `city`, `state`, `verify`, `otp`, `type`, `date`) VALUES
(1, 'Sanjay Sokal', 'sokalsanjay@gmail.com', '8295673601', '1', 'Sanjay Sokal, Khairoli, Haryana', '123028', 'Mahendergarh', 'Haryana', '1', '11200', '1', '2023-05-28 12:20:48');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`number`);

--
-- Indexes for table `catagories`
--
ALTER TABLE `catagories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `number` int(250) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `catagories`
--
ALTER TABLE `catagories`
  MODIFY `id` int(250) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `contact`
--
ALTER TABLE `contact`
  MODIFY `id` int(250) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(250) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(250) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(250) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
