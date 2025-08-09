import { Page, View, Text } from '@react-pdf/renderer';
import { styles } from './styles';
import { SlideProps } from '@/types';

export const TitleSlide = ({ title }: { title: string }) => (
  <Page size="A4" orientation="landscape" style={styles.page}>
    <View>
      <Text style={styles.title}>{title}</Text>
    </View>
  </Page>
);