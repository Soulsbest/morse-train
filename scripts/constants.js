const letter_to_morse = {
  "A" : "•-",
  "B" : "-•••",
  "C" : "-•-•",
  "D" : "-••",
  "E" : "•",
  "F" : "••-•",
  "G" : "--•",
  "H" : "••••",
  "I" : "••",
  "J" : "•---",
  "K" : "-•-",
  "L" : "•-••",
  "M" : "--",
  "N" : "-•",
  "O" : "---",
  "P" : "•--•",
  "Q" : "--•-",
  "R" : "•-•",
  "S" : "•••",
  "T" : "-",
  "U" : "••-",
  "V" : "•••-",
  "W" : "•--",
  "X" : "-••-",
  "Y" : "-•--",
  "Z" : "--••"
};

const morse_to_letter = {};
for (let key in letter_to_morse) {
  morse_to_letter[letter_to_morse[key]] = key;
};

const toggle_morse = {
  ...letter_to_morse,
  ...morse_to_letter
};

const letters = [
  "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S",
  "T", "U", "V", "W", "X", "Y", "Z"
];

const words = [
  "Plums", "Banana", "Apple", "Orange", "Pear", "Peach", "Grape", "Kiwi", "Theseareallofthefruitsitautofilled"
];

const sentences = [
  "I have developed one single sentence, however this is not a problem as my sentence is perfet",
  "this is my other sentence );"
];

export {letter_to_morse, morse_to_letter, toggle_morse, letters, words, sentences};