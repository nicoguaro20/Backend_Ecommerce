import { DataSource, DataSourceOptions } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';
import { registerAs } from '@nestjs/config';

dotenvConfig({ path: '.env' });

const config: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT,10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../migrations/*{.ts,.js}'],
    synchronize: true, //process.env.NODE_ENV !== 'production',
    logging: process.env.NODE_ENV === 'development',
};

export default registerAs('typeorm', () => config);

export const connectionSource = new DataSource(config);

export const initializeDatabase = async () => {
    if (!connectionSource.isInitialized) {
        await connectionSource.initialize();
        console.log('📦 Base de datos conectada');
    }
};