// @flow

const removeSpecialChars = (event: SyntheticInputEvent<EventTarget>) => {
  const str = event.clipboardData.getData('Text');
  if (str.length === 0) {
    event.preventDefault();
    return;
  }
  let sanitizedStr = '';
  const str2Array = str.split('\n');
  str2Array.forEach((line, lineNumber) => {
    if (lineNumber > 0) {
      sanitizedStr += '\n';
    }
    for (let i = 0; i < line.length; i++) {
      if (line.charCodeAt(i) >= 32 && line.charCodeAt(i) < 127) {
        sanitizedStr += line[i];
      }
    }
  });
  event.target.setRangeText(
    sanitizedStr,
    event.target.selectionStart,
    event.target.selectionEnd,
    'end'
  );
  event.preventDefault();
};

export default removeSpecialChars;
