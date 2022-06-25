const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// path: 파일의 경로를 지정하고 변경
const { resolve } = require('path');

module.exports = {
  mode: 'development',
  // entry: build의 대상이 될 파일
  entry: {
    router: './router.js',
    app: './index.js',
  },
  // output: build 결과물
  output: {
    path: resolve(__dirname, 'dist'), // 'resolve': (차츰) ~가 되다
    filename: '[name].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html', // output file
      template: 'index.html', // template file
    }),
    new MiniCssExtractPlugin({ filename: 'app.css' }),
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ['dist'],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.hbs$/,
        // use:[]는 여러 loader를 지정할 때, loader는 단일로 사용
        loader: 'handlebars-loader',
      },
      {
        // 정규식(test)을 통해 loader가 인식될 파일을 잡아준다
        test: /\.css$/,
        // + 어떤 loader를 사용(use)하는지 정의
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
};
