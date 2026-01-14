const { compileTemplate, parse } = require('@vue/compiler-sfc');

module.exports = {
  process(src, filename) {
    const { descriptor } = parse(src, { filename });
    let code = '';
    
    if (descriptor.script || descriptor.scriptSetup) {
      const script = descriptor.script || descriptor.scriptSetup;
      code += script.content.replace(
        /export\s+default/,
        'const script ='
      );
    } else {
      code += 'const script = {};';
    }
    
    if (descriptor.template) {
      const templateResult = compileTemplate({
        source: descriptor.template.content,
        filename,
        id: filename,
      });
      code += `\n${templateResult.code}`;
      code += '\nscript.render = render;';
    }
    
    code += '\nexport default script;';
    
    return { code };
  },
};
