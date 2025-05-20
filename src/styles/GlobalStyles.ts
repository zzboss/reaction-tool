import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    --color-background: #0f0e17;
    --color-primary: #7f5af0;
    --color-secondary: #2cb67d;
    --color-text: #fffffe;
    --color-text-light: #94a1b2;
    --color-white: #16161a;
    --color-error: #ef4444;
    --color-success: #22c55e;
    --color-warning: #f59e0b;
    
    --shadow-sm: 0 2px 8px rgba(127, 90, 240, 0.1);
    --shadow-md: 0 4px 12px rgba(127, 90, 240, 0.15);
    --shadow-lg: 0 8px 24px rgba(127, 90, 240, 0.2);
    
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
    background-color: var(--color-white);
    color: var(--color-text);
    padding: 8px 12px;
    border-radius: var(--radius-sm);

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

  ::selection {
    background-color: var(--color-primary);
    color: var(--color-text);
  }
`;

export default GlobalStyles;