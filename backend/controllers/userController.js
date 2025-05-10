import client from "../db.js";

// Function to get all users in a array
export async function getAllUsers(req, res) {
  try {
    const { rows: users } = await client.query(`select * from users`);
    return res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

// Function to get one user as an object
export async function getUserById(req, res) {
  const { userId } = req.params;

  try {
    // Checkting if the user exists with that id
    const { rows: user } = await client.query(
      `select * from users where id = $1`,
      [userId]
    );

    if (!user[0]) {
      res.status(404).json({ error: "User is not found" });
    } else {
      res.json(user[0]);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

// Function to add a new user to the database
export async function addNewUser(req, res) {
  const { name, email, age } = req.body;

  try {
    // Checkting if the user does not exists with that email
    const { rows: userByEmail } = await client.query(
      `select * from users where email = $1`,
      [email]
    );

    if (userByEmail[0]) {
      res.status(400).json({ error: "User with this email already exists" });
    } else {
      const { rows: newUser } = await client.query(
        `insert into users (name, email, age) values ($1, $2, $3) returning users`,
        [name, email, age]
      );

      return res.json(newUser[0]);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

// Function to udate the information of an existing user
export async function updateUser(req, res) {
  const { userId } = req.params;
  const { name, email, age } = req.body;

  try {
    // Checkting if the user exists with that id
    const { rows: existingUser } = await client.query(
      `select * from users where id = $1`,
      [userId]
    );

    if (!existingUser[0]) {
      res.status(404).json({ error: "User is not found" });
    } else {
      // Checkting if the user does not exists with that email if any user has a different id
      const { rows: userByEmail } = await client.query(
        `select * from users where email = $1 and id != $2`,
        [email, userId]
      );

      if (userByEmail[0]) {
        res.status(400).json({ error: "User with this email already exists" });
      } else {
        const { rows: updatedUser } = await client.query(
          `update users set name = $1, email = $2, age = $3 where id = $4 returning users`,
          [name, email, age, userId]
        );
        return res.json(updatedUser[0]);
      }
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

// Function for deleting an existing user from the database
export async function deleteUser(req, res) {
  const { userId } = req.params;

  try {
    // Checkting if the user exists with that id
    const { rows: existingUser } = await client.query(
      `select * from users where id = $1`,
      [userId]
    );

    if (!existingUser[0]) {
      res.status(404).json({ error: "User is not found" });
    } else {
      const { rows: deletedUser } = await client.query(
        `delete from users where id = $1`,
        [userId]
      );
      return res.json(deletedUser[0]);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}
