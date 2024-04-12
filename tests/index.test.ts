import { urlStringify } from '@/index';

describe('urlStringify', () => {
  test('none', () => {
    expect(urlStringify({ url: '/a/b/c' })).toEqual('/a/b/c');
  });

  test('query', () => {
    expect(urlStringify({
      url: '/a/b/c',
      query: {
        a: 1,
        b: 2 
      } 
    })).toEqual('/a/b/c?a=1&b=2');

    expect(urlStringify({
      url: '/a/b/c',
      query: {
        a: undefined,
        b: 2 
      } 
    })).toEqual('/a/b/c?b=2');

    expect(urlStringify({
      url: '/a/b/c',
      query: {
        a: undefined,
        b: undefined 
      } 
    })).toEqual('/a/b/c');

    expect(urlStringify({
      url: '/a/b/c',
      query: {
        a: {
          b: 1,
          c: 2
        }
      } 
    })).toEqual('/a/b/c?a.b=1&a.c=2');

    expect(urlStringify({
      url: '/a/b/c',
      query: {
        a: {
          b: 1,
          c: 2
        }
      } 
    }, { allowDots: false })).toEqual(`/a/b/c?${encodeURI('a[b]=1&a[c]=2')}`);

    expect(urlStringify({
      url: '/a/b/c',
      query: { a: [1, 2] } 
    }, { allowDots: false })).toEqual(`/a/b/c?${encodeURI('a[0]=1&a[1]=2')}`);

    expect(urlStringify({
      url: '/a/b/c',
      query: { a: [{ a: 1 }, { a: 2 }] } 
    }, { allowDots: false })).toEqual(`/a/b/c?${encodeURI('a[0][a]=1&a[1][a]=2')}`);
  });
  
  test('params', () => {
    expect(urlStringify({
      url: '/a/b/{a}/{b}',
      params: {
        a: 1,
        b: 2 
      } 
    })).toEqual('/a/b/1/2');

    expect(urlStringify({
      url: '/a/b/[a]/[b]',
      params: {
        a: 1,
        b: 2 
      } 
    }, {
      paramsTemplatePrefix: '\\[',
      paramsTemplateSuffix: '\\]'
    })).toEqual('/a/b/1/2');
  });
});