// 测试文件 - 包含一些 AI 常见的错误模式
async function fetchData() {
  // 幻觉 API 调用
  const data = await fetchJsonFromUnknownSource();

  // 不安全模式
  eval("console.log('dangerous')");

  // 缺失错误处理
  const response = await fetch('/api/data');

  // 过时语法
  var oldStyle = 'deprecated';
  const buf = new Buffer(10);
  const sliced = str.substr(0, 5);

  return response.json();
}
