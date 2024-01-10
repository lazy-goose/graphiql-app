export const queryPrettify = (query: string) => {
  const indent = (s = '', tab = '  ') => {
    let out = ''
    for (let lvl = 0, i = 0; i < s.length; i++) {
      if (s[i] === '{') lvl += 1
      if (s[i] === '}') lvl -= 1
      if (s[i - 1] === '\n') out += tab.repeat(lvl)
      out += s[i]
    }
    return out
  }
  return indent(
    query
      .replaceAll(/\n{2,}/g, '')
      .split('\n')
      .map((line) => line.trim())
      .map((line) =>
        line.startsWith('#')
          ? line
          : line
              .replaceAll(/[\n]{2,}/g, '\n')
              .replaceAll(/[ ]{2,}/g, ' ')
              .replaceAll(/[ ]*[(]/g, '(')
              .replaceAll(/[ ]*[)]/g, ')')
              .replaceAll(/:[ ]*/g, ': ')
              .replaceAll(/[ ]*=[ ]*/g, ' = '),
      )
      .join('\n')
      .replaceAll(/[ \n]*[{][ \n]*/g, ' {\n')
      .replaceAll(/[ \n]*[}]/g, '\n}'),
  ).trim()
}
