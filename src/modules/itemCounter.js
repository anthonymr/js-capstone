const itemCounter = (countCon, itemCon) => {
  const counter = itemCon.childElementCount;
  countCon.innerText = `(${counter})`;
};

export default itemCounter;
