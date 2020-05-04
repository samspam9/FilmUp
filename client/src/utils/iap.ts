import _ from 'lodash';
import { Platform } from 'react-native';
import RNIap, { SubscriptionPurchase } from 'react-native-iap';

export async function isSubscriptionActive(
  appstoreConnectSharedSecret: string,
  androidSkus: string[],
  availablePurchasesParam?: SubscriptionPurchase[],
) {
  const availablePurchases =
    availablePurchasesParam || (await RNIap.getAvailablePurchases());
  if (Platform.OS === 'ios') {
    const sortedAvailablePurchases = availablePurchases.sort(
      (a: any, b: any) => b.transactionDate - a.transactionDate,
    );
    const latestAvailableReceipt =
      sortedAvailablePurchases[0].transactionReceipt;

    const isTestEnvironment = __DEV__;
    const decodedReceipt = await RNIap.validateReceiptIos(
      {
        'receipt-data': latestAvailableReceipt,
        password: appstoreConnectSharedSecret,
      },
      isTestEnvironment,
    );
    if (!decodedReceipt || !decodedReceipt.latest_receipt_info) {
      console.warn('decodedReceipt failed', decodedReceipt);
      return false;
    }
    const latestReceiptInfo = decodedReceipt.latest_receipt_info;
    const isSubValid = !!_.find(latestReceiptInfo, (receipt: any) => {
      const expirationInMilliseconds = Number(receipt.expires_date_ms);
      const nowInMilliseconds = Date.now();
      console.log(receipt);
      return expirationInMilliseconds > nowInMilliseconds;
    });
    return isSubValid;
  }
  if (Platform.OS === 'android' && androidSkus && androidSkus.length > 0) {
    // When an active subscription expires, it does not show up in
    // available purchases anymore, therefore we can use the length
    // of the availablePurchases array to determine whether or not
    // they have an active subscription.
    for (const availablePurchase of availablePurchases) {
      if (androidSkus.includes(availablePurchase.productId)) {
        return true;
      }
    }
    return false;
  }
}
