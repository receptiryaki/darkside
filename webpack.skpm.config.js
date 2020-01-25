module.exports = function(config, isPluginCommand) {
  config.module.rules.push({
    test: /\.tsx?$/,
    use: "ts-loader",
    exclude: /node_modules/
  });

  if (!config.resolve) config.resolve = { extensions: [] };

  config.resolve.extensions = [...config.resolve.extensions, ".ts", ".tsx"];
};
