# WebShop

php bin/console doctrine:schema:drop --force
php bin/console doctrine:database:create
php bin/console doctrine:schema:create
php bin/console doctrine:migration:migrate