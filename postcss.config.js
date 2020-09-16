module.exports = (ctx) => ({
 plugins: {
  'postcss-import': {
    path: ['app/assets/']
  },
  ... // 사용하고자 하는 플러그인들을 하나씩 적어넣는다.

},}
)