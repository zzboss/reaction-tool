import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    --color-background: #f8f7ff;
    --color-primary: #7c73e6;
    --color-secondary: #ffa9e7;
    --color-text: #2d2b55;
    --color-text-light: #6c6a8a;
    --color-white: #ffffff;
    --color-error: #ff6b6b;
    --color-success: #51cf66;
    --color-warning: #ffd93d;
    
    --shadow-sm: 0 2px 8px rgba(124, 115, 230, 0.1);
    --shadow-md: 0 4px 12px rgba(124, 115, 230, 0.15);
    --shadow-lg: 0 8px 24px rgba(124, 115, 230, 0.2);
    
    --radius-sm: 8px;
    --radius-md: 12px;
    --radius-lg: 20px;
    
    --font-primary: 'Nunito', sans-serif;
    --font-secondary: 'Playfair Display', serif;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: var(--font-primary);
    background-color: var(--color-background);
    color: var(--color-text);
    line-height: 1.6;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-secondary);
    font-weight: 700;
    color: var(--color-text);
  }

  button {
    font-family: var(--font-primary);
    cursor: pointer;
    border: none;
    outline: none;
    background: none;
    
    &:disabled {
      cursor: not-allowed;
      opacity: 0.7;
    }
  }

  input, select, textarea {
    font-family: var(--font-primary);
    border: 2px solid transparent;
    outline: none;
    transition: all 0.2s ease;

    &:focus {
      border-color: var(--color-primary);
    }
  }

  a {
    color: var(--color-primary);
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: var(--color-secondary);
    }
  }
`;

export default GlobalStyles;