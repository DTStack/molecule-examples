import Icon from '@mdi/react';
import {
  mdiCodeJson,
  mdiLanguageJavascript,
  mdiLanguageTypescript,
  mdiLanguageMarkdown,
  mdiAlertCircle,
  mdiReact,
  mdiCodeBraces,
  mdiFlaskOutline,
  mdiGit,
  mdiAlphaP,
  mdiEslint,
} from '@mdi/js';

// refer from:
// https://materialdesignicons.com/
export function getIconByName(fileName: string) {
  if (fileName.endsWith('.json')) {
    return { type: mdiCodeJson, color: 'rgb(254,192,33)' };
  }
  if (fileName.endsWith('.test.js')) {
    return { type: mdiFlaskOutline, color: 'rgb(254,192,33)' };
  }
  if (fileName.endsWith('.js')) {
    return { type: mdiLanguageJavascript, color: 'rgb(254,192,33)' };
  }
  if (fileName.endsWith('.test.ts')) {
    return { type: mdiFlaskOutline, color: 'rgb(15,114,198)' };
  }
  if (fileName.endsWith('ts')) {
    return { type: mdiLanguageTypescript, color: 'rgb(15,114,198)' };
  }
  if (fileName.endsWith('.test.tsx')) {
    return { type: mdiFlaskOutline, color: 'rgb(20,158,181)' };
  }
  if (fileName.endsWith('tsx')) {
    return { type: mdiReact, color: 'rgb(20,158,181)' };
  }
  if (fileName.includes('README')) {
    return { type: mdiAlertCircle, color: 'rgb(54,145,243)' };
  }
  if (fileName.endsWith('md')) {
    return { type: mdiLanguageMarkdown, color: 'rgb(50,130,216)' };
  }
  if (fileName.endsWith('.less')) {
    return { type: mdiCodeBraces, color: 'rgb(13,92,165)' };
  }
  if (fileName.includes('gitignore')) {
    return { type: mdiGit, color: 'rgb(221,51,21)' };
  }
  if (fileName.includes('prettier')) {
    return { type: mdiAlphaP, color: 'rgb(49,99,98)' };
  }
  if (fileName.includes('eslint')) {
    return { type: mdiEslint, color: 'rgb(48,58,166)' };
  }
  return { type: mdiLanguageJavascript, color: 'rgb(254,192,33)' };
}

export default ({
  type,
  color,
  size = '18px',
}: {
  type: string;
  color: string;
  size?: string;
}) => {
  return <Icon path={type} size={size} color={color} />;
};
