# 🚀 Trend Analyzer CLI

Pure command-line trend analysis with 50 technical indicators for 100+ symbols.

## 📁 Project Structure

```
trend-analyzer-cli/
├── index.js          (Main CLI application)
├── analyzer.js       (Analysis logic)
├── indicators.js     (All 50 indicators)
├── symbols.json      (Symbol database)
├── package.json      (Dependencies)
└── README.md         (This file)
```

## 🛠️ Installation

```bash
mkdir trend-analyzer-cli
cd trend-analyzer-cli

npm init -y

npm install yahoo-finance2 mathjs chalk inquirer
```

Create these files:
- `symbols.json`
- `indicators.js`
- `analyzer.js`
- `index.js`
- Update `package.json` with provided content

## 🚀 Run

```bash
node index.js
```

or

```bash
npm start
```

## 🎯 Features

✅ **Pure CLI** - No GUI, terminal only
✅ **50 Indicators** - All from original code
✅ **100+ Symbols** - Crypto, Forex, Stocks, Indices
✅ **Interactive Menu** - Easy symbol selection
✅ **Multiple Timeframes** - 5m to 1wk
✅ **Top 3 Signals** - Best BUY/SELL automatically identified
✅ **Modular Code** - Clean, separated files

## 📊 Usage

1. Run `node index.js`
2. Select mode (single/crypto/forex/stocks/all)
3. Enter symbol (if single mode)
4. Choose timeframe
5. Wait for analysis
6. View TOP 3 BUY/SELL signals
7. See complete results table
8. Analyze again or exit

## 📈 All 50 Indicators

SuperTrend, Ichimoku, MA_200, EMA_200, HMA_55, ParabolicSAR, ADX, SMMA_14, WMA_20, HeikinAshi, T3, ALMA_9, JMA, TEMA_20, DEMA_20, KijunSen, TenkanSen, GMMA, FRAMA, KAMA, RainbowMA, ZeroLagEMA, EMARibbon, TrendMagic, InstantTrendline, AMA, LSMA, Vortex, LinearRegressionSlope, TSI, EMA50_200, Laguerre, Fisher, Schaff, ADX_DMI, PriceChannel, DonchianMid, TrendlineAuto, DMI, SlopeLine, GannHiLo, QQE, MA_Angle, VWMA, CMA, MedianPriceMA, McGinley, FDI, RegressionChannel, PolynomialRegression

## 💡 Example Output

```
╔══════════════════════════════════════════════════════════════════╗
║   ████████╗██████╗ ███████╗███╗   ██╗██████╗                   ║
║         Anjaliyzer CLI v2.0 - 50 Indicators                       ║
╚══════════════════════════════════════════════════════════════════╝

? Select analysis mode: All Crypto (25)
? Select timeframe: 1 Hour

⏳ Analyzing 25 symbol(s)...

[1/25] BTC-USD... ✓ UP 72.5%
[2/25] ETH-USD... ✓ UP 68.0%
[3/25] BNB-USD... ✓ DOWN 65.2%
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

## 🔧 Troubleshooting

**Error: Cannot find module**
```bash
npm install
```

**Insufficient data error**
- Symbol might be invalid
- Try different timeframe
- Check internet connection

**Rate limiting**
- Wait a few minutes
- Analyze fewer symbols at once

## ⚠️ Disclaimer

For educational purposes only. Not financial advice. Trade at your own risk.

## 📄 License

MIT
