import yahooFinance from 'yahoo-finance2';
import * as indicators from './indicators.js';

export async function analyzeSymbol(symbol, interval = '1h') {
  try {
    const raw = await yahooFinance.chart(symbol, {
      interval: interval,
      period1: new Date(Date.now() - (60 * 24 * 60 * 60 * 1000)),
      period2: new Date(),
      includePrePost: false
    });
    
    const quotes = raw.quotes || raw;
    if (!quotes || quotes.length < 100) {
      return { symbol, error: 'Insufficient data', analysis: null };
    }

    const opens = quotes.map(q => q.open ?? q.close);
    const highs = quotes.map(q => q.high);
    const lows = quotes.map(q => q.low);
    const closes = quotes.map(q => q.close);
    const volumes = quotes.map(q => q.volume ?? 0);

    const out = {};

    out.SuperTrend = indicators.superTrend(highs, lows, closes, 10, 3);
    out.Ichimoku = indicators.ichimokuSignal(highs, lows, closes);
    out.MA_200 = { value: indicators.smaLast(closes, 200), signal: indicators.last(closes) > indicators.smaLast(closes, 200) ? 'UP' : 'DOWN' };
    out.EMA_200 = { value: indicators.emaLast(closes, 200), signal: indicators.last(closes) > indicators.emaLast(closes, 200) ? 'UP' : 'DOWN' };
    out.HMA_55 = { value: indicators.hmaLast(closes, 55), signal: indicators.last(closes) > indicators.hmaLast(closes, 55) ? 'UP' : 'DOWN' };
    out.ParabolicSAR = indicators.psarCalc(highs, lows, closes);

    const dmiX = indicators.dmi_and_adx(highs, lows, closes, 14);
    out.ADX = { value: indicators.last(dmiX.adx) ?? null, signal: (indicators.last(dmiX.adx) ?? 0) > 25 ? 'STRONG' : 'WEAK' };
    out.SMMA_14 = { value: indicators.smmaLast(closes, 14), signal: indicators.last(closes) > indicators.smmaLast(closes, 14) ? 'UP' : 'DOWN' };
    out.WMA_20 = { value: indicators.wmaLast(closes, 20), signal: indicators.last(closes) > indicators.wmaLast(closes, 20) ? 'UP' : 'DOWN' };
    out.HeikinAshi = indicators.heikinAshiSignal(opens, highs, lows, closes);
    out.T3 = { value: indicators.t3Approx(closes, 8), signal: indicators.last(closes) > indicators.t3Approx(closes, 8) ? 'UP' : 'DOWN' };
    out.ALMA_9 = { value: indicators.almaLast(closes, 9, 0.85, 6), signal: indicators.last(closes) > indicators.almaLast(closes, 9, 0.85, 6) ? 'UP' : 'DOWN' };
    out.JMA_approx = { value: indicators.last(indicators.zlemaArray(closes, 10)), signal: indicators.last(closes) > indicators.last(indicators.zlemaArray(closes, 10)) ? 'UP' : 'DOWN' };
    out.TEMA_20 = { value: indicators.Tema(closes, 20), signal: indicators.last(closes) > indicators.Tema(closes, 20) ? 'UP' : 'DOWN' };
    out.DEMA_20 = { value: indicators.Dema(closes, 20), signal: indicators.last(closes) > indicators.Dema(closes, 20) ? 'UP' : 'DOWN' };
    
    const tkData = indicators.tenkanAndKijun(highs, lows);
    out.KijunSen = tkData.kijun ? { value: tkData.kijun, signal: tkData.signal } : { value: null, signal: 'NEUTRAL' };
    out.TenkanSen = { value: tkData.tenkan, signal: tkData.signal };

    const shortPeriods = [3, 5, 8, 10, 12, 15];
    const longPeriods = [30, 35, 40, 45, 50, 60];
    const shortDir = indicators.majorityDirectionFromMAList(closes, shortPeriods);
    const longDir = indicators.majorityDirectionFromMAList(closes, longPeriods);
    out.GMMA = { shortDir, longDir, signal: shortDir === longDir ? shortDir : 'NEUTRAL' };

    out.FRAMA = { value: indicators.framaLast(closes, 16), signal: indicators.last(closes) > indicators.framaLast(closes, 16) ? 'UP' : 'DOWN' };
    out.KAMA = { value: indicators.kamaLast(closes, 10, 2, 30), signal: indicators.last(closes) > indicators.kamaLast(closes, 10, 2, 30) ? 'UP' : 'DOWN' };
    out.RainbowMA = { signal: indicators.majorityDirectionFromMAList(closes, [8, 13, 21, 34, 55, 89]) };
    out.ZeroLagEMA = { value: indicators.last(indicators.zlemaArray(closes, 21)), signal: indicators.last(closes) > indicators.last(indicators.zlemaArray(closes, 21)) ? 'UP' : 'DOWN' };
    out.EMARibbon = { signal: indicators.majorityDirectionFromMAList(closes, [8, 13, 21, 34, 55, 89, 144, 233]) };

    const ema50 = indicators.emaLast(closes, 50);
    const atr14 = indicators.last(indicators.atrArray(highs, lows, closes, 14));
    const tm = indicators.last(closes) > ema50 + atr14 ? 'UP' : indicators.last(closes) < ema50 - atr14 ? 'DOWN' : 'NEUTRAL';
    out.TrendMagic = { value: ema50, atr14, signal: tm };

    out.InstantTrendline = { value: indicators.emaLast(closes, 8), signal: indicators.last(closes) > indicators.emaLast(closes, 8) ? 'UP' : 'DOWN' };
    out.AMA = out.KAMA;

    const ls = indicators.lsmaLast(closes, 14);
    out.LSMA = { value: ls?.fitted ?? null, slope: ls?.slope ?? 0, signal: ls?.slope > 0 ? 'UP' : ls?.slope < 0 ? 'DOWN' : 'NEUTRAL' };
    out.Vortex = indicators.vortexLast(highs, lows, closes, 14);
    out.LinearRegressionSlope = { signal: indicators.linregSlope(closes, 20) };
    out.TSI = indicators.tsiLast(closes, 25, 13);

    const ema200 = indicators.emaLast(closes, 200);
    out.EMA50_200 = { ema50, ema200, signal: ema50 > ema200 ? 'UP' : 'DOWN' };
    out.Laguerre = { value: indicators.laguerreFilterLast(closes, 0.5), signal: indicators.last(closes) > indicators.laguerreFilterLast(closes, 0.5) ? 'UP' : 'DOWN' };
    out.Fisher = indicators.fisherTransformLast(closes, 10);
    out.Schaff = indicators.schaffTrendCycleLast(closes);
    out.ADX_DMI = { pdi: indicators.last(dmiX.pdi) ?? null, mdi: indicators.last(dmiX.mdi) ?? null, adx: indicators.last(dmiX.adx) ?? null, signal: (indicators.last(dmiX.pdi) ?? 0) > (indicators.last(dmiX.mdi) ?? 0) ? 'UP' : 'DOWN' };
    out.PriceChannel = indicators.donchianMidLast(highs, lows, 20);
    out.DonchianMid = out.PriceChannel;
    out.TrendlineAuto = { signal: out.LinearRegressionSlope.signal };
    out.DMI = { pdi: indicators.last(dmiX.pdi) ?? null, mdi: indicators.last(dmiX.mdi) ?? null, signal: (indicators.last(dmiX.pdi) ?? 0) > (indicators.last(dmiX.mdi) ?? 0) ? 'UP' : 'DOWN' };

    const ema21 = indicators.emaLast(closes, 21);
    const ema21prev = indicators.emaArray(closes, 21).slice(-2)[0] ?? ema21;
    out.SlopeLine = { slope: ema21 - (ema21prev || ema21), signal: (ema21 - (ema21prev || ema21)) > 0 ? 'UP' : 'DOWN' };
    out.GannHiLo = indicators.gannHiLoLast(highs, lows, 10);
    out.QQE = indicators.qqeApprox(closes, 14);

    const prevEma50 = indicators.emaArray(closes, 50).slice(-2)[0] ?? ema50;
    const angle = Math.atan2((ema50 - prevEma50 || 0), 1) * (180 / Math.PI);
    out.MA_Angle = { angle, signal: angle > 0 ? 'UP' : 'DOWN' };
    out.VWMA = indicators.vwmaLast(closes, volumes, 20);
    out.CMA = indicators.cmaLast(closes, 50);
    out.MedianPriceMA = indicators.medianPriceMALast(highs, lows, 20);
    out.McGinley = indicators.mcginleyLast(closes, 10);
    out.FDI = indicators.fdiLast(closes, 20);
    out.RegressionChannel = indicators.regressionChannelLast(closes, 30);
    out.PolynomialRegression = indicators.polynomialRegLast(closes, 2, 30);

    let upCount = 0, downCount = 0, neutralCount = 0;
    for (const data of Object.values(out)) {
      const signal = data.signal || 'NEUTRAL';
      if (signal === 'UP' || signal === 'STRONG' || signal === 'TRENDING') upCount++;
      else if (signal === 'DOWN' || signal === 'WEAK' || signal === 'RANGING') downCount++;
      else neutralCount++;
    }

    const total = upCount + downCount + neutralCount;
    const upPercentage = ((upCount / total) * 100).toFixed(2);
    const downPercentage = ((downCount / total) * 100).toFixed(2);

    let overallDirection = 'NEUTRAL';
    let confidence = 0;

    if (upCount > downCount) {
      overallDirection = 'UP';
      confidence = parseFloat(upPercentage);
    } else if (downCount > upCount) {
      overallDirection = 'DOWN';
      confidence = parseFloat(downPercentage);
    } else {
      confidence = 50;
    }

    return {
      symbol,
      direction: overallDirection,
      confidence,
      upCount,
      downCount,
      neutralCount,
      currentPrice: indicators.last(closes).toFixed(2),
      error: null
    };
  } catch (error) {
    return { symbol, error: error.message, analysis: null };
  }
}
