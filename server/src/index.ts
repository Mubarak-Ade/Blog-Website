import app from "./app.ts";
import env from "../env.ts";
import {connectDB} from "./db/connect_db.ts"

const PORT = env.PORT || 5000;
app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});
