import Firebird, { Database } from 'node-firebird';
import { dbOptions } from './FIREBIRD/connection';

const connectWithRetry = async (): Promise<Database> => {
  return new Promise((resolve, reject) => {
    const tryConnect = async () => {
      Firebird.attach(dbOptions, (error, db) => {
        if (error) {
          console.log(error)
          setTimeout(tryConnect, 1000); // Tenta novamente após 1 segundo
        } else {
          resolve(db);
        }
      });
    };

    tryConnect();
  });
};

export const queryDatabase = async (sql: string) => {
  try {
    let db: Database | null = null;
    let result: Array<{}> = [];

    // Tenta conectar até que tenha sucesso
    while (!db) {
      db = await connectWithRetry();
    }

    // Agora, com a conexão bem-sucedida, executa a consulta
    result = await new Promise((resolve, reject) => {
      db!.query(sql, [], (error, queryResult) => {
        if (error) {
          reject(error);
        } else {
          resolve(queryResult);
        }
      });
    });

    // Finaliza a conexão
    db!.detach();

    if (result.length === 1) {
      return result[0];
    } else {
      return result;
    }
  } catch (error) {
    console.error('Erro na consulta:', error);
  }
};