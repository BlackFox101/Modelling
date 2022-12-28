# WebShop

```bash
cd docker
bin/webshop-up
bin/webshop-sh
composer install
php bin/console doctrine:database:create
```

php bin/console doctrine:schema:drop --force
php bin/console doctrine:database:create
php bin/console doctrine:schema:create
php bin/console doctrine:migration:migrate