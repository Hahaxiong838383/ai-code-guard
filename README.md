# AI Code Guard

AI 代码的信任过滤器，在代码进入仓库前自动拦截风险。

> "AI 写代码，我来守门"

## 安装

```bash
npm install -g ai-code-guard
```

## 使用示例

```bash
# 扫描当前项目
ai-code-guard .

# 扫描指定目录或文件
ai-code-guard src
ai-code-guard src/index.ts

# 生成支付链接
ai-code-guard pay --amount 9.99 --currency usd
ai-code-guard pay --amount 66 --currency cny
```

## 检测规则

| 规则 | 严重程度 | 说明 |
| --- | --- | --- |
| hallucinated-api | HIGH | 检测可疑或不存在的 API 调用 |
| insecure-pattern | HIGH | 检测 `eval`、`new Function`、`innerHTML` 等高风险模式 |
| missing-error-handling | MEDIUM | 检测 `await`/`fetch` 等缺失错误处理 |
| deprecated-syntax | LOW | 检测 `var`、`new Buffer`、`substr` 等过时写法 |

## 支付支持

如果你希望支持项目持续维护，可以使用以下方式打赏：
https://qr.alipay.com/fkx157688bu4y9xstidba88

## License

MIT
