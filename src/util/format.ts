
export function removeWhiteSpace(str: string): string {
  const match = str.match(/(\w+\s*\w*)\r\n/);
  return match ? match[1] : '-';
}

export function escapeSpace(str: string): string {
  return str.replace(/\(\s+)/g, '\\$1');
}
