import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const PORT: number = Number(process.env.PORT) || 5009;

app.listen(PORT, () => console.log(`server tried so far in port ${PORT}`));
