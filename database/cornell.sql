USE edukation;

CREATE TABLE IF NOT EXISTS cornell(
    id INT PRIMARY KEY AUTO_INCREMENT,
    userId INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    resume TEXT NOT NULL,
    noteClass TEXT NOT NULL,
    FOREIGN KEY(userId) REFERENCES User(id) ON DELETE CASCADE ON UPDATE CASCADE
);

select * from cornell;