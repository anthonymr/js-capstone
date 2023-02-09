const itemCounter = (countCon, itemCon) => {
  const counter = itemCon.childElementCount;
  countCon.innerText = `(${counter})`;
  return counter;
};

export default itemCounter;
