module.exports = {
    dbURI:  process.env.DB_URI || "mongodb+srv://joaovdlima:Reboot12%40@cluster0.yqfeh7y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    jwtSecret: process.env.JWT_SECRET || 'seu-segredo-jwt',
};
