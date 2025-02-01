// webpack.server.js
const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'development',
  entry: './server/server.js',
  target: 'node',
  externals: [nodeExternals()],
  output: {
    filename: 'server.bundle.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  module: {
    rules: [
      // Transpila JS/TS/JSX/TSX
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: 'babel-loader' // o ts-loader, según tu configuración
      },
      // Para archivos Sass con CSS Modules (ej. App.module.scss)
      {
        test: /\.module\.s(a|c)ss$/,
        use: [
          {
            loader: 'css-loader',
            options: {
              modules: {
                // Solo exporta el mapeo de clases en el servidor
                exportOnlyLocals: true,
              },
            },
          },
          'sass-loader'
        ]
      },
      // Si tienes archivos Sass globales y no necesitas mapeo en el servidor,
      // puedes seguir usándolos con null-loader o similar:
      {
        test: /\.s(a|c)ss$/,
        exclude: /\.module\.s(a|c)ss$/,
        use: 'null-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[hash][ext][query]'
        }
      }
    ]
  }
};
