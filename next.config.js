module.exports = {
  async redirects() {
    return process.env.NODE_ENV === "development"
      ? []
      : [
          {
            source: "/",
            destination: "https://angvalion.com/",
            permanent: true
          }
        ];
  }
};
