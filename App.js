import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Button,
  I18nManager,
  Image,
  TouchableOpacity,
} from 'react-native';
import './src/i18n/i18n';
import {useTranslation} from 'react-i18next';
import RNRestart from 'react-native-restart';
import AppIntroSlider from 'react-native-app-intro-slider';
import {SIZES, FONTS, COLORS} from './src/constants/theme';
import {SLIDES} from './src/data/slides';

const App = () => {
  const {t, i18n} = useTranslation();
  const [showHomePage, setShowHomePage] = React.useState(false);
  const isArabicMode = i18n.language === 'ar';

  const buttonLabel = label => {
    return (
      <View style={{padding: 17}}>
        <Text
          style={{
            fontSize: 18,
            fontFamily: FONTS.TAJAWAL_BOLD,
            color: COLORS.PRIMARY,
          }}>
          {label}
        </Text>
      </View>
    );
  };

  if (!showHomePage) {
    return (
      <>
        <TouchableOpacity
          style={{position: 'absolute', top: 50, right: 30, zIndex: 1}}
          onPress={async () => {
            await i18n.changeLanguage(i18n.language === 'ar' ? 'en' : 'ar');
            I18nManager.forceRTL(i18n.language === 'ar');
            RNRestart.Restart();
          }}>
          <Text
            style={{
              fontFamily: FONTS.TAJAWAL_BOLD,
              fontSize: 20,
              textAlign: 'center',
              marginTop: 20,
            }}>
            {isArabicMode ? 'English' : 'عربي'}
          </Text>
        </TouchableOpacity>
        <AppIntroSlider
          data={SLIDES}
          renderItem={({item}) => {
            return (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  padding: 10,
                  color: COLORS.WHITE,
                  paddingTop: 30,
                }}>
                <Image
                  source={item.img}
                  style={{width: SIZES.width - 10, height: 400}}
                  resizeMode={'contain'}
                />
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 30,
                    fontFamily: FONTS.TAJAWAL_BOLD,
                    fontWeight: 'bold',
                    color: COLORS.PRIMARY,
                  }}>
                  {isArabicMode ? item.titleAr : item.titleEn}
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    fontFamily: FONTS.TAJAWAL_REGULAR,
                    fontWeight: '500',
                    fontSize: 18,
                    marginTop: 8,
                    lineHeight: 27,
                    paddingHorizontal: 15,
                    color: COLORS.PRIMARY,
                  }}>
                  {isArabicMode ? item.descAr : item.descEn}
                </Text>
              </View>
            );
          }}
          activeDotStyle={{
            backgroundColor: COLORS.PRIMARY,
            width: 30,
          }}
          showSkipButton={true}
          renderNextButton={() => buttonLabel(isArabicMode ? 'التالي' : 'NEXT')}
          renderSkipButton={() => buttonLabel(isArabicMode ? 'تخطي' : 'SKIP')}
          renderDoneButton={() => buttonLabel(isArabicMode ? 'تم' : 'DONE')}
          onDone={() => setShowHomePage(true)}
          onSkip={() => setShowHomePage(true)}
        />
      </>
    );
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{padding: 30}}>
        <Text
          style={{
            textAlign: 'left',
            fontSize: 22,
            fontFamily: 'Tajawal-Medium',
            lineHeight: 30,
            marginTop: 50,
          }}>
          {t('HelloWelcome')}
        </Text>
        <TouchableOpacity
          style={{position: 'absolute', top: 0, right: 20}}
          onPress={async () => {
            await i18n.changeLanguage(i18n.language === 'ar' ? 'en' : 'ar');
            I18nManager.forceRTL(i18n.language === 'ar');
            RNRestart.Restart();
          }}>
          <Text
            style={{
              fontFamily: FONTS.TAJAWAL_BOLD,
              fontSize: 20,
              textAlign: 'center',
              marginTop: 20,
            }}>
            {isArabicMode ? 'English' : 'عربي'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default App;
