// tslint:disable: max-line-length
import LocalizedStrings from 'react-native-localization';

export const AppName = 'Scanit';

export const LANGUAGES = ['en'];

const Strings = new LocalizedStrings({
  en: {
    settings: 'Settings',
    contactUs: 'Contact us',
    goPremium: 'Go premium',
    rate: 'Rate',
    share: 'Share',
    subscribe: 'Subscribe',
    version: 'Version',
    feedback: 'Feedback',
    theme: 'Theme',
    light: 'Light',
    dark: 'Dark',
    auto: 'Auto',
    empty: 'Empty',
    yes: 'Yes',
    no: 'No',
    or: 'Or',
    noThanks: 'No, thanks',
    none: 'None',
    back: 'Back',
    cancel: 'Cancel',
    select: 'Select',
    done: 'Done',
    save: 'Save',
    more: 'More',
    edit: 'Edit',
    reset: 'Reset',
    archive: 'Archive',
    delete: 'Delete',
    deleteForver: 'Delete forever',
    contactUsSubject: AppName + ' Feedback',
    shareWithFriends: 'Share with friends',
    shareWithFriendsMessage: 'Hey, checkout this coutdown app:',
    restorePurchase: 'Restore purchases',
    restoreSuccessful: 'Restore successful',
    restoreSuccessfulMsg: `You successfully restored ${AppName} Premium`,
    deleteWarning: 'Are you sure you want to permanently delete this event?',
    thankyouMessage:
      // tslint:disable-next-line: max-line-length
      'Thank you very much for your support. Would you might to give us a review? This would be really appriciated.',
    areYouEnjoying: `Are you enjoying ${AppName}?`,
    monthly: 'Monthly',
    monthlySubscription: 'Monthly subscription',
    monthlyDescription: 'Pay one per month',
    yearly: 'Yearly',
    yearlySubscription: 'Yearly subscription',
    yearlyDescription: 'Pay one every year',
    forever: 'Forever',
    oneTimePurchase: 'One time purchase',
    payOnce: "Pay once & it's yours forever",
    goodApp: 'Good app',
    iLike: 'I like it',
    iLove: 'Love this app ❤️',
    tryAndSubsribe: 'Try free and subscribe',
    purchaseForever: 'Purchase forever',
    freeTrialNotice: `After free trial, ${AppName} Premium is {0} per {1}`,
    subscriptionNotice:
      'Subscription automatically renews unless auto-renew is turned off at least 24-hours before the end of the current period by going to your iOS Account Settings after purchase. Payment will be charged to iTunes Account. Any unused portion of free trial period, if offered, will be forfeited when you purchase a subscription.',
    noPurchaseToRestore: 'There is no purchase to restore',
    privacyPolicy: 'Privacy policy',
    termsOfService: 'Terms of service',
    free14dayTrial: 'Free 14-day trial',
    subscriptionEnded: 'Subscription ended',
    subscriptionEndedMsg:
      'Your Premium subscription is ended. You can subscribe again at any time.',
  },
  // fr: {
  //   hello: 'Bonjour',
  // },
});

export default Strings;
