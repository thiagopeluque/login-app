import db from "./sqlite";

db.transaction((tx) => {
  tx.executeSql(
    // -----------------------------------------------------------------
    // User somente para Testes (descomentar a linha abaixo e abrir o App)
    // -----------------------------------------------------------------
    // "DROP TABLE users;"
    // -----------------------------------------------------------------
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

// -----------------------------------------------------------------
// Recebe os dados de um Objeto vindo do Form. e passa para o INSERT
// -----------------------------------------------------------------
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

// -----------------------------------------------------------------
// Recebe um Objeto e atualiza os dados do Banco de Dados
// -----------------------------------------------------------------
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

// -----------------------------------------------------------------
// Consulta o ID do usuário clicado e retorna os Dados para o Update
// -----------------------------------------------------------------
const findtoUpdate = (id) => {
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

// -----------------------------------------------------------------
// Faz a busca no banco pelo 'NOME' passado no Input de Buscas
// -----------------------------------------------------------------
const findByName = (nome) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM users WHERE nome LIKE ?;",
        [`%${nome}%`],
        (_, { rows }) => {
          if (rows.length > 0) resolve(rows._array);
          else reject("Usuário não Encontrado");
        },
        (_, error) => reject(error)
      );
    });
  });
};

// -----------------------------------------------------------------
// Consulta Login. Se o usuário digitado está cadastrado no sistema
// -----------------------------------------------------------------
const login = (obj) => {
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

// -----------------------------------------------------------------
// Consulta que Retona um Objeto com todos os usuários cadastrados
// -----------------------------------------------------------------
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

// -----------------------------------------------------------------
// Consulta que busca o ID do usuário selecionado para Exclusão
// -----------------------------------------------------------------
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

// -----------------------------------------------------------------
// Export das funções criadas do Banco de Dados
// -----------------------------------------------------------------
export default {
  create,
  update,
  findtoUpdate,
  findByName,
  all,
  login,
  remove,
};
