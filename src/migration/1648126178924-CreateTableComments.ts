import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableComments1648126178924 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS Comments (
            id INT PRIMARY KEY AUTO_INCREMENT,
            text VARCHAR(250) NOT NULL,
            authorId INT NOT NULL,
            postId INT NOT NULL,
            likes INT DEFAULT 0,
            dislike INT DEFAULT 0,
            createdAt TIMESTAMP DEFAULT(UTC_TIMESTAMP()) NOT NULL,
            deletedAt TIMESTAMP,
            FOREIGN KEY (authorId) REFERENCES Users(id),
            FOREIGN KEY (postId) REFERENCES Posts(id)
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE IF EXISTS Comments
        `);
  }
}
