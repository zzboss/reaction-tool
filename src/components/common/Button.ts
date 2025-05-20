import styled, { css } from 'styled-components';

export const Button = styled.button<{
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: var(--radius-sm);
  font-weight: 600;
  transition: all 0.2s ease;

  ${props => props.size === 'small' && css`
    padding: 8px 16px;
    font-size: 14px;
  `}

  ${props => (!props.size || props.size === 'medium') && css`
    padding: 12px 24px;
    font-size: 16px;
  `}

  ${props => props.size === 'large' && css`
    padding: 16px 32px;
    font-size: 18px;
  `}

  ${props => (!props.variant || props.variant === 'primary') && css`
    background: linear-gradient(135deg, var(--color-primary), #9c96e9);
    color: var(--color-white);
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }
    
    &:active {
      transform: translateY(0);
    }
  `}

  ${props => props.variant === 'secondary' && css`
    background: linear-gradient(135deg, var(--color-secondary), #ffcef3);
    color: var(--color-text);
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }
    
    &:active {
      transform: translateY(0);
    }
  `}

  ${props => props.variant === 'outline' && css`
    border: 2px solid var(--color-primary);
    color: var(--color-primary);
    background: transparent;
    
    &:hover {
      background: var(--color-primary);
      color: var(--color-white);
    }
  `}
`;

export default Button;