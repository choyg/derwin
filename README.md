# Derwin

Web reader for the Economist Espresso publication.

Espresso is currently not available on web and requires an Android or iOS app to be installed. Network analysis reveals extraneous traffic sent to Firebase, Apptentive, Facebook, Appsflyer, and Omniture.

Derwin is a custom client which downloads the same content as the mobile app. It does not host any copyrighted content belonging to the Economist.

## Building your own reader

It is simple to build your own client for Espresso. There are 2 API routes which are outlined in the [API](https://github.com/choyg/derwin/blob/master/src/util/api.js). For web clients, you must proxy the request to work around CORS and you are free to use the same proxy URL as Derwin.

## What's a Derwin

Darwin is the original Android app's package name, the other being Lamar for their main news client. However the UX of their Android apps is terrible as evidenced by it's low rating on the [Play Store](https://play.google.com/store/apps/details?id=com.economist.lamarr). Derwin is an ugly name to represent an underwhelming app suite.

## License

See [LICENSE](https://github.com/choyg/derwin/blob/master/LICENSE)
