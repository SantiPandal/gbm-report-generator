import { Page, View, Text } from '@react-pdf/renderer';
import { styles } from './styles';

export const ChartSlide = ({ title }: { title: string }) => (
  <Page size="A4" orientation="landscape" style={styles.page}>
    <View>
      <Text>ChartSlide: {title}</Text>
    </View>
  </Page>
);