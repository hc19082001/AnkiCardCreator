interface ViWord {
  type: number;
  vi: string[];
}
interface EnWord {
  type: number;
  en: string[];
}
type WordMean = (ViWord & EnWord) | ViWord | EnWord;

interface Word {
  ipa: string;
  defs: WordMean[];
}

const mergeAttributevi = (defs: ViWord[]) => {
  let newArr: ViWord[] = [];
  let numberOfType: number[] = [];
  defs.forEach((obj) => {
    numberOfType.includes(obj.type) || numberOfType.push(obj.type);
  });
  numberOfType.forEach((type) => {
    const objfilter = defs.filter((obj) => obj.type === type);
    const data = objfilter.reduce((acc: string[], cur: ViWord) => {
      return [...acc, ...cur.vi];
    }, []);
    newArr.push({ type, vi: data });
  });
  return newArr;
};
const mergeAttributeen = (defs: EnWord[]) => {
  let newArr: EnWord[] = [];
  let numberOfType: number[] = [];
  defs.forEach((obj: any) => {
    numberOfType.includes(obj.type) ? null : numberOfType.push(obj.type);
  });
  numberOfType.forEach((type) => {
    const objfilter = defs.filter((obj) => obj.type === type);
    const data = objfilter.reduce((acc: string[], cur: EnWord) => {
      return [...acc, ...cur.en];
    }, []);
    newArr.push({ type, en: data });
  });
  return newArr;
};
const mergeAndAddnewAttribute = (defs1: EnWord[], defs2: ViWord[]) => {
  let mergerdArr: WordMean[] = [];
  defs1.forEach((obj) => {
    const objfilter = defs2.filter((obj2) => obj2.type === obj.type);
    objfilter.length > 0
      ? (mergerdArr = [...mergerdArr, { ...obj, ...objfilter[0] }])
      : (mergerdArr = [...mergerdArr, { ...obj }]);
  });
  defs2.forEach((obj: any) => {
    const objfilter = defs1.filter((obj1) => obj1.type === obj.type);
    objfilter.length > 0 ? null : (mergerdArr = [...mergerdArr, { ...obj }]);
  });
  return mergerdArr;
};
