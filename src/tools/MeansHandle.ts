export const mergeAttributevi = (defs: any) => {
  let newArr: any[] = [];
  let numberOfType: number[] = [];
  defs.forEach((obj: any) => {
    numberOfType.includes(obj.type!) || numberOfType.push(obj.type!);
  });
  numberOfType.forEach((type) => {
    const objfilter = defs.filter((obj: any) => obj.type === type);
    const data = objfilter.reduce((acc: string[], cur: any) => {
      return [...acc, ...cur.vi];
    }, []);
    newArr.push({ type, vi: data });
  });
  return newArr;
};
export const mergeAttributeen = (defs: any[]) => {
  let newArr: any[] = [];
  let numberOfType: number[] = [];
  defs.forEach((obj: any) => {
    numberOfType.includes(obj.type) ? null : numberOfType.push(obj.type);
  });
  numberOfType.forEach((type) => {
    const objfilter = defs.filter((obj) => obj.type === type);
    const data = objfilter.reduce((acc: string[], cur: any) => {
      return [...acc, ...cur.en];
    }, []);
    newArr.push({ type, en: data });
  });
  return newArr;
};
export const mergeAndAddnewAttribute = (defs1: any[], defs2: any[]) => {
  let mergerdArr: any[] = [];
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
