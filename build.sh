#!/bin/sh
rm -frv $SCREENSHOTS dist
npm install
(npm run json-server &) &&
while [ ! -z "$(nc -z -v -w5 10.30.30.3 6006)" ]; do
  sleep 1s
done
npm run test:unit &&
VUE_APP_API=$API_URL_DEV npm run build &&
cp -frv dist/* /ws/build &&
npm run test:chrome && npm run test:firefox &&
VUE_APP_API=$API_URL_PRO npm run build &&
rm -frv /ws/build/* &&
cp -frv dist/* /ws/build &&
echo 'ok'
#PORT=$APP_PORT_DEV VUE_APP_API=$API_URL_DEV
