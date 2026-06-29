import "dotenv/config";
import app from "./app.js";
import connToDB from "./common/config/db.js";

const PORT = process.env.PORT || 8080;

async function main() {
    try {
        // DB connection
        await connToDB();

        app.listen(PORT, () => {
            console.log(
                `server running on http://localhost:${PORT} in ${process.env.NODE_ENV} mode`,
            );
        });
    } catch (error) {
        console.log("Failed to run server");
        process.exit(1);
    }
}

main();
