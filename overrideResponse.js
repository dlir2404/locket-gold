let body = $response.body;

if (body) {
  try {
    let obj = JSON.parse(body);
    
    // Config for Locket Gold and Pro apps
    const goldProductId = "locket_gold_yearly";
    const proProductId = "pro_yearly";
    
    const subscriptionGold = {
      "is_sandbox": false,
      "ownership_type": "PURCHASED",
      "billing_issues_detected_at": null,
      "period_type": "normal",
      "expires_date": "2099-12-31T23:59:59Z",
      "grace_period_expires_date": null,
      "unsubscribe_detected_at": null,
      "original_purchase_date": "2026-08-16T17:00:00Z",
      "purchase_date": "2026-08-16T17:00:00Z",
      "store": "app_store"
    };

    const subscriptionPro = {
      ...subscriptionGold
    };

    const entitlementGold = {
      "grace_period_expires_date": null,
      "purchase_date": "2026-08-16T17:00:00Z",
      "product_identifier": goldProductId,
      "expires_date": "2099-12-31T23:59:59Z"
    };

    const entitlementPro = {
      "grace_period_expires_date": null,
      "purchase_date": "2026-08-16T17:00:00Z",
      "product_identifier": proProductId,
      "expires_date": "2099-12-31T23:59:59Z"
    };

    if (!obj.subscriber) obj.subscriber = {};
    if (!obj.subscriber.subscriptions) obj.subscriber.subscriptions = {};
    if (!obj.subscriber.entitlements) obj.subscriber.entitlements = {};

    // Inject Locket Gold subscription & entitlement
    obj.subscriber.subscriptions[goldProductId] = subscriptionGold;
    obj.subscriber.subscriptions["locket_1600_1y"] = subscriptionGold; // Fallback to old product ID
    obj.subscriber.entitlements["Gold"] = entitlementGold;

    // Inject generic Pro entitlement for other apps
    obj.subscriber.subscriptions[proProductId] = subscriptionPro;
    obj.subscriber.entitlements["pro"] = entitlementPro;
    obj.subscriber.entitlements["premium"] = {
      ...entitlementPro,
      "product_identifier": proProductId
    };

    body = JSON.stringify(obj);
  } catch (e) {
    console.log("RevenueCat rewrite error: " + e);
  }
}

$done({ body });