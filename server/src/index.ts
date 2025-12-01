import app from "./app";
import env from "./env";
import {connectDB} from "./db/connect_db"

const PORT = env.PORT || 3000;
app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});
