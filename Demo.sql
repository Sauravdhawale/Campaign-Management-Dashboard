-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 20, 2025 at 07:42 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `arkentech_crm`
--

-- --------------------------------------------------------

--
-- Table structure for table `campaigns`
--

CREATE TABLE `campaigns` (
  `id` int(11) NOT NULL,
  `account_manager` varchar(100) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `project_id` varchar(100) DEFAULT NULL,
  `campaign_type` varchar(100) DEFAULT NULL,
  `campaign_name` varchar(100) DEFAULT NULL,
  `client_name` varchar(100) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `allocation` int(11) DEFAULT NULL,
  `leads_delivered` int(11) DEFAULT NULL,
  `leads_pending` int(11) DEFAULT NULL,
  `pacing` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `campaigns`
--

INSERT INTO `campaigns` (`id`, `account_manager`, `status`, `project_id`, `campaign_type`, `campaign_name`, `client_name`, `start_date`, `end_date`, `allocation`, `leads_delivered`, `leads_pending`, `pacing`) VALUES
(1, 'John Smith', 'Active', 'PRJ-001', 'Email Marketing', 'Q4 Product Launch', 'TechCorp Inc.', '2024-01-15', '2024-03-15', 50000, 1250, 350, 'On Track'),
(2, 'Sarah Johnson', 'Paused', 'PRJ-002', 'Social Media', 'Brand Awareness', 'Fashion Forward', '2024-02-01', '2024-04-01', 25000, 680, 120, 'Behind'),
(3, 'Mike Davis', 'Completed', 'PRJ-003', 'PPC', 'Holiday Sales', 'RetailMax', '2023-11-01', '2024-01-01', 75000, 2100, 0, 'Completed'),
(7, 'asdf', 'Paused', 'adf', 'Email Marketing', 'asdf', 'asdf', '2025-06-01', '2025-06-30', 1231, 12312, 123213, 'Completed'),
(8, 'Saurav Dhawale', 'Active', 'PRJ-007', 'SEO', 'Hero', 'Burzin sir', '2025-06-01', '2025-06-25', 20000, 200, 10000, 'On Track');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('Admin','User') DEFAULT 'User'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`) VALUES
(2, 'saruavdhawale', 'sauravdhawale942063@gmail.com', 'admin123', 'Admin'),
(4, 'Burzin sir', 'burzin.cooper@arkentechsolutions.com', '12435678', 'Admin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `campaigns`
--
ALTER TABLE `campaigns`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `campaigns`
--
ALTER TABLE `campaigns`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
