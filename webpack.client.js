// webpack.client.js
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development', // Cambia a 'production' en producción
  entry: './src/index.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/' // Ruta pública de los assets
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      // Para archivos JavaScript/JSX
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      // Para archivos Sass con CSS Modules (*.module.scss)
      {
        test: /\.module\.s(a|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          'sass-loader'
        ]
      },
      // Para archivos Sass globales
      {
        test: /\.s(a|c)ss$/,
        exclude: /\.module\.(s(a|c)ss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource', 
        // Esto copiará las imágenes a la carpeta de salida y exportará la URL.
        // Puedes personalizar la ruta de salida con generator:
        generator: {
          filename: 'images/[hash][ext][query]'
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.css'
    }),
  ]
};
