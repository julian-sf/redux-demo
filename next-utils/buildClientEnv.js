function buildClientEnv() {
  return {
    DEBUG: process.env.DEBUG,
  };
}

module.exports = {
  buildClientEnv,
};
