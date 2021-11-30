export function getCookie(cname: string) {
  var name = cname + '=';
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i].trim();
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

export function getFileExt(fileName: string = '') {
  const names = fileName.split('.');
  return names.pop();
}

export function getLanguageByExt(extName?: string) {
  console.log('extName:', extName);

  switch (extName) {
    case 'js':
      return 'javascript';
    case 'jsx':
      return 'javascriptreact';
    case 'ts':
    case 'tsx':
      return 'typescript';
    case 'md':
      return 'markdown';
    case 'json':
      return 'json';
    default:
      if (extName?.endsWith('ignore')) {
        return 'ignore';
      }
      return null;
  }
}
