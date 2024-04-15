import { isObject } from 'lodash';
import qs from './qs-stub';

export const urlStringify = (args:{
  url:string,
  query?:Record<string, any>,
  params?:Record<string, any>
}, options:{
  allowDots?:boolean,
  paramsTemplatePrefix?:string,
  paramsTemplateSuffix?:string
} = {
  allowDots: true,
  paramsTemplatePrefix: '{',
  paramsTemplateSuffix: '}'
}) => {
  let tempUrl = args.url;
  if (isObject(args.params)) {
    const reg = new RegExp(`${options.paramsTemplatePrefix}(.*?)${options.paramsTemplateSuffix}`, 'g');
    tempUrl.match(reg)?.forEach(m => tempUrl = tempUrl.replace(m, encodeURIComponent(String(args.params![m.replace(reg, '$1')]))));
  }
  if (isObject(args.query)) {
    const queryStr = qs.stringify(args?.query, { allowDots: options.allowDots });
    if (queryStr) {
      tempUrl = `${tempUrl}?${queryStr}`;
    }
  }
  return tempUrl;
};

