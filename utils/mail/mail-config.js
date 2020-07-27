module.exports = {
    email: {
        user:process.env.EMAIL_ACC,
        pass: process.env.EMAIL_PASS,
    },
    server: {
        port: parseInt(process.env.DEV_APP_PORT) || 3000,
        endpoint: "localhost",
        protocol: "http"
    }
}