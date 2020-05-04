import _ from 'lodash';
import { Platform } from 'react-native';
import { supportsDarkMode } from 'react-native-dark-mode';
import { AppTheme, InAppPurchaseInfo, InAppPurchaseType } from '../types';
import Strings, { AppName } from './strings';

export const IS_IOS = Platform.OS === 'ios';
export const IS_ANDROID = Platform.OS === 'android';

export const AppInfo = {
  id: 'appid',
  AppleAppID: '1497946231',
  GooglePackageName: 'com.mywebsite.myapp',
  AppStoreURL: 'https://apps.apple.com/us/app/id1497946231',
  SupportMail: 'support@hadev.fr',
  PrivacyPolicyURL: `https://hadev.fr/${AppName}/privacy_policy`,
  TermsOfServiceURL:
    'https://www.apple.com/legal/internet-services/itunes/dev/stdeula/',
  AppStoreConnectSharedSecret: '452f872c4ca44ddeaf1448f275e5d80c',
}; // TODO: replace GooglePackageName

export const AvailableThemes: AppTheme[] = ['dark', 'light'];
if (supportsDarkMode) AvailableThemes.unshift('auto');

export const InAppPurchasesSubscriptions: InAppPurchaseType[] = [
  'SubscriptionMonth',
  'SubscriptionYear',
];
export const InAppPurchasesForever: InAppPurchaseType[] = [
  'ForeverRegular',
  'ForeverGood',
  'ForeverGreat',
];

export const InAppPurchases: Record<InAppPurchaseType, InAppPurchaseInfo> = {
  SubscriptionMonth: {
    type: 'SubscriptionMonth',
    price: '0.99$',
    title: Strings.monthly,
    description: Strings.monthlySubscription,
    sku: IS_IOS
      ? 'fr.hadev.appid.app.ios.premiumMonth'
      : 'fr.hadev.appid.app.android.premiumMonth',
    group: 'Subscription',
    freeTrialAvailable: true,
  },
  SubscriptionYear: {
    type: 'SubscriptionYear',
    price: '8.99$',
    title: Strings.yearly,
    description: Strings.yearlySubscription,
    sku: IS_IOS
      ? 'fr.hadev.appid.app.ios.premiumYear'
      : 'fr.hadev.appid.app.android.premiumYear',
    group: 'Subscription',
    freeTrialAvailable: true,
  },
  ForeverRegular: {
    type: 'ForeverRegular',
    price: '19.99$',
    title: Strings.forever + ': ' + Strings.goodApp,
    description: Strings.payOnce,
    sku: IS_IOS
      ? 'fr.hadev.appid.app.ios.premiumForeverRegular'
      : 'fr.hadev.appid.app.android.premiumForeverRegular',
    group: 'Forever',
  },
  ForeverGood: {
    type: 'ForeverGood',
    price: '24.99$',
    title: Strings.forever + ': ' + Strings.iLike,
    description: Strings.payOnce,
    sku: IS_IOS
      ? 'fr.hadev.appid.app.ios.premiumForeverGood'
      : 'fr.hadev.appid.app.android.premiumForeverGood',
    group: 'Forever',
  },
  ForeverGreat: {
    type: 'ForeverGreat',
    price: '29.99$',
    title: Strings.forever + ': ' + Strings.iLove,
    description: Strings.payOnce,
    sku: IS_IOS
      ? 'fr.hadev.appid.app.ios.premiumForeverGreat'
      : 'fr.hadev.appid.app.android.premiumForeverGreat',
    group: 'Forever',
  },
};

export const InAppPurchasesArray: InAppPurchaseInfo[] = _.values(
  InAppPurchases,
);

export const InAppPurchasesSKUsArray: string[] = InAppPurchasesArray.map(
  iap => iap.sku,
);
