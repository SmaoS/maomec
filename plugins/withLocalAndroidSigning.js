const { withAppBuildGradle } = require("expo/config-plugins");

module.exports = function withLocalAndroidSigning(config) {
  return withAppBuildGradle(config, (mod) => {
    if (mod.modResults.language !== "groovy") return mod;
    let source = mod.modResults.contents;
    const marker = "    buildTypes {";
    if (!source.includes("MAOMEC_UPLOAD_STORE_FILE") && source.includes(marker)) {
      const signing = `    signingConfigs {
        release {
            if (project.hasProperty('MAOMEC_UPLOAD_STORE_FILE')) {
                storeFile file(MAOMEC_UPLOAD_STORE_FILE)
                storePassword MAOMEC_UPLOAD_STORE_PASSWORD
                keyAlias MAOMEC_UPLOAD_KEY_ALIAS
                keyPassword MAOMEC_UPLOAD_KEY_PASSWORD
            } else {
                throw new GradleException('Faltan las credenciales de firma MAOMEC_UPLOAD_* para el build Release.')
            }
        }
    }

`;
      source = source.replace(marker, signing + marker);
      const debugSigning = "signingConfig signingConfigs.debug";
      const releaseIndex = source.lastIndexOf(debugSigning);
      if (releaseIndex >= 0) source = source.slice(0, releaseIndex) + "signingConfig signingConfigs.release" + source.slice(releaseIndex + debugSigning.length);
    }
    mod.modResults.contents = source;
    return mod;
  });
};
