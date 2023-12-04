import { readConfig } from "./readConfig";

type DbOptions = {
	host: string;
	port: number;
	database: string;
	user: string;
	password: string;
	lowercase_keys: boolean;
	role: string | undefined;
	pageSize: number;
	retryConnectionInterval: number;
	blobAsText: boolean;
	// encoding: string;
  };

const dbOptions = {} as DbOptions

async function configConnection() {
	// dbOptions.host = '177.38.13.145';
	// dbOptions.database = 'C:\\ADMERP\\DADOS.FDB'
	dbOptions.database = await readConfig('BASE');
	dbOptions.host = 'localhost';
	dbOptions.port = 3050;
	dbOptions.user = 'SYSDBA';
	dbOptions.password = 'masterkey';
	dbOptions.lowercase_keys = false; // set to true to lowercase keys
	dbOptions.role = undefined;            // default
	dbOptions.pageSize = 4096;        // default when creating database
	dbOptions.pageSize = 4096;        // default when creating database
	dbOptions.retryConnectionInterval = 1000; // reconnect interval in case of connection drop
	dbOptions.blobAsText = false; // set to true to get blob as text, only affects blob subtype 1
	// dbOptions.encoding = 'UTF-8'; // default encoding for connection is UTF-8
}

configConnection()

export { dbOptions }