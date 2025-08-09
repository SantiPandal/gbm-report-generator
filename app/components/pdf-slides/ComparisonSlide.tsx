import { Page, View, Text } from '@react-pdf/renderer';
import { styles } from './styles';

export const ComparisonSlide = ({ title }: { title: string }) => (
  <Page size="A4" orientation="landscape" style={styles.page}>
    <View>
      <Text>ComparisonSlide: {title}</Text>
    </View>
  </Page>
);