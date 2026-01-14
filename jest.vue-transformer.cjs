const { parse, compileScript, compileTemplate } = require('@vue/compiler-sfc');
const tsJest = require('ts-jest').default;

module.exports = {
  process(src, filename, config, transformOptions) {
    const { descriptor } = parse(src, { filename });
    let code = '';

    // Compile script setup or script
    if (descriptor.scriptSetup) {
      const scriptResult = compileScript(descriptor, { id: filename });
      code += scriptResult.content;
    } else if (descriptor.script) {
      code += descriptor.script.content;
    } else {
      code += 'export default {};';
    }

    // Compile template
    if (descriptor.template) {
      try {
        const templateResult = compileTemplate({
          source: descriptor.template.content,
          filename,
          id: filename,
          compilerOptions: {
            mode: 'module',
          },
        });
        code += `\n${templateResult.code}`;
      } catch (error) {
        console.warn(`Template compilation failed for ${filename}:`, error.message);
      }
    }

    // Process the transformed code through ts-jest
    const tsJestTransformer = tsJest.createTransformer({
      tsconfig: {
        esModuleInterop: true,
        allowSyntheticDefaultImports: true,
      },
    });

    return tsJestTransformer.process(code, filename, config, transformOptions);
  },
  getCacheKey() {
    return 'vue-transform';
  },
};
