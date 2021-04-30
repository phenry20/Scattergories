const withImages = require("next-images");
const path = require("path");
const withPlugins = require("next-compose-plugins");
const withTM = require("next-transpile-modules")([]);

const images = withImages({
    sassOptions: {
        includePaths: [path.join(__dirname, "styles")],
    },
});

module.exports = withPlugins([withTM, images], {});
