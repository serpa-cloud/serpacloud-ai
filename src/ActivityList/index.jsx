import { Text, Icon, Flexbox } from '../shared';

type Props = {
  activity?: [],
};

export default function ActivityList({ activity }: Props): React$Node {
  return (
    <Flexbox flexDirection="column" rowGap={24}>
      <Text type="s1b" color="--neutral-color-800">
        Activity
      </Text>
      <Flexbox flexDirection="column" rowGap={16}>
        {activity.map((item, key) => {
          const thisKey = `${item.user}-${key}`;
          return (
            <Flexbox key={thisKey} columnGap={8}>
              <Icon
                icon={item.icon}
                color="--neutral-color-500"
                size={20}
                weight={200}
                grade={-25}
              />
              <Text type="s0b">{item.user}</Text>
              <Text type="s0r">{item.description}</Text>
              <Text type="s1r" color="--neutral-color-500">
                -
              </Text>
              <Text type="s0r">{item.date}</Text>
            </Flexbox>
          );
        })}
      </Flexbox>
    </Flexbox>
  );
}

ActivityList.defaultProps = {
  activity: [],
};
