// @flow

const removeSpecialChars = (event: SyntheticInputEvent<EventTarget>) => {
  const str = event.clipboardData.getData('Text');
  if (str.length === 0) {
    event.target.value = event.target.value + newStr;
    event.preventDefault();
    return;
  }
  let sanitizedStr = '';
  const str2Array = str.split('\n');
  console.log(str2Array)
  str2Array.forEach(function(line) {
    for (let i=0; i<line.length; i++) {
      if (str.charCodeAt(i) >= 32 && str.charCodeAt(i) < 127) {
        sanitizedStr = sanitizedStr + str[i];
      }
    }
    sanitizedStr += '\n';
  });
  if (str !== sanitizedStr) {
    console.log('Filtered unsupported characters!!');
    event.target.value = event.target.value + sanitizedStr;
    event.preventDefault();
  }
};

export default removeSpecialChars;
