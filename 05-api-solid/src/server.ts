import app from "@/app";
import {env} from "@/validators/envValidator";

app.listen({
    host: '0.0.0.0',
    port: env.PORT
}).then(() => {
    console.log(`🚀 Server is running on port ${env.PORT}`);
});