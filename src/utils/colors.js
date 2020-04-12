// @flow
import { random } from 'lodash';

export const colors = [
  '#FF0000',
  '#0000FF',
  '#FF00FF',
  '#00FF00',
  '#87CEEB',
  '#BA55D3',
  '#3CB371',
  '#FFD700',
  '#FF1493',
  '#708090',
  '#FF4500'
];

export const getRandomColor = () => colors[random(0, 10)];
