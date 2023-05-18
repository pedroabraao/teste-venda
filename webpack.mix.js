const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')
    //Produto
    .js('resources/js/admin/produto/app.js', 'public/js/admin/produto').vue()
    .js('resources/js/admin/formapagamento/app.js', 'public/js/admin/formapagamento').vue()
    .js('resources/js/admin/usuario/app.js', 'public/js/admin/usuario').vue()
    .js('resources/js/admin/venda/app.js', 'public/js/admin/venda').vue()

mix.sass('resources/sass/app.scss', 'public/css');
mix.sass('resources/sass/fonts.scss', 'public/css');
mix.sass('resources/sass/styles.scss', 'public/css');


mix.babel([
    'resources/js/funcoes.js',
    'resources/js/jquery.mask.js',
    'resources/js/jquery.maskMoney.js',
], 'public/js/funcoes.js');
