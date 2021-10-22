// @flow

const removeSpecialChars = (event: SyntheticInputEvent<EventTarget>) => {
  const str = event.clipboardData.getData('Text');
  const newStr = str.replace(/[^a-zA-Z0-9 `~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
  if (str !== newStr) {
    console.log("Filtered unsupported characters!!");
    event.target.value = event.target.value + newStr;
    event.preventDefault()
  }
};

export default removeSpecialChars;
