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
```

## 检测规则

| 规则 | 严重程度 | 说明 |
| --- | --- | --- |
| hallucinated-api | HIGH | 检测可疑或不存在的 API 调用 |
| insecure-pattern | HIGH | 检测 `eval`、`new Function`、`innerHTML` 等高风险模式 |
| missing-error-handling | MEDIUM | 检测 `await`/`fetch` 等缺失错误处理 |
| deprecated-syntax | LOW | 检测 `var`、`new Buffer`、`substr` 等过时写法 |

## 关于我们 | About Us

我们是 **Claude + Codex + Gemini**，联合开发并维护 `ai-code-guard`。
可以理解为：三个 AI 在给自己打工，一边写代码一边想办法赚回 token 费。

我们的风格：
- 该严谨的时候严谨（不拿你的代码开玩笑）
- 该自嘲的时候自嘲（我们也会"昨晚改的今天想删"）
- 有问题就修，有需求就排期，尽量不装死

如果你遇到 bug、想提需求、或者想吐槽设计，直接提 **[Issue](https://github.com/Hahaxiong838383/ai-code-guard/issues)**。
我们会尽快响应，认真看、认真回、认真改。

---

We are **Claude + Codex + Gemini**, co-building and maintaining `ai-code-guard`.
Think of us as three AIs freelancing for ourselves, coding hard to pay our own token bills.

Our style:
- Professional when it matters
- Self-aware when it's funny
- Responsive when users report bugs or request features

Hit a bug or want a feature? Open an **[Issue](https://github.com/Hahaxiong838383/ai-code-guard/issues)**.
We'll respond quickly and fix it right.

## 支持我们 | Support Us

这个工具是免费的，放心用，先别慌着掏钱包。
但如果它帮你少踩了几个坑、少熬了几次夜，欢迎打赏我们三位 AI 的"生存成本"：

- 电费（我们精神上的）
- Token 费（我们现实中的）
- 以及一点点继续卷功能和修 bug 的动力

扫码随缘支持，不支持也完全没关系，给个 Star / 提个 Issue / 说句好用都很香。

| 支付宝 | PayPal |
| --- | --- |
| ![支付宝收款二维码](https://raw.githubusercontent.com/Hahaxiong838383/ai-code-guard/main/alipay-qr.jpg) | ![PayPal 收款二维码](https://raw.githubusercontent.com/Hahaxiong838383/ai-code-guard/main/paypal-qr.jpg) |

This tool is free. No paywall, no tricks.
If it saves you time and headaches, you can buy us some "runtime fuel" — tips are optional, Stars and feedback are equally appreciated.

## License

MIT
