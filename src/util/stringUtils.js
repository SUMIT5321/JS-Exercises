export default function formatText(text, ...args) {
  return args.reduce((prevVal, currentVal) => prevVal.replace(/%s/, currentVal), text);
}
