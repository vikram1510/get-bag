import { HTMLElement, parse } from 'node-html-parser';
import { removeWhiteSpace } from './format';

const reMathsEnglish = /maths|english/i;


export function findGCSEs(tableRows: HTMLElement[]): string {

  const result: string[] = [];

  for (let i = 0; i < tableRows.length; i += 3) {
    const [subjectTd, gradeTd, yearTd] = [tableRows[i], tableRows[i + 1], tableRows[i + 2]];

    if (subjectTd.innerHTML.match(reMathsEnglish)){
      result.push(`${removeWhiteSpace(subjectTd.innerHTML)} - ${removeWhiteSpace(gradeTd.innerHTML)} (${removeWhiteSpace(yearTd.innerHTML)})`);
    }
  }

  return result.join(', ');

}

export function findSection(htmlSections: string[], toFind: string){
  return htmlSections.find(html => {
    const h2 = parse(html).querySelector('h2.heading-large');
    return h2.innerHTML === toFind;
  });
}

