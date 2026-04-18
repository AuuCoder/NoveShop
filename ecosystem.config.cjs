module.exports = {
  apps: [
    {
      name: "noveshop-web",
      script: "npm",
      args: "run start",
      cwd: __dirname,
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
