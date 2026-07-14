const mapping = {
  '%E8%BD%A6%E7%A5%A8%E7%A5%A8': ['vip+watch_vip'],
  'Locket': ['Gold']
};

const userAgent = $request.headers["User-Agent"] || $request.headers["user-agent"] || "";
const responseBody = JSON.parse($response.body);

const subscriptionData = {
  auto_resume_date: null,
  display_name: "locket_1600_1y",
  is_sandbox: true,
  ownership_type: "PURCHASED",
  billing_issues_detected_at: null,
  management_url: "https://apps.apple.com/account/subscriptions",
  period_type: "normal",
  price: {
    amount: 399000.0,
    currency: "VND"
  },
  expires_date: "9999-04-24T00:00:00Z",
  grace_period_expires_date: null,
  refunded_at: null,
  unsubscribe_detected_at: null,
  original_purchase_date: "2003-04-24T00:00:00Z",
  purchase_date: "2003-04-24T00:00:00Z",
  store: "app_store",
  store_transaction_id: "2000000024042003"
};

const entitlementData = {
  grace_period_expires_date: null,
  purchase_date: "2003-04-24T00:00:00Z",
  product_identifier: "locket_1600_1y",
  expires_date: "9999-04-24T00:00:00Z"
};

const matchedKey = Object.keys(mapping).find(key => userAgent.includes(key));

if (matchedKey) {
  const [entitlementId, productId] = mapping[matchedKey];
  
  if (productId) {
    entitlementData.product_identifier = productId;
    responseBody.subscriber.subscriptions[productId] = subscriptionData;
  } else {
    responseBody.subscriber.subscriptions["locket_1600_1y"] = subscriptionData;
  }
  
  responseBody.subscriber.entitlements[entitlementId] = entitlementData;
} else {
  // Default values if no matching User-Agent is found
  responseBody.subscriber.subscriptions["locket_1600_1y"] = subscriptionData;
  responseBody.subscriber.entitlements.pro = entitlementData;
}

$done({
  body: JSON.stringify(responseBody)
});