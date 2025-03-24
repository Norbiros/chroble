CREATE TABLE `attempts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`solution_id` integer NOT NULL,
	`attempt_at` integer DEFAULT (CURRENT_TIMESTAMP),
	`answer` text NOT NULL,
	FOREIGN KEY (`solution_id`) REFERENCES `solved_tasks`(`id`) ON UPDATE no action ON DELETE no action
);
