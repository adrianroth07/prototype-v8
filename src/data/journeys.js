import { ALL_PATHS_WITH_BRIDGES } from './paths.js';

export const LEADS_TO = {
  iba: ['ausbildung', 'eq', 'fos'],
  eq: ['ausbildung'],
  fos: ['studium', 'ausbildung', 'freelancing'],
  ausbildung: ['studium', 'freelancing', 'bundeswehr', 'gap-year'],
  studium: ['freelancing', 'gap-year', 'ausbildung', 'bundeswehr'],
  fsj: ['ausbildung', 'studium', 'freelancing', 'bundeswehr'],
  freelancing: ['ausbildung', 'studium'],
  bundeswehr: ['ausbildung', 'studium', 'freelancing'],
  'gap-year': ['ausbildung', 'studium', 'fsj', 'freelancing', 'bundeswehr'],
};

export const PATH_EMOJIS = {
  iba: '\u{1F4DA}',
  eq: '\u{1F91D}',
  fos: '\u{1F4C8}',
  ausbildung: '\u{1F6E0}\u{FE0F}',
  studium: '\u{1F393}',
  fsj: '\u{1F49A}',
  freelancing: '\u{1F4BB}',
  bundeswehr: '\u{1F396}\u{FE0F}',
  'gap-year': '\u{2708}\u{FE0F}',
};

export function pathById(id) {
  return ALL_PATHS_WITH_BRIDGES.find(p => p.id === id);
}
