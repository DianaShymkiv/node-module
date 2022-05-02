import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableChat1650631586121 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS Chat (
            id INT PRIMARY KEY AUTO_INCREMENT,
            message VARCHAR(250) NOT NULL,
            userId INT NOT NULL,
            likes INT DEFAULT(0),
            dislike INT DEFAULT(0),
            createdAt TIMESTAMP DEFAULT(UTC_TIMESTAMP()) NOT NULL,
            deletedAt TIMESTAMP,
            FOREIGN KEY (userId) REFERENCES Users(id)
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE IF EXISTS Chat
        `);
  }
}
