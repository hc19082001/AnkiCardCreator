const getType = (text: string) => {
  let type = 10;
  const textCut = text?.trim().toLocaleLowerCase();
  if (textCut.includes('danh từ') || textCut.includes('noun')) {
    type = 1;
  }
  if (textCut.includes('động từ') || textCut.includes('verb')) {
    type = 2;
  }
  if (textCut.includes('tính từ') || textCut.includes('adjective')) {
    type = 3;
  }
  if (textCut.includes('phó từ') || textCut.includes('adverb')) {
    type = 4;
  }
  if (textCut.includes('giới từ') || textCut.includes('preposition')) {
    type = 5;
  }
  if (textCut.includes('liên từ') || textCut.includes('conjunction')) {
    type = 6;
  }
  if (textCut.includes('thán từ') || textCut.includes('interjection')) {
    type = 7;
  }
  if (textCut.includes('đại từ') || textCut.includes('pronoun')) {
    type = 8;
  }
  if (textCut.includes('định từ') || textCut.includes('determiner')) {
    type = 9;
  }
  return type;
};

const getTypeReverse = (number: number) => {
  let type = '...';
  if (number === 1) {
    type = 'n';
  }
  if (number === 2) {
    type = 'v';
  }
  if (number === 3) {
    type = 'adj';
  }
  if (number === 4) {
    type = 'adv';
  }
  if (number === 5) {
    type = 'prep';
  }
  if (number === 6) {
    type = 'conj';
  }
  if (number === 7) {
    type = 'int';
  }
  if (number === 8) {
    type = 'pron';
  }
  if (number === 9) {
    type = 'det';
  }
  return type;
};
