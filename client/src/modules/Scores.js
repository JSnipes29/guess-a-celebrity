function updateTop(name, s) {
  let top = JSON.parse(localStorage.getItem('top'));
  let top1 = top[0][0];
  let top1Name = top[0][1];
  let top2 = top[1][0];
  let top2Name = top[1][1];
  let top3 = top[2][0];
  let top3Name = top[2][1];
  if (s > top3) {
    top3 = s;
    top3Name = name;
    if (top3 > top2) {
      const temp = top3;
      const tempName = top3Name;
      top3 = top2;
      top3Name = top2Name;
      top2 = temp;
      top2Name = tempName;
      if (top2 > top1) {
        const temp2 = top2;
        const tempName2 = top2Name;
        top2 = top1;
        top2Name = top1Name;
        top1 = temp2;
        top1Name = tempName2;
      }
    }
  }
  top = [[top1, top1Name], [top2, top2Name], [top3, top3Name]];
  localStorage.setItem('top', JSON.stringify(top));
}

function getUserMax(name) {
  return localStorage.getItem(name);
}

module.exports = { updateTop, getUserMax };
