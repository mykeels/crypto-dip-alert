if (!global.__rootdir) {
  Object.defineProperty(global, "__rootdir", {
    get: () => {
      return require("path").dirname(
        process.pkg
          ? process.execPath
          : require.main
          ? require.main.filename
          : process.argv[0]
      );
    },
  });
}
