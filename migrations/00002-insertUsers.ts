import { Sql } from 'postgres';

const users = [
  {
    id: 1,
    username: 'user123',
    email: 'user123@example.com',
    passwordHash: 'password123',
  },
  {
    id: 2,
    username: 'john_doe',
    email: 'john.doe@example.com',
    passwordHash: 'doe@1234',
  },
  {
    id: 3,
    username: 'jane_smith',
    email: 'jane.smith@example.com',
    passwordHash: 'smithP@ss',
  },
  {
    id: 4,
    username: 'alice_wonderland',
    email: 'alice.wonderland@example.com',
    passwordHash: 'w0nd3rl@nd',
  },
  {
    id: 5,
    username: 'bob_marley',
    email: 'bob.marley@example.com',
    passwordHash: 'rasta123',
  },
];

export async function up(sql: Sql) {
  for (const user of users) {
    await sql`
    INSERT INTO users
      (username, password_hash, email)
    VALUES
      (${user.username}, ${user.passwordHash}, ${user.email})
    `;
  }
}

export async function down(sql: Sql) {
  for (const user of users) {
    await sql`
    DELETE FROM users WHERE id = ${user.id}
    `;
  }
}
