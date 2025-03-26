DROP TABLE `solved_tasks`;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_attempts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`task_id` integer NOT NULL,
	`answer` text NOT NULL,
	`is_correct` integer NOT NULL,
	`attempt_at` integer DEFAULT (CURRENT_TIMESTAMP),
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`task_id`) REFERENCES `tasks`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_attempts`("id", "user_id", "task_id", "answer", "is_correct", "attempt_at") SELECT "id", "user_id", "task_id", "answer", "is_correct", "attempt_at" FROM `attempts`;--> statement-breakpoint
DROP TABLE `attempts`;--> statement-breakpoint
ALTER TABLE `__new_attempts` RENAME TO `attempts`;--> statement-breakpoint
PRAGMA foreign_keys=ON;

--> Prevent more than 6 solutions for a task
CREATE TRIGGER limit_attempts
    BEFORE INSERT ON attempts
    WHEN (SELECT COUNT(*) FROM attempts WHERE user_id = NEW.user_id AND task_id = NEW.task_id) >= 6
BEGIN
    SELECT RAISE(FAIL, 'Attempt limit reached');
END;
