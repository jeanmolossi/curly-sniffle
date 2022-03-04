CREATE DATABASE IF NOT EXISTS todos;

USE todos;

CREATE TABLE IF NOT EXISTS todos (
  todo_id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255) NULL,
  board_index INT NULL,
  board_ref VARCHAR(255) NULL,
  PRIMARY KEY (todo_id)
);

CREATE TABLE IF NOT EXISTS comments (
	comment_id INT NOT NULL AUTO_INCREMENT,
	user_name VARCHAR(255) NOT NULL,
	user_photo VARCHAR(255) NULL,
	comment VARCHAR(255) NOT NULL,
	created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	todo_id INT NOT NULL,
	PRIMARY KEY (comment_id),
	FOREIGN KEY (todo_id) REFERENCES todos(todo_id)
);

CREATE TABLE IF NOT EXISTS categories (
	category_id INT NOT NULL AUTO_INCREMENT,
	label VARCHAR(255) NOT NULL,
	category_type VARCHAR(255) NOT NULL,
	PRIMARY KEY (category_id)
);

CREATE TABLE IF NOT EXISTS categoryTodo (
	category_id INT NOT NULL,
	todo_id INT NOT NULL,
	PRIMARY KEY (category_id, todo_id),
	FOREIGN KEY (category_id) REFERENCES categories(category_id),
	FOREIGN KEY (todo_id) REFERENCES todos(todo_id)
);
