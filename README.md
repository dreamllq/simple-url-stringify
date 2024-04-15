# simple-url-stringify


## install

```bash
npm i simple-url-stringify
```

## 使用

### query
```ts
import { urlStringify } from 'simple-url-stringify';

urlStringify({
  url: '/a/b/c',
  query: {
    a: 1,
    b: 2 
  } 
})
// '/a/b/c?a=1&b=2'

urlStringify({
  url: '/a/b/c',
  query: {
    a: undefined,
    b: 2 
  } 
})
// '/a/b/c?b=2'

urlStringify({
  url: '/a/b/c',
  query: {
    a: undefined,
    b: undefined 
  } 
})
// '/a/b/c'

urlStringify({
  url: '/a/b/c',
  query: {
    a: {
      b: 1,
      c: 2
    }
  } 
})
// '/a/b/c?a.b=1&a.c=2'

urlStringify({
  url: '/a/b/c',
  query: {
    a: {
      b: 1,
      c: 2
    }
  } 
}, { allowDots: false })
// '/a/b/c?a%5Bb%5D=1&a%5Bc%5D=2'
// `/a/b/c?${encodeURI('a[b]=1&a[c]=2')}`
```

### params

```ts
import { urlStringify } from 'simple-url-stringify';
urlStringify({
  url: '/a/b/{a}/{b}',
  params: {
    a: 1,
    b: 2 
  } 
})
// '/a/b/1/2'

urlStringify({
  url: '/a/b/[a]/[b]',
  params: {
    a: 1,
    b: 2 
  } 
}, {
  paramsTemplatePrefix: '\\[',
  paramsTemplateSuffix: '\\]'
})
// '/a/b/1/2'
```