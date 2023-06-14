import '@testing-library/jest-dom/extend-expect';
import { TextEncoder, TextDecoder } from 'util';
import { configure } from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

configure({ adapter: new Adapter() });
Element.prototype.scrollIntoView = () => {};
