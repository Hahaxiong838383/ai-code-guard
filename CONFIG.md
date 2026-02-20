# AI Sentinel 配置

## 支付设置

通过环境变量配置你的收款账户：

```bash
# PayPal - 设置你的 PayPal.me 用户名
export AI_SENTINEL_PAYPAL_ME_ID="your-paypal-username"

# 支付宝 - 设置你的支付宝收款码链接
# 获取方式：支付宝APP → 收钱 → 收钱码 → 复制链接
# 链接格式类似：https://qr.alipay.com/axxxx
export AI_SENTINEL_ALIPAY_DONATE_URL="https://qr.alipay.com/你的收款码ID"
```

## 已记录（待配置）

- 支付宝账号：050220219chenchuan@163.com
- PayPal 邮箱：13911184569@163.com

## 使用示例

```bash
# 生成支付链接
ai-sentinel pay --amount 9.99 --currency usd
ai-sentinel pay --amount 66 --currency cny
```
