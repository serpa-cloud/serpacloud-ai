// @flow
import { useFragment, graphql } from 'react-relay';
import { Link } from 'react-router-dom';
import { Text } from '../shared';

import type { ProjectPreview$key } from './__generated__/ProjectPreview.graphql';

type Props = {|
  +project: ProjectPreview$key,
|};

const gradients = [
  ['--blue-solid-color', '--cyan-solid-color'],
  ['--blue-solid-color', '--pink-solid-color'],
  ['--pink-solid-color', '--orange-solid-color'],
  ['--red-solid-color', '--yellow-solid-color'],
];

const getRandomGradient = () => {
  const [start, end] = gradients[Math.floor(Math.random() * gradients.length)];
  return `linear-gradient(45deg, var(${start}), var(${end}))`;
};

const isDarkColor = (gradient) => {
  const colors = gradient.match(/var\(([^)]+)\)/g);
  const averageBrightness =
    colors.reduce((acc, colorVar) => {
      const color = getComputedStyle(document.documentElement)
        .getPropertyValue(colorVar.slice(4, -1))
        .trim();
      const r = parseInt(color.slice(1, 3), 16);
      const g = parseInt(color.slice(3, 5), 16);
      const b = parseInt(color.slice(5, 7), 16);
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;
      return acc + brightness;
    }, 0) / colors.length;
  return averageBrightness < 180;
};

const ProjectPreview = ({ project }: Props): React$Node => {
  const data = useFragment(
    graphql`
      fragment ProjectPreview on AIProject {
        id
        name
        description
      }
    `,
    project,
  );

  const backgroundGradient = getRandomGradient();
  const textColor = isDarkColor(backgroundGradient) ? '--neutral-color-100' : '--neutral-color-800';

  return (
    <Link
      to={`/app/projects/${data.id}`}
      style={{ textDecoration: 'none' }}
      onClick={() => {
        localStorage.removeItem('previewUrl');
      }}
    >
      <div
        style={{
          minHeight: '120px',
          background: backgroundGradient,
          borderRadius: '8px',
          padding: '16px',
          boxShadow: 'var(--shadow-1)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}
      >
        <Text type="s1b" color={textColor}>
          {data.name}
        </Text>
        <div
          style={{
            marginTop: '8px',
            color: `var(${textColor})`,
            fontSize: '14px',
            lineHeight: '1.5',
            fontFamily: 'SF Pro Text, sans-serif',
            fontWeight: 400,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {data.description}
        </div>
      </div>
    </Link>
  );
};

export default ProjectPreview;
