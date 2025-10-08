<div align="center">

# 🚀 Anjaliyzer

### *Advanced CLI Trend Analyzer with 50+ Technical Indicators*

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Node.js](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)](https://nodejs.org/)
[![npm](https://img.shields.io/badge/npm-%3E%3D6.0.0-blue)](https://www.npmjs.com/)

**Analyze 100+ symbols across Crypto, Forex, Stocks & Indices**

[Features](#-features) • [Installation](#-installation) • [Usage](#-usage) • [Indicators](#-all-50-indicators) • [Contact](#-developer)

---

</div>

## 📸 Preview

```
╔══════════════════════════════════════════════════════════════════╗
║      █████╗ ███╗   ██╗     ██╗ █████╗ ██╗     ██╗██╗   ██╗███████╗██████╗  ║
║     ██╔══██╗████╗  ██║     ██║██╔══██╗██║     ██║╚██╗ ██╔╝╚══███╔╝██╔══██╗ ║
║     ███████║██╔██╗ ██║     ██║███████║██║     ██║ ╚████╔╝   ███╔╝ ██████╔╝ ║
║     ██╔══██║██║╚██╗██║██   ██║██╔══██║██║     ██║  ╚██╔╝   ███╔╝  ██╔══██╗ ║
║     ██║  ██║██║ ╚████║╚█████╔╝██║  ██║███████╗██║   ██║   ███████╗██║  ██║ ║
║     ╚═╝  ╚═╝╚═╝  ╚═══╝ ╚════╝ ╚═╝  ╚═╝╚══════╝╚═╝   ╚═╝   ╚══════╝╚═╝  ╚═╝ ║
║                                                                              ║
║                    v2.0 - 50 Technical Indicators                           ║
╚══════════════════════════════════════════════════════════════════════════════╝

╔════════════════════════════════════════════════════════════╗
║            🟢 TOP 3 BUY SIGNALS 🟢                       ║
╚════════════════════════════════════════════════════════════╝

1. BTC-USD        72.5% (36↑ 12↓ 2○)
2. ETH-USD        68.0% (34↑ 14↓ 2○)
3. SOL-USD        65.5% (33↑ 15↓ 2○)
```

---

## ✨ Features

<table>
<tr>
<td>

### 🎯 Core Features
- ✅ **50 Technical Indicators**
- ✅ **100+ Symbols** 
- ✅ **Pure CLI Interface**
- ✅ **Real-time Data**
- ✅ **Modular Architecture**

</td>
<td>

### 📊 Analysis
- 🔍 Single Symbol
- 💰 All Crypto (25)
- 💱 All Forex (15)
- 📈 All Stocks (60)
- 🌐 Everything (100+)

</td>
<td>

### ⚡ Performance
- 🚀 Fast Analysis
- 📡 Yahoo Finance API
- 🎨 Color-Coded Output
- 🔄 Batch Processing
- 📊 Top 3 Signals

</td>
</tr>
</table>

---

## 🛠️ Installation

### Prerequisites

- **Node.js** >= 14.0.0
- **npm** >= 6.0.0

### Quick Start

```bash
# Clone repository
git clone https://github.com/shivaya-dav/anjaliyzer.git
cd anjaliyzer

# Install dependencies
npm install

# Run application
node index.js
```

### Manual Setup

```bash
# Create project folder
mkdir anjaliyzer && cd anjaliyzer

# Initialize npm
npm init -y

# Install dependencies
npm install yahoo-finance2 mathjs chalk inquirer

# Create files (see Project Structure below)
```

---

## 📁 Project Structure

```
anjaliyzer/
│
├── 📄 index.js              # Main CLI application
├── 📄 analyzer.js           # Analysis engine
├── 📄 indicators.js         # All 50 indicators
├── 📄 symbols.json          # Symbol database (100+)
├── 📄 package.json          # Dependencies
├── 📄 .gitignore            # Git ignore rules
├── 📄 LICENSE               # MIT License
└── 📄 README.md             # This file
```

---

## 🚀 Usage

### Starting the Application

```bash
node index.js
```

or

```bash
npm start
```

### Interactive Menu

<div align="center">

| Option | Description | Symbols |
|--------|-------------|---------|
| 📈 **Single Symbol** | Analyze one specific symbol | 1 |
| 💰 **All Crypto** | Analyze all cryptocurrencies | 25 |
| 💱 **All Forex** | Analyze all forex pairs | 15 |
| 📊 **All Stocks** | Analyze all stock symbols | 60 |
| 🌐 **Analyze Everything** | Complete market scan | 100+ |
| ❌ **Exit** | Close application | - |

</div>

### Timeframe Options

- **5m** - 5 Minutes (Scalping)
- **15m** - 15 Minutes (Day Trading)
- **1h** - 1 Hour (Swing Trading)
- **4h** - 4 Hours (Position Trading)
- **1d** - 1 Day (Long Term)
- **1wk** - 1 Week (Investment)

---

## 📊 Example Workflows

### 🎯 Quick Analysis (Single Symbol)

```bash
$ node index.js

? Select analysis mode: Single Symbol
? Enter symbol: BTC-USD
? Select timeframe: 1 Hour

⏳ Analyzing 1 symbol(s)...
[1/1] BTC-USD... ✓ UP 72.5%

╔════════════════════════════════════════════════════════════╗
║                   ANALYSIS RESULT                          ║
╚════════════════════════════════════════════════════════════╝

Symbol:      BTC-USD
Direction:   UP 🟢
Confidence:  72.5%
Signals:     36↑ 12↓ 2○
Price:       $45,123.50
```

### 🔍 Market Scanner (All Crypto)

```bash
$ node index.js

? Select analysis mode: All Crypto (25)
? Select timeframe: 1 Hour

⏳ Analyzing 25 symbol(s)...

[1/25] BTC-USD... ✓ UP 72.5%
[2/25] ETH-USD... ✓ UP 68.0%
[3/25] BNB-USD... ✓ DOWN 65.2%
[4/25] XRP-USD... ✓ DOWN 67.5%
...

╔════════════════════════════════════════════════════════════╗
║            🟢 TOP 3 BUY SIGNALS 🟢                       ║
╚════════════════════════════════════════════════════════════╝

1. BTC-USD        72.5% (36↑ 12↓ 2○)
2. ETH-USD        68.0% (34↑ 14↓ 2○)
3. SOL-USD        65.5% (33↑ 15↓ 2○)

╔════════════════════════════════════════════════════════════╗
║            🔴 TOP 3 SELL SIGNALS 🔴                      ║
╚════════════════════════════════════════════════════════════╝

1. DOGE-USD       70.0% (14↑ 35↓ 1○)
2. XRP-USD        67.5% (15↑ 34↓ 1○)
3. ADA-USD        65.0% (16↑ 33↓ 1○)
```

---

## 📈 Understanding Results

### Signal Types

| Signal | Meaning | Action |
|--------|---------|--------|
| 🟢 **UP** | Bullish Trend | Consider Buy |
| 🔴 **DOWN** | Bearish Trend | Consider Sell |
| 🟡 **NEUTRAL** | No Clear Trend | Wait & Watch |

### Confidence Score

```
85-100%  ████████ Extremely Strong
70-84%   ██████   Very Strong  
55-69%   ████     Strong
45-54%   ██       Moderate
0-44%    █        Weak
```

### Signal Breakdown

- **↑ UP** - Number of bullish indicators
- **↓ DOWN** - Number of bearish indicators  
- **○ NEUTRAL** - Number of neutral indicators

**Example:** `36↑ 12↓ 2○` means:
- 36 indicators say BUY
- 12 indicators say SELL
- 2 indicators are NEUTRAL
- **Confidence:** 72% (36/50 = 72%)

---

## 🔬 All 50 Indicators

<details>
<summary><b>Click to expand complete indicator list</b></summary>

### Moving Averages (15)
1. **SMA 200** - Simple Moving Average
2. **EMA 200** - Exponential Moving Average
3. **EMA 50/200** - Golden/Death Cross
4. **WMA 20** - Weighted Moving Average
5. **HMA 55** - Hull Moving Average
6. **SMMA 14** - Smoothed Moving Average
7. **TEMA 20** - Triple Exponential MA
8. **DEMA 20** - Double Exponential MA
9. **ALMA 9** - Arnaud Legoux MA
10. **T3** - Tillson T3
11. **Zero Lag EMA** - ZLEMA
12. **FRAMA** - Fractal Adaptive MA
13. **KAMA/AMA** - Kaufman Adaptive MA
14. **LSMA** - Least Squares MA
15. **McGinley Dynamic** - McGinley MA

### Trend Indicators (15)
16. **SuperTrend** - Volatility-based trend
17. **Ichimoku Cloud** - Japanese cloud system
18. **Parabolic SAR** - Stop and Reverse
19. **ADX** - Average Directional Index
20. **DMI** - Directional Movement Index
21. **Vortex Indicator** - VI+/VI-
22. **GMMA** - Guppy Multiple MA
23. **Rainbow MA** - Multi-MA system
24. **EMA Ribbon** - 8-layer EMA
25. **Trend Magic** - EMA+ATR filter
26. **Linear Regression** - Slope analysis
27. **Regression Channel** - Price channels
28. **Trendline Auto** - Auto trendlines
29. **Slope Direction** - Directional slope
30. **MA Angle** - Moving average angle

### Momentum & Oscillators (10)
31. **TSI** - True Strength Index
32. **Fisher Transform** - Gaussian oscillator
33. **Schaff Trend Cycle** - STC
34. **QQE** - Quantitative Qualitative E
35. **Laguerre Filter** - Adaptive filter
36. **Heikin Ashi** - Japanese candlesticks
37. **Tenkan Sen** - Ichimoku component
38. **Kijun Sen** - Ichimoku component
39. **JMA** - Jurik MA (approx)
40. **Instant Trendline** - Ehlers method

### Price & Volume (5)
41. **VWMA** - Volume Weighted MA
42. **CMA** - Cumulative MA
43. **Median Price MA** - (H+L)/2 MA
44. **Donchian Channel** - Price channel
45. **Price Channel** - High/Low channel

### Advanced Analytics (5)
46. **Gann HiLo** - Gann activator
47. **FDI** - Fractal Dimension Index
48. **Polynomial Regression** - Curve fitting
49. **ADX/DMI System** - Combined system
50. **SlopeLine** - EMA slope line

</details>

---

## 💾 Available Symbols

<details>
<summary><b>📊 All 100+ Symbols (Click to expand)</b></summary>

### 💰 Cryptocurrency (25)
```
BTC-USD   ETH-USD   BNB-USD   XRP-USD   ADA-USD
DOGE-USD  SOL-USD   DOT-USD   MATIC-USD LTC-USD
AVAX-USD  LINK-USD  UNI-USD   ATOM-USD  XLM-USD
ALGO-USD  VET-USD   FIL-USD   TRX-USD   ETC-USD
HBAR-USD  APT-USD   ARB-USD   OP-USD    INJ-USD
```

### 💱 Forex Pairs (15)
```
EURUSD=X  GBPUSD=X  USDJPY=X  AUDUSD=X  USDCAD=X
USDCHF=X  NZDUSD=X  EURGBP=X  EURJPY=X  GBPJPY=X
AUDJPY=X  EURAUD=X  EURCHF=X  GBPAUD=X  GBPCAD=X
```

### 📈 US Stocks (60)
```
AAPL  MSFT  GOOGL  AMZN  NVDA  TSLA  META  BRK-B
V     JPM   JNJ    WMT   PG    MA    UNH   HD
DIS   BAC   ADBE   CRM   NFLX  CSCO  PEP   KO
INTC  NKE   AMD    PYPL  CMCSA ORCL  ABT   VZ
T     MRK   COST   TMO   AVGO  PFE   ABBV  ACN
TXN   DHR   NEE    LIN   UNP   HON   UPS   QCOM
RTX   LOW   MS     SPGI  INTU  CAT   GS    IBM
BA    SBUX  AMAT   BLK
```

### 📊 Major Indices (7)
```
^GSPC (S&P 500)      ^DJI (Dow Jones)    ^IXIC (NASDAQ)
^FTSE (FTSE 100)     ^N225 (Nikkei 225)  ^HSI (Hang Seng)
^GDAXI (DAX)
```

</details>

---

## 🔧 Troubleshooting

<details>
<summary><b>Common Issues & Solutions</b></summary>

### ❌ "Cannot find module"

```bash
# Solution: Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### ❌ "Insufficient data"

**Causes:**
- Invalid symbol
- No data for selected timeframe
- Network issues

**Solutions:**
- Verify symbol exists (check symbols.json)
- Try different timeframe
- Check internet connection

### ❌ "Rate limiting" / "Too many requests"

**Solution:**
```bash
# Wait 2-5 minutes, then try again
# Or analyze fewer symbols at once
```

### ❌ Module type errors

**Solution:**
```json
// Make sure package.json has:
{
  "type": "module"
}
```

</details>

---

## 💼 Custom Services

<div align="center">

### Need Something Custom? I've Got You Covered! 🚀

</div>

| Service | Description |
|---------|-------------|
| 🎨 **Custom Indicators** | Add your proprietary technical indicators |
| 🤖 **Algo Trading Bots** | Fully automated trading systems |
| 📊 **Backtesting** | Test strategies on historical data |
| 💼 **Portfolio Tools** | Custom portfolio management |
| 🔗 **Exchange Integration** | Connect to Binance, Coinbase, etc. |
| 🔔 **Notifications** | Telegram/Discord/Email alerts |
| 📱 **Mobile App** | iOS/Android trading apps |
| 🎓 **Training** | 1-on-1 algo trading mentorship |

<div align="center">

### 📧 **Contact for Custom Solutions**

**GitHub:** [@shivaya-dav](https://github.com/shivaya-dav)  
**Instagram:** [@shivaya.dav](https://instagram.com/shivaya.dav)

*💡 Free consultation available!*

</div>

---

## 👨‍💻 Developer

<div align="center">

<img src="https://github.com/shivaya-dav.png" width="100" style="border-radius: 50%;">

### shivaya-dav

**Full-Stack Developer | Algo Trading Specialist | Technical Analysis Expert**

[![GitHub](https://img.shields.io/badge/GitHub-shivaya--dav-181717?style=for-the-badge&logo=github)](https://github.com/shivaya-dav)
[![Instagram](https://img.shields.io/badge/Instagram-@shivaya.dav-E4405F?style=for-the-badge&logo=instagram)](https://instagram.com/shivaya.dav)

</div>

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
Copyright (c) 2024 shivaya-dav

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions...
```

---

## ⚠️ Disclaimer

<div align="center">

### **For Educational & Informational Purposes Only**

</div>

- ❌ **NOT financial advice**
- ❌ **NOT investment recommendations**
- ❌ **Past performance ≠ Future results**
- ✅ **Always do your own research (DYOR)**
- ✅ **Trade at your own risk**
- ✅ **Only risk what you can afford to lose**

---

## 🌟 Support the Project

If you find Anjaliyzer useful:

<div align="center">

⭐ **Star this repository**  
🐛 **Report bugs via Issues**  
💡 **Suggest features via Pull Requests**  
📸 **Follow on Instagram: @shivaya.dav**  
🔗 **Share with friends**

</div>

---

## 📊 Project Stats

<div align="center">

![GitHub stars](https://img.shields.io/github/stars/shivaya-dav/anjaliyzer?style=social)
![GitHub forks](https://img.shields.io/github/forks/shivaya-dav/anjaliyzer?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/shivaya-dav/anjaliyzer?style=social)

![GitHub issues](https://img.shields.io/github/issues/shivaya-dav/anjaliyzer)
![GitHub pull requests](https://img.shields.io/github/issues-pr/shivaya-dav/anjaliyzer)
![GitHub last commit](https://img.shields.io/github/last-commit/shivaya-dav/anjaliyzer)

</div>

---

## 🗺️ Roadmap

- [ ] Add more timeframes (3m, 30m, 2h)
- [ ] Implement WebSocket for real-time data
- [ ] Add export to CSV/JSON/PDF
- [ ] Create backtesting module
- [ ] Add custom indicator builder
- [ ] Implement portfolio tracking
- [ ] Add Telegram bot integration
- [ ] Create web dashboard
- [ ] Add AI/ML predictions
- [ ] Multi-exchange support

---

<div align="center">

### 🎉 Thank You for Using Anjaliyzer!

**Made with 💚 by [shivaya-dav](https://github.com/shivaya-dav)**

*Happy Trading! 🚀📈*

---

**[⬆ Back to Top](#-anjaliyzer)**

</div>
