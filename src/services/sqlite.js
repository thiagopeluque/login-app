import * as SQLite from 'expo-sqlite'; //Importa o pacote do SQLITE
const db = SQLite.openDatabase('dbuser.db'); // Inicializa o Banco para uso (ou cria caso não exista)

// Exporta para ser usado no App
export default db;
