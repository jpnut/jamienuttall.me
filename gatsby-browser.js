import 'prismjs/themes/prism.css';
import './src/styles/prism.css';
import { ThemeProvider } from 'emotion-theming';
import { theme } from './src/theme';

export const wrapRootElement = ({ element }) => <ThemeProvider theme={theme}>{element}</ThemeProvider>;
