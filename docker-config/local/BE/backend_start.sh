
# npm run build
# npm run start

npm run dev

node ./dist/src/scripts/createDb.js

./node_modules/typeorm/cli.js migration:run  -d ./dist/ormconfig.js

node ./dist/src/seeders/index.js