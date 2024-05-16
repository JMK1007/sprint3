import { style } from '@vanilla-extract/css';
import { vars } from '../../App.css';

export const S = {
  container: style({
    display: 'flex',
    flexDirection: 'column',
    padding: vars.spacing.medium,
    backgroundColor: vars.color.task,
    borderRadius: 10,
    marginBottom: vars.spacing.big2,
    boxShadow: vars.shadow.basic,
    cursor: 'pointer',
    ':hover': {
      backgroundColor: vars.color.taskHover,
      transform: 'scale(1.03)',
    },
  }),

  title: style({
    fontSize: vars.fontSizing.T4,
    fontWeight: 'bold',
    marginBottom: vars.spacing.small,
  }),

  description: style({
    fontSize: vars.fontSizing.P1,
  }),
};
