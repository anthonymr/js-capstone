import itemCounter from '../modules/itemCounter.js';

describe('Test to display the item counter', () => {
  document.body.innerHTML = `
    <h1 class="show-titles">Great Season Shows <span id="count-items">(0)</span></h1>
    <ul class='itemss'>
      <li>item 1</li>
      <li>item 2</li>
      <li>item 3</li>
      <li>item 4</li>
      <li>item 5</li>
      <li>item 6</li>
    </ul>
    `;

  test('The Item count should be 6', () => {
    const itemCon = document.querySelector('.itemss');
    const itemCntCon = document.getElementById('count-items');
    const counts = itemCounter(itemCntCon, itemCon);
    expect(counts).toBe(6);
  });

  test('The Item count should be equal to item container child count', () => {
    const itemCon = document.querySelector('.itemss');
    const itemCntCon = document.getElementById('count-items');
    const counts = itemCounter(itemCntCon, itemCon);
    expect(itemCon.childElementCount).toBe(counts);
  });
});
