import * as fs from 'fs';
import * as path from 'path';
import { createObjectCsvWriter } from 'csv-writer';
import { parse } from 'node-html-parser';
import { findGCSEs, findSection } from './util/parse';
import { UploadedFile } from 'express-fileupload';


export const csvWriter = createObjectCsvWriter({
  path: 'output.csv',
  header: [
      { id: 'name', title: 'NAME' },
      { id: 'address', title: 'ADDRESS' },
      { id: 'phone', title: 'PHONE' },
      { id: 'email', title: 'EMAIL' },
      { id: 'qualifications', title: 'QUALIFICATIONS' },
      { id: 'gcses', title: 'GCSEs' },
      { id: 'path', title: 'PATH' }
  ]
});

export function parseHtmlFile(file: UploadedFile, pathName: string) {

  const rawHtml = file.data.toString().split(/<\s*hr\s*\/\s*>/);

  const aboutYouRaw = findSection(rawHtml, 'About you');

  const qualificationsRaw = findSection(rawHtml, 'Qualifications');

  if (!aboutYouRaw) throw Error('Could not find About You Section in ' + pathName);
  if (!qualificationsRaw) throw Error('Could not find Qualifications Section in ' + pathName);

  // about you
  const aboutYouHtml = parse(aboutYouRaw);
  
  const [nameHtml, addressHtml, contactHtml] = aboutYouHtml.querySelectorAll('.panel.panel-border-narrow .list-text');
  
  // qualifications
  const qualificationsHtml = parse(qualificationsRaw);
  
  const qualH3s = qualificationsHtml.querySelectorAll('h3.heading-medium').map(h2 => `'${h2.innerHTML}'`);
  const qualTableCells = qualificationsHtml.querySelectorAll('tbody td');
  
  return {
    name: nameHtml.querySelectorAll('li').filter(li => !!li.innerHTML).map(li => li.innerHTML).join(', '),
    address: addressHtml.querySelectorAll('li').filter(li => !!li.innerHTML).map(li => li.innerHTML).join(', '),
    phone: `'${contactHtml.querySelector('li').innerHTML}'`,
    email: contactHtml.querySelector('li a').innerHTML,
    qualifications: `${qualH3s.join(', ')}`,
    gcses: findGCSEs(qualTableCells),
    path: pathName
  };
}
