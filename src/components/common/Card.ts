import styled from 'styled-components';

export const Card = styled.div`
  background: var(--color-white);
  border-radius: var(--radius-md);
  padding: 24px;
  box-shadow: var(--shadow-sm);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-md);
  }
`;

export const CardHeader = styled.div`
  margin-bottom: 16px;

  h2, h3, h4 {
    margin: 0;
  }
`;

export const CardContent = styled.div`
  color: var(--color-text-light);
`;

export default Card;