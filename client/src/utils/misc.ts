import _ from 'lodash';

export function getFileNameFromPath(filePath: string): string {
  return filePath.replace(/^.*[\\\/]/, '');
}
