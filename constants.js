const letter_to_morse = {
  "a" : ".-",
  "b" : "-...",
  "c" : "-.-.",
  "d" : "-..",
  "e" : ".",
  "f" : "..-.",
  "g" : "--.",
  "h" : "....",
  "i" : "..",
  "j" : ".---",
  "k" : "-.-",
  "l" : ".-..",
  "m" : "--",
  "n" : "-.",
  "o" : "---",
  "p" : ".--.",
  "q" : "--.-",
  "r" : ".-.",
  "s" : "...",
  "t" : "-",
  "u" : "..-",
  "v" : "...-",
  "w" : ".--",
  "x" : "-..-",
  "y" : "-.--",
  "z" : "--.."
};

const morse_to_letter = {};
for (key in letter_to_morse) {
  morse_to_letter[letter_to_morse[key]] = key;
};

const letters = [
  "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s",
  "t", "u", "v", "w", "x", "y", "z"
];

const words = [
  "plums", "banana", "apple", "orange", "pear", "peach", "grape", "kiwi", "theseareallofthefruitsitautofilled"
];

const sentences = [
  "I have developed one single sentence, however this is not a problem as my sentence is perfet",
  "this is my other sentence );"
];

export {letter_to_morse, morse_to_letter, letters, words, sentences};