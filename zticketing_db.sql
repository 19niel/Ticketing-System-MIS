-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 22, 2025 at 07:52 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `zticketing_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `attachments`
--

CREATE TABLE `attachments` (
  `attachment_id` int(11) NOT NULL,
  `ticket_id` int(11) NOT NULL,
  `message_id` int(11) DEFAULT NULL,
  `file_path` varchar(255) NOT NULL,
  `uploaded_by` int(11) NOT NULL,
  `uploaded_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`category_id`, `category_name`, `created_at`, `updated_at`) VALUES
(1, 'Hardware', '2025-12-22 03:13:17', '2025-12-22 03:13:17'),
(2, 'Software', '2025-12-22 03:13:17', '2025-12-22 03:13:17'),
(3, 'Network', '2025-12-22 03:13:17', '2025-12-22 03:13:17'),
(4, 'Account Access', '2025-12-22 03:13:17', '2025-12-22 03:13:17'),
(5, 'Other', '2025-12-22 03:13:17', '2025-12-22 03:13:17');

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
  `department_id` int(11) NOT NULL,
  `department_name` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`department_id`, `department_name`, `created_at`, `updated_at`) VALUES
(1, 'MIS', '2025-12-22 03:13:16', '2025-12-22 03:13:16'),
(2, 'HR', '2025-12-22 03:13:16', '2025-12-22 03:13:16'),
(3, 'Sales', '2025-12-22 03:13:16', '2025-12-22 03:13:16'),
(4, 'Finance', '2025-12-22 03:13:16', '2025-12-22 03:13:16'),
(5, 'Manager', '2025-12-22 03:13:16', '2025-12-22 03:13:16'),
(6, 'FSD', '2025-12-22 03:25:04', '2025-12-22 03:25:04');

-- --------------------------------------------------------

--
-- Table structure for table `priorities`
--

CREATE TABLE `priorities` (
  `priority_id` int(11) NOT NULL,
  `priority_name` varchar(50) NOT NULL,
  `sla_hours` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `priorities`
--

INSERT INTO `priorities` (`priority_id`, `priority_name`, `sla_hours`, `created_at`, `updated_at`) VALUES
(1, 'Low', 72, '2025-12-22 03:13:17', '2025-12-22 03:13:17'),
(2, 'Medium', 48, '2025-12-22 03:13:17', '2025-12-22 03:13:17'),
(3, 'High', 24, '2025-12-22 03:13:17', '2025-12-22 03:13:17'),
(4, 'Critical', 4, '2025-12-22 03:13:17', '2025-12-22 03:13:17'),
(5, 'Emergency', 1, '2025-12-22 03:13:17', '2025-12-22 03:13:17');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `role_id` int(11) NOT NULL,
  `role_name` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`role_id`, `role_name`, `created_at`, `updated_at`) VALUES
(1, 'admin', '2025-12-22 03:13:16', '2025-12-22 03:13:16'),
(2, 'tech_support', '2025-12-22 03:13:16', '2025-12-22 03:13:16'),
(3, 'employee', '2025-12-22 03:13:16', '2025-12-22 03:13:16');

-- --------------------------------------------------------

--
-- Table structure for table `tickets`
--

CREATE TABLE `tickets` (
  `ticket_id` int(11) NOT NULL,
  `ticket_number` varchar(30) NOT NULL,
  `created_by` int(11) NOT NULL,
  `assigned_to` int(11) DEFAULT NULL,
  `category_id` int(11) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `status_id` int(11) NOT NULL,
  `priority_id` int(11) NOT NULL,
  `closed_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ticket_history`
--

CREATE TABLE `ticket_history` (
  `history_id` int(11) NOT NULL,
  `ticket_id` int(11) NOT NULL,
  `changed_by` int(11) NOT NULL,
  `old_status_id` int(11) NOT NULL,
  `new_status_id` int(11) NOT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  `changed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ticket_messages`
--

CREATE TABLE `ticket_messages` (
  `message_id` int(11) NOT NULL,
  `ticket_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `parent_message_id` int(11) DEFAULT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ticket_status`
--

CREATE TABLE `ticket_status` (
  `status_id` int(11) NOT NULL,
  `status_name` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ticket_status`
--

INSERT INTO `ticket_status` (`status_id`, `status_name`, `created_at`, `updated_at`) VALUES
(1, 'Open', '2025-12-22 03:13:16', '2025-12-22 03:13:16'),
(2, 'In Progress', '2025-12-22 03:13:16', '2025-12-22 03:13:16'),
(3, 'On Hold', '2025-12-22 03:13:16', '2025-12-22 03:13:16'),
(4, 'Resolved', '2025-12-22 03:13:16', '2025-12-22 03:13:16'),
(5, 'Closed', '2025-12-22 03:13:16', '2025-12-22 03:13:16');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `employee_id` varchar(50) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `position` varchar(250) NOT NULL,
  `department_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `employee_id`, `first_name`, `last_name`, `position`, `department_id`, `role_id`, `email`, `password_hash`, `is_active`, `created_at`, `updated_at`) VALUES
(7, '02223325', 'Nathaniel', 'Talag', 'Programmer', 8, 1, 'admin@ubix.com.ph', '1234', 1, '2025-12-22 03:30:47', '2025-12-22 03:30:47'),
(8, '00000001', 'Tech', 'Support', 'IT Support', 8, 2, 'techsupport@ubix.com.ph', '1234', 1, '2025-12-22 03:30:47', '2025-12-22 03:30:47'),
(9, '00000002', 'Akahon', 'Ting', 'Accounting', 6, 3, 'accounting@ubix.com.ph', '1234', 1, '2025-12-22 03:30:47', '2025-12-22 03:30:47');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attachments`
--
ALTER TABLE `attachments`
  ADD PRIMARY KEY (`attachment_id`),
  ADD KEY `ticket_id` (`ticket_id`),
  ADD KEY `message_id` (`message_id`),
  ADD KEY `uploaded_by` (`uploaded_by`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`),
  ADD UNIQUE KEY `category_name` (`category_name`);

--
-- Indexes for table `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`department_id`),
  ADD UNIQUE KEY `department_name` (`department_name`);

--
-- Indexes for table `priorities`
--
ALTER TABLE `priorities`
  ADD PRIMARY KEY (`priority_id`),
  ADD UNIQUE KEY `priority_name` (`priority_name`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`role_id`),
  ADD UNIQUE KEY `role_name` (`role_name`);

--
-- Indexes for table `tickets`
--
ALTER TABLE `tickets`
  ADD PRIMARY KEY (`ticket_id`),
  ADD UNIQUE KEY `ticket_number` (`ticket_number`),
  ADD KEY `created_by` (`created_by`),
  ADD KEY `assigned_to` (`assigned_to`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `status_id` (`status_id`),
  ADD KEY `priority_id` (`priority_id`);

--
-- Indexes for table `ticket_history`
--
ALTER TABLE `ticket_history`
  ADD PRIMARY KEY (`history_id`),
  ADD KEY `ticket_id` (`ticket_id`),
  ADD KEY `changed_by` (`changed_by`),
  ADD KEY `old_status_id` (`old_status_id`),
  ADD KEY `new_status_id` (`new_status_id`);

--
-- Indexes for table `ticket_messages`
--
ALTER TABLE `ticket_messages`
  ADD PRIMARY KEY (`message_id`),
  ADD KEY `ticket_id` (`ticket_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `parent_message_id` (`parent_message_id`);

--
-- Indexes for table `ticket_status`
--
ALTER TABLE `ticket_status`
  ADD PRIMARY KEY (`status_id`),
  ADD UNIQUE KEY `status_name` (`status_name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `employee_id` (`employee_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `department_id` (`department_id`),
  ADD KEY `role_id` (`role_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attachments`
--
ALTER TABLE `attachments`
  MODIFY `attachment_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `department_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `priorities`
--
ALTER TABLE `priorities`
  MODIFY `priority_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tickets`
--
ALTER TABLE `tickets`
  MODIFY `ticket_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ticket_history`
--
ALTER TABLE `ticket_history`
  MODIFY `history_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ticket_messages`
--
ALTER TABLE `ticket_messages`
  MODIFY `message_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ticket_status`
--
ALTER TABLE `ticket_status`
  MODIFY `status_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `attachments`
--
ALTER TABLE `attachments`
  ADD CONSTRAINT `attachments_ibfk_1` FOREIGN KEY (`ticket_id`) REFERENCES `tickets` (`ticket_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `attachments_ibfk_2` FOREIGN KEY (`message_id`) REFERENCES `ticket_messages` (`message_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `attachments_ibfk_3` FOREIGN KEY (`uploaded_by`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `tickets`
--
ALTER TABLE `tickets`
  ADD CONSTRAINT `tickets_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `tickets_ibfk_2` FOREIGN KEY (`assigned_to`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `tickets_ibfk_3` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`),
  ADD CONSTRAINT `tickets_ibfk_4` FOREIGN KEY (`status_id`) REFERENCES `ticket_status` (`status_id`),
  ADD CONSTRAINT `tickets_ibfk_5` FOREIGN KEY (`priority_id`) REFERENCES `priorities` (`priority_id`);

--
-- Constraints for table `ticket_history`
--
ALTER TABLE `ticket_history`
  ADD CONSTRAINT `ticket_history_ibfk_1` FOREIGN KEY (`ticket_id`) REFERENCES `tickets` (`ticket_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `ticket_history_ibfk_2` FOREIGN KEY (`changed_by`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `ticket_history_ibfk_3` FOREIGN KEY (`old_status_id`) REFERENCES `ticket_status` (`status_id`),
  ADD CONSTRAINT `ticket_history_ibfk_4` FOREIGN KEY (`new_status_id`) REFERENCES `ticket_status` (`status_id`);

--
-- Constraints for table `ticket_messages`
--
ALTER TABLE `ticket_messages`
  ADD CONSTRAINT `ticket_messages_ibfk_1` FOREIGN KEY (`ticket_id`) REFERENCES `tickets` (`ticket_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `ticket_messages_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `ticket_messages_ibfk_3` FOREIGN KEY (`parent_message_id`) REFERENCES `ticket_messages` (`message_id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`),
  ADD CONSTRAINT `users_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
