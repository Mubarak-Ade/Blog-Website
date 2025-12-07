import {cleanEnv, str, port} from "envalid"

export default cleanEnv(process.env, {
    PORT: port(),
    MONGO_DEV_URI: str(),
    MONGO_PROD_URI: str(),
    JWT_SECRET: str(),
    CLOUD_NAME: str(),
    CLOUD_KEY: str(),
    CLOUD_SECRET: str(),
})