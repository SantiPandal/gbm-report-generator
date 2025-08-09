import { Page, View, Text, Image, Svg, Path, Circle } from '@react-pdf/renderer';
import { styles, colors } from './styles';
import { SummaryStats } from '@/lib/processing/types';

interface TitleSlideProps {
  title: string;
  subtitle?: string;
  period: string;
  stats: SummaryStats;
  logoUrl?: string;
  companyName?: string;
}

export const TitleSlide = ({ 
  title = "MERGERS & ACQUISITIONS",
  subtitle = "Mexico Market Analysis",
  period,
  stats,
  logoUrl,
  companyName = "GBM Investment Banking"
}: TitleSlideProps) => {
  
  // Format numbers for display - professional financial style
  const formatValue = (value: number): string => {
    if (value >= 1000) {
      return `USD ${(value / 1000).toFixed(1)}bn`;
    }
    return `USD ${value.toFixed(0)}m`;
  };
  
  const formatDate = (): string => {
    const date = new Date();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                   'July', 'August', 'September', 'October', 'November', 'December'];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  };
  
  return (
    <Page size="A4" orientation="landscape" style={styles.page}>
      <View style={styles.titleSlideContainer}>
        
        {/* Header with logo and date */}
        <View style={styles.titleSlideHeader}>
          <View style={styles.titleSlideLogoContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {logoUrl ? (
                <Image style={styles.titleSlideLogo} src={logoUrl} />
              ) : (
                <>
                  {/* Simple logo placeholder */}
                  <View style={{ 
                    width: 35, 
                    height: 35, 
                    backgroundColor: colors.primaryBlue,
                    marginRight: 10,
                    borderRadius: 4,
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                    <Text style={{ color: colors.white, fontSize: 18, fontWeight: 700 }}>G</Text>
                  </View>
                  <Text style={{ 
                    fontSize: 14, 
                    fontWeight: 700, 
                    color: colors.darkGray,
                    letterSpacing: 0.5
                  }}>{companyName.toUpperCase()}</Text>
                </>
              )}
            </View>
            <Text style={styles.titleSlideDate}>{formatDate()}</Text>
          </View>
        </View>
        
        {/* Main Content */}
        <View style={styles.titleSlideMainContent}>
          <Text style={styles.titleSlideTitle}>{title}</Text>
          {subtitle && <Text style={styles.titleSlideSubtitle}>{subtitle}</Text>}
          <Text style={styles.titleSlidePeriod}>{period}</Text>
          
          {/* Key Statistics with visual hierarchy */}
          <View style={styles.titleSlideStatsContainer}>
            <View style={styles.titleSlideStat}>
              <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                <Text style={styles.titleSlideStatValue}>{stats.totalDeals}</Text>
              </View>
              <Text style={styles.titleSlideStatLabel}>Transactions</Text>
            </View>
            
            <View style={{ width: 1, backgroundColor: colors.lightGray, marginHorizontal: 20 }} />
            
            <View style={styles.titleSlideStat}>
              <Text style={styles.titleSlideStatValue}>
                {formatValue(stats.totalValue)}
              </Text>
              <Text style={styles.titleSlideStatLabel}>Deal Value</Text>
            </View>
            
            <View style={{ width: 1, backgroundColor: colors.lightGray, marginHorizontal: 20 }} />
            
            <View style={styles.titleSlideStat}>
              <Text style={styles.titleSlideStatValue}>
                {stats.successRate.toFixed(0)}%
              </Text>
              <Text style={styles.titleSlideStatLabel}>Completion Rate</Text>
            </View>
            
            <View style={{ width: 1, backgroundColor: colors.lightGray, marginHorizontal: 20 }} />
            
            <View style={styles.titleSlideStat}>
              <Text style={styles.titleSlideStatValue}>
                {formatValue(stats.avgDealSize)}
              </Text>
              <Text style={styles.titleSlideStatLabel}>Average Size</Text>
            </View>
          </View>
          
          {/* Visual accent element */}
          <View style={{ 
            marginTop: 30,
            alignItems: 'center'
          }}>
            <Svg width="60" height="3" viewBox="0 0 60 3">
              <Path d={`M 0 1.5 L 20 1.5`} stroke={colors.lightBlue} strokeWidth="3" />
              <Path d={`M 25 1.5 L 35 1.5`} stroke={colors.mediumBlue} strokeWidth="3" />
              <Path d={`M 40 1.5 L 60 1.5`} stroke={colors.primaryBlue} strokeWidth="3" />
            </Svg>
          </View>
        </View>
        
        {/* Footer */}
        <View style={styles.titleSlideFooter}>
          <Text style={styles.titleSlideConfidential}>CONFIDENTIAL AND PROPRIETARY</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ 
              width: 20, 
              height: 1, 
              backgroundColor: colors.mediumGray,
              marginRight: 8
            }} />
            <Text style={styles.titleSlidePageNumber}>1</Text>
          </View>
        </View>
        
      </View>
    </Page>
  );
};