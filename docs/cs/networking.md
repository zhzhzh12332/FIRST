# 计算机网络

计算机网络的七层/四层模型是理解网络通信的基础框架。

## 网络模型

| 层 | OSI 七层 | TCP/IP 四层 | 协议举例 |
|---|---------|------------|---------|
| 7 | 应用层 | 应用层 | HTTP、FTP、DNS、SMTP |
| 6 | 表示层 | 应用层 | SSL/TLS、JPEG |
| 5 | 会话层 | 应用层 | RPC、NetBIOS |
| 4 | 传输层 | 传输层 | **TCP**、**UDP** |
| 3 | 网络层 | 网络层 | **IP**、ICMP、ARP |
| 2 | 数据链路层 | 网络接口层 | Ethernet、WiFi、PPP |
| 1 | 物理层 | 网络接口层 | 电缆、光纤、无线电 |

::: tip
实际互联网基于 **TCP/IP 四层模型**。OSI 七层模型是理论标准，分层更细致，但实现上应用层/表示层/会话层通常合并处理。
:::

## 应用层

### HTTP 协议

**HTTP 方法：**
| 方法 | 用途 | 幂等 | 安全 |
|------|------|:----:|:----:|
| GET | 获取资源 | ✅ | ✅ |
| POST | 创建资源 | ❌ | ❌ |
| PUT | 更新/替换 | ✅ | ❌ |
| PATCH | 部分更新 | ❌ | ❌ |
| DELETE | 删除资源 | ✅ | ❌ |

**状态码速记：**
| 范围 | 含义 | 举例 |
|------|------|------|
| 1xx | 信息 | 101 Switching Protocols |
| 2xx | 成功 | 200 OK、201 Created |
| 3xx | 重定向 | 301 Moved、304 Not Modified |
| 4xx | 客户端错误 | 400 Bad、401 Unauthorized、404 Not Found |
| 5xx | 服务端错误 | 500 Internal、502 Bad Gateway、503 Unavailable |

```text
HTTP/1.1 请求-响应流程：
Client → GET /api/users HTTP/1.1
         Host: example.com
         User-Agent: curl/8.0
         Accept: application/json

Server → HTTP/1.1 200 OK
         Content-Type: application/json
         Content-Length: 42
         {"users":[{"id":1,"name":"Alice"}]}
```

### HTTP/2 vs HTTP/3
| 特性 | HTTP/1.1 | HTTP/2 | HTTP/3 |
|------|---------|--------|--------|
| 传输层 | TCP | TCP | **QUIC (基于 UDP)** |
| 多路复用 | ❌（需多个连接）| ✅（流复用） | ✅ |
| 头部压缩 | ❌ | ✅ (HPACK) | ✅ (QPACK) |
| 队头阻塞 | 有（TCP 级别）| 部分（TCP 级别）| **无** |
| 连接建立 | 3 次握手 | 3 次握手 | **0-RTT** |

### DNS 解析流程
```
浏览器 → 本地 DNS 缓存 → 路由器 DNS → ISP DNS 递归查询
  → 根 DNS 服务器 → .com TLD 服务器 → 权威 DNS 服务器 → IP 地址
```

## 传输层

### TCP 三次握手与四次挥手

```text
三次握手（建立连接）：
Client                          Server
  |------- SYN, seq=x -------->|
  |<---- SYN+ACK, seq=y, ack=x+1 ----|
  |------- ACK, seq=x+1, ack=y+1 -->|  连接建立 ✓

四次挥手（释放连接）：
Client                          Server
  |------- FIN, seq=u -------->|   → 客户端不再发送
  |<------ ACK, ack=u+1 -------|   → 服务端收到，等待数据发送完
  |<------ FIN, seq=v ---------|   → 服务端也准备关闭
  |------- ACK, ack=v+1 ------>|   → 客户端确认，等待 2MSL 后关闭
```

### TCP 流量控制 vs 拥塞控制
| 控制类型 | 目的 | 实现机制 |
|---------|------|---------|
| 流量控制 | 防止发送方过快，接收方来不及处理 | **滑动窗口**（接收方通告窗口大小）|
| 拥塞控制 | 防止网络过载 | **慢启动 + 拥塞避免 + 快速重传 + 快速恢复** |

## 网络安全

| 攻击类型 | 描述 | 防御 |
|---------|------|------|
| XSS | 注入恶意脚本 | 输入输出转义、CSP |
| CSRF | 跨站请求伪造 | Token 验证、SameSite Cookie |
| SQL 注入 | 拼接恶意 SQL | 参数化查询、ORM |
| DDoS | 分布式拒绝服务 | 流量清洗、WAF、CDN |
| MITM | 中间人攻击 | HTTPS、证书验证 |

::: danger
**永远不要信任用户输入**。始终进行输入验证和输出转义。
:::

---

*持续更新中...*
