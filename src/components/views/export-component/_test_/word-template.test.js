/**
 * @jest-environment jsdom
 */
import { getStyle } from '../word-template';

describe('Word Template Library Test', () => {
  beforeAll(() => {});
  test('fn: getStyle | case no style', async () => {
    let styleMap = {};
    styleMap['BOLD'] = { start: 10, end: 15 };
    const res = getStyle(styleMap, 0);
    expect('').toEqual(res.styleId);
  });

  test.skip('fn: getStyle | case bold style', async () => {
    let styleMap = {};
    styleMap['BOLD'] = { start: 10, end: 15 };
    const res = getStyle(styleMap, 12);
    expect('(b)').toEqual(res.styleId);
    expect(true).toEqual(res.styles.bold);
  });

  test.skip('fn: getStyle | case bold and italic style', async () => {
    let styleMap = {};
    styleMap['BOLD'] = { start: 10, end: 15 };
    styleMap['ITALIC'] = { start: 9, end: 12 };
    const res = getStyle(styleMap, 11);
    expect('(b)(i)').toEqual(res.styleId);
    expect(true).toEqual(res.styles.bold);
    expect(true).toEqual(res.styles.italics);
  });

  test.skip('fn: getStyle | case bold and italic not strike', async () => {
    let styleMap = {};
    styleMap['BOLD'] = { start: 10, end: 15 };
    styleMap['ITALIC'] = { start: 9, end: 12 };
    styleMap['STRIKETHROUGH'] = { start: 12, end: 19 };
    const res = getStyle(styleMap, 11);
    expect('(b)(i)').toEqual(res.styleId);
    expect(true).toEqual(res.styles.bold);
    expect(true).toEqual(res.styles.italics);
    expect(false).toEqual(res.styles.strike);
  });

  test.skip('fn: getStyle | case bold and italic and strike style', async () => {
    let styleMap = {};
    styleMap['BOLD'] = { start: 10, end: 15 };
    styleMap['ITALIC'] = { start: 9, end: 12 };
    styleMap['STRIKETHROUGH'] = { start: 11, end: 13 };
    const res = getStyle(styleMap, 11);
    expect('(b)(i)(s)').toEqual(res.styleId);
    expect(true).toEqual(res.styles.bold);
    expect(true).toEqual(res.styles.italics);
    expect(true).toEqual(res.styles.strike);
  });

  test.skip('fn: getStyle | case bold and italic and strike style with fontSize: 16', async () => {
    let styleMap = {};
    styleMap['BOLD'] = { start: 10, end: 15 };
    styleMap['ITALIC'] = { start: 9, end: 12 };
    styleMap['STRIKETHROUGH'] = { start: 11, end: 13 };
    styleMap['fontsize-16'] = { start: 0, end: 15 };
    const res = getStyle(styleMap, 11);
    expect('(b)(i)(s)(fs)').toEqual(res.styleId);
    expect(true).toEqual(res.styles.bold);
    expect(true).toEqual(res.styles.italics);
    expect(true).toEqual(res.styles.strike);
    expect(16).toEqual(res.styles.size);
  });

  afterAll(() => {});
});
