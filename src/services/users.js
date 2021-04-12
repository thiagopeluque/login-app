import db from "./sqlite";

db.transaction((tx) => {
  tx.executeSql(
    // "DROP TABLE users;"
    `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT,
      email TEXT,
      telefone TEXT,
      endereco TEXT,
      cidade TEXT,
      nascimento TEXT,
      sexo TEXT,
      cpf TEXT,
      usuario TEXT,
      password TEXT
    );`
  );
});

const create = (obj) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO users (nome, email, telefone, endereco, cidade, nascimento, sexo, cpf, usuario, password) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
        [obj.nome, obj.email, obj.telefone, obj.endereco, obj.cidade, obj.nascimento, obj.sexo, obj.cpf, obj.usuario, obj.password],
        (_, { rowsAffected, insertId }) => {
          if (rowsAffected > 0) resolve(insertId);
          else reject("Erro ao Inserir novo Usuário");
        },
        (_, error) => reject(error)
      );
    });
  });
};

const update = (obj) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE users SET nome=?, email=?, telefone=?, endereco=?, cidade=?, nascimento=?, sexo=?, cpf=?, usuario=?, password=? WHERE id=?;",
        [obj.nome, obj.email, obj.telefone, obj.endereco, obj.cidade, obj.nascimento, obj.sexo, obj.cpf, obj.usuario, obj.password, obj.id],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) resolve(rowsAffected);
          else reject("Erro ao atualizar o Usuário: id=" + id);
        },
        (_, error) => reject(error)
      );
    });
  });
};

const find = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM users WHERE id=?;",
        [id],
        (_, { rows }) => {
          if (rows.length > 0) resolve(rows._array[0]);
          else reject("Usuário não Encontrado: id=" + id);
        },
        (_, error) => reject(error)
      );
    });
  });
};

const findByName = (obj) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM users WHERE usuario = ? AND password = ?;",
        [obj.usuario, obj.password],
        (_, { rows }) => {
          if (rows.length > 0) resolve(rows._array);
          else reject("Usuário não Encontrado");
        },
        (_, error) => reject(error)
      );
    });
  });
};

const all = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM users;",
        [],
        (_, { rows }) => resolve(rows._array),
        (_, error) => reject(error)
      );
    });
  });
};

const remove = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM users WHERE id=?;",
        [id],
        (_, { rowsAffected }) => {
          resolve(rowsAffected);
        },
        (_, error) => reject(error)
      );
    });
  });
};

export default {
  create,
  update,
  find,
  findByName,
  all,
  remove,
};
