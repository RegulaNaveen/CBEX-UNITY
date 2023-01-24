import '@testing-library/jest-dom/extend-expect';
import { TextEncoder, TextDecoder } from 'util';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

configure({ adapter: new Adapter() });
Element.prototype.scrollIntoView = () => {};
