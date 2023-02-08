/**
 * @jest-environment jsdom
 */
import commentCounter from "../modules/commentCounter.js";

describe('commentCounter', () => {
  test('List with 3 items should return 3', () => {
    document.body.innerHTML = `
      <ul id="testing-list">
        <li><div>2023-02-07</div><div>Anthony</div><div>This is a great TV show</div></li>
        <li><div>2023-02-07</div><div>Juan</div><div></div></li>
        <li><div>2023-02-07</div><div>Pedro</div><div>Very good show</div></li>
      </ul>
    `
    expect(commentCounter('testing-list')).toBe(3);
  });

  test('List with 1 items should return 1', () => {
    document.body.innerHTML = `
      <ul id="testing-list">
        <li><div>2023-02-07</div><div>Anthony</div><div>This is a great TV show</div></li>
      </ul>
    `
    expect(commentCounter('testing-list')).toBe(1);
  });

  test('List with 0 items should return 0', () => {
    document.body.innerHTML = `
      <ul id="testing-list">
      </ul>
    `
    expect(commentCounter('testing-list')).toBe(0);
  });

  test('List with 30 items should return 30', () => {
    document.body.innerHTML = `
      <ul id="testing-list">
        <li><div>2023-02-07</div><div>Anthony</div><div>This is a great TV show</div></li>
        <li><div>2023-02-07</div><div>Juan</div><div></div></li>
        <li><div>2023-02-07</div><div>Pedro</div><div>Very good show</div></li>
        <li><div>2023-02-07</div><div>Anthony</div><div>This is a great TV show</div></li>
        <li><div>2023-02-07</div><div>Juan</div><div></div></li>
        <li><div>2023-02-07</div><div>Pedro</div><div>Very good show</div></li>
        <li><div>2023-02-07</div><div>Anthony</div><div>This is a great TV show</div></li>
        <li><div>2023-02-07</div><div>Juan</div><div></div></li>
        <li><div>2023-02-07</div><div>Pedro</div><div>Very good show</div></li>
        <li><div>2023-02-07</div><div>Anthony</div><div>This is a great TV show</div></li>
        <li><div>2023-02-07</div><div>Juan</div><div></div></li>
        <li><div>2023-02-07</div><div>Pedro</div><div>Very good show</div></li>
        <li><div>2023-02-07</div><div>Anthony</div><div>This is a great TV show</div></li>
        <li><div>2023-02-07</div><div>Juan</div><div></div></li>
        <li><div>2023-02-07</div><div>Pedro</div><div>Very good show</div></li>
        <li><div>2023-02-07</div><div>Anthony</div><div>This is a great TV show</div></li>
        <li><div>2023-02-07</div><div>Juan</div><div></div></li>
        <li><div>2023-02-07</div><div>Pedro</div><div>Very good show</div></li>
        <li><div>2023-02-07</div><div>Anthony</div><div>This is a great TV show</div></li>
        <li><div>2023-02-07</div><div>Juan</div><div></div></li>
        <li><div>2023-02-07</div><div>Pedro</div><div>Very good show</div></li>
        <li><div>2023-02-07</div><div>Anthony</div><div>This is a great TV show</div></li>
        <li><div>2023-02-07</div><div>Juan</div><div></div></li>
        <li><div>2023-02-07</div><div>Pedro</div><div>Very good show</div></li>
        <li><div>2023-02-07</div><div>Anthony</div><div>This is a great TV show</div></li>
        <li><div>2023-02-07</div><div>Juan</div><div></div></li>
        <li><div>2023-02-07</div><div>Pedro</div><div>Very good show</div></li>
        <li><div>2023-02-07</div><div>Anthony</div><div>This is a great TV show</div></li>
        <li><div>2023-02-07</div><div>Juan</div><div></div></li>
        <li><div>2023-02-07</div><div>Pedro</div><div>Very good show</div></li>
      </ul>
    `
    expect(commentCounter('testing-list')).toBe(30);
  });

  test('List with wrong ID should return 0', () => {
    document.body.innerHTML = `
      <ul id="testing-list">
        <li><div>2023-02-07</div><div>Anthony</div><div>This is a great TV show</div></li>
      </ul>
    `
    expect(commentCounter('testing-list2')).toBe(0);
  });
});

