import dotenv from 'dotenv';

dotenv.config();

class Config {

    api_key: string;
    api_url: string;
    db_url: string;

    constructor() {
        this.api_key = process.env.API_KEY || "";
        this.api_url = process.env.API_URL || "";
        this.db_url = process.env.DB_URL || "";
    }
}

export default new Config();