import * as math from 'mathjs';

const last = arr => arr[arr.length - 1];
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

function smaArray(values, period) {
  if (values.length < period) return [];
  const out = [];
  let sum = 0;
  for (let i = 0; i < values.length; i++) {
    sum += values[i];
    if (i >= period) sum -= values[i - period];
    if (i >= period - 1) out.push(sum / period);
  }
  return out;
}

function smaLast(values, period) {
  const a = smaArray(values, period);
  return a.length ? a[a.length - 1] : null;
}

function emaArray(values, period) {
  if (values.length < period) return [];
  const out = [];
  const k = 2 / (period + 1);
  let ema = values.slice(0, period).reduce((s, v) => s + v, 0) / period;
  out.push(ema);
  for (let i = period; i < values.length; i++) {
    ema = values[i] * k + ema * (1 - k);
    out.push(ema);
  }
  return out;
}

function emaLast(values, period) {
  const a = emaArray(values, period);
  return a.length ? a[a.length - 1] : null;
}

function wmaLast(values, period) {
  if (values.length < period) return null;
  const slice = values.slice(-period);
  let denom = 0, num = 0;
  for (let i = 0; i < period; i++) {
    const w = period - i;
    denom += w;
    num += slice[i] * w;
  }
  return num / denom;
}

function wma(values, period) {
  if (values.length < period) return null;
  const slice = values.slice(-period);
  let num = 0, denom = 0;
  for (let i = 0; i < period; i++) {
    const w = i + 1;
    num += slice[i] * w;
    denom += w;
  }
  return num / denom;
}

function zlemaArray(values, period) {
  if (values.length < period) return [];
  const lag = Math.floor((period - 1) / 2);
  const out = [];
  let ema = values.slice(0, period).reduce((s, v) => s + v, 0) / period;
  out.push(ema);
  for (let i = period; i < values.length; i++) {
    const price = values[i] + (values[i] - (values[i - lag] ?? values[i]));
    ema = price * (2 / (period + 1)) + ema * (1 - (2 / (period + 1)));
    out.push(ema);
  }
  return out;
}

function hmaLast(values, period) {
  if (values.length < period) return null;
  const half = Math.floor(period / 2);
  const sqrtP = Math.floor(Math.sqrt(period)) || 1;
  const wmaHalfArr = [];
  const wmaFullArr = [];
  for (let i = 0; i < values.length; i++) {
    if (i + 1 >= half) wmaHalfArr.push(wma(values.slice(0, i + 1), half));
    if (i + 1 >= period) wmaFullArr.push(wma(values.slice(0, i + 1), period));
  }
  const len = Math.min(wmaHalfArr.length, wmaFullArr.length);
  const diffSeries = [];
  for (let i = 0; i < len; i++) diffSeries.push(2 * wmaHalfArr[wmaHalfArr.length - len + i] - wmaFullArr[wmaFullArr.length - len + i]);
  return wma(diffSeries.slice(-sqrtP), sqrtP);
}

function trueRangeArray(highs, lows, closes) {
  const tr = [];
  for (let i = 0; i < highs.length; i++) {
    if (i === 0) tr.push(highs[i] - lows[i]);
    else tr.push(Math.max(highs[i] - lows[i], Math.abs(highs[i] - closes[i - 1]), Math.abs(lows[i] - closes[i - 1])));
  }
  return tr;
}

function atrArray(highs, lows, closes, period) {
  const tr = trueRangeArray(highs, lows, closes);
  if (tr.length < period) return [];
  const out = [];
  let atr = tr.slice(0, period).reduce((s, v) => s + v, 0) / period;
  out.push(atr);
  for (let i = period; i < tr.length; i++) {
    atr = (atr * (period - 1) + tr[i]) / period;
    out.push(atr);
  }
  return out;
}

function dmi_and_adx(highs, lows, closes, period = 14) {
  const plusDM = [];
  const minusDM = [];
  for (let i = 1; i < highs.length; i++) {
    const up = highs[i] - highs[i - 1];
    const down = lows[i - 1] - lows[i];
    plusDM.push(up > down && up > 0 ? up : 0);
    minusDM.push(down > up && down > 0 ? down : 0);
  }
  const tr = trueRangeArray(highs, lows, closes).slice(1);
  function wilderSmooth(arr) {
    const out = [];
    let sum = arr.slice(0, period).reduce((s, v) => s + v, 0);
    out.push(sum);
    for (let i = period; i < arr.length; i++) {
      sum = sum - (sum / period) + arr[i];
      out.push(sum);
    }
    return out;
  }
  const smoothTR = wilderSmooth(tr);
  const smoothPDM = wilderSmooth(plusDM);
  const smoothMDM = wilderSmooth(minusDM);
  const pdi = smoothPDM.map((v, i) => (100 * v) / smoothTR[i]);
  const mdi = smoothMDM.map((v, i) => (100 * v) / smoothTR[i]);
  const dx = pdi.map((v, i) => (100 * Math.abs(v - mdi[i])) / (v + mdi[i] || 1));
  const adxArr = [];
  if (dx.length >= period) {
    let first = dx.slice(0, period).reduce((s, v) => s + v, 0) / period;
    adxArr.push(first);
    for (let i = period; i < dx.length; i++) {
      first = (first * (period - 1) + dx[i]) / period;
      adxArr.push(first);
    }
  }
  return { pdi, mdi, adx: adxArr };
}

export function superTrend(highs, lows, closes, period = 10, multiplier = 3) {
  if (highs.length < period + 2) return { value: null, signal: "NEUTRAL" };
  const atr = atrArray(highs, lows, closes, period);
  const trend = [];
  let prevTrend = 1;
  for (let i = period; i < closes.length; i++) {
    const j = i - period;
    const hl2 = (highs[i] + lows[i]) / 2;
    const basicUpper = hl2 + multiplier * atr[j];
    const basicLower = hl2 - multiplier * atr[j];
    let currTrend = prevTrend;
    if (closes[i] > basicUpper) currTrend = 1;
    else if (closes[i] < basicLower) currTrend = -1;
    trend.push(currTrend);
    prevTrend = currTrend;
  }
  const lastTrend = last(trend);
  return { value: lastTrend, signal: lastTrend === 1 ? "UP" : lastTrend === -1 ? "DOWN" : "NEUTRAL" };
}

export function ichimokuSignal(highs, lows, closes) {
  const tenkanP = 9, kijunP = 26, senkouSpanB = 52;
  if (closes.length < senkouSpanB + 26) return { signal: "NEUTRAL" };
  const highest = (arr, p, idx) => Math.max(...arr.slice(idx - p + 1, idx + 1));
  const lowest = (arr, p, idx) => Math.min(...arr.slice(idx - p + 1, idx + 1));
  const n = closes.length;
  const tenkan = (highest(highs, tenkanP, n - 1) + lowest(lows, tenkanP, n - 1)) / 2;
  const kijun = (highest(highs, kijunP, n - 1) + lowest(lows, kijunP, n - 1)) / 2;
  const senkouB = (highest(highs, senkouSpanB, n - 1) + lowest(lows, senkouSpanB, n - 1)) / 2;
  const senkouA = (tenkan + kijun) / 2;
  const lastClose = last(closes);
  const signal = (lastClose > senkouA && senkouA > senkouB) ? "UP" : (lastClose < senkouA && senkouA < senkouB) ? "DOWN" : "NEUTRAL";
  return { value: { tenkan, kijun, senkouA, senkouB }, signal };
}

export function heikinAshiSignal(opens, highs, lows, closes) {
  const has = [];
  for (let i = 0; i < closes.length; i++) {
    const haClose = (opens[i] + highs[i] + lows[i] + closes[i]) / 4;
    let haOpen = i === 0 ? (opens[0] + closes[0]) / 2 : (has[i - 1].haOpen + has[i - 1].haClose) / 2;
    has.push({ haOpen, haClose });
  }
  const lastHA = last(has);
  return { value: lastHA, signal: lastHA.haClose > lastHA.haOpen ? "UP" : "DOWN" };
}

export function tenkanAndKijun(highs, lows) {
  const tenkan = (Math.max(...highs.slice(-9)) + Math.min(...lows.slice(-9))) / 2;
  const kijun = (Math.max(...highs.slice(-26)) + Math.min(...lows.slice(-26))) / 2;
  return { tenkan, kijun, signal: tenkan > kijun ? "UP" : tenkan < kijun ? "DOWN" : "NEUTRAL" };
}

export function Tema(values, period) {
  const e1 = emaArray(values, period);
  const e2 = emaArray(e1, period);
  const e3 = emaArray(e2, period);
  return e3.length ? (3 * last(e1) - 3 * last(e2) + last(e3)) : null;
}

export function Dema(values, period) {
  const e1 = emaArray(values, period);
  const e2 = emaArray(e1, period);
  return e2.length ? (2 * last(e1) - last(e2)) : null;
}

export function almaLast(values, window = 9, offset = 0.85, sigma = 6) {
  if (values.length < window) return null;
  const m = Math.floor((window - 1) * offset);
  const s = window / sigma;
  const weights = [];
  let norm = 0;
  for (let i = 0; i < window; i++) {
    const w = Math.exp(-(Math.pow(i - m, 2)) / (2 * Math.pow(s, 2)));
    weights.push(w);
    norm += w;
  }
  const slice = values.slice(-window);
  let sum = 0;
  for (let i = 0; i < window; i++) sum += slice[i] * (weights[i] / norm);
  return sum;
}

export function framaLast(values, period = 16) {
  if (values.length < period * 2) return null;
  const N = period;
  const priceSeries = values.slice(-N * 2);
  const price0 = priceSeries[0];
  const priceN = priceSeries[N - 1];
  const price2N = priceSeries[2 * N - 1];
  const rangeShort = Math.abs(priceN - price0);
  const rangeLong = Math.abs(price2N - price0) || 1;
  const fractalDimension = Math.max(0.01, Math.min(2, 2 - Math.log(rangeShort / rangeLong + 1)));
  const alpha = Math.exp(-4.6 * (fractalDimension - 1));
  const prev = values[values.length - 2];
  return alpha * values[values.length - 1] + (1 - alpha) * prev;
}

export function kamaLast(values, period = 10, fast = 2, slow = 30) {
  if (values.length < period + slow) return null;
  const change = Math.abs(values[values.length - 1] - values[values.length - period]);
  let volatility = 0;
  for (let i = values.length - period; i < values.length; i++) volatility += Math.abs(values[i] - values[i - 1] || 0);
  const er = volatility === 0 ? 0 : change / volatility;
  const fastSC = 2 / (fast + 1);
  const slowSC = 2 / (slow + 1);
  const sc = Math.pow(er * (fastSC - slowSC) + slowSC, 2);
  let kama = values[values.length - period - 1];
  for (let i = values.length - period; i < values.length; i++) kama = kama + sc * (values[i] - kama);
  return kama;
}

export function lsmaLast(values, period = 14) {
  if (values.length < period) return null;
  const slice = values.slice(-period);
  const n = period;
  const x = Array.from({ length: n }, (_, i) => i);
  const xmean = x.reduce((s, v) => s + v, 0) / n;
  const ymean = slice.reduce((s, v) => s + v, 0) / n;
  let num = 0, den = 0;
  for (let i = 0; i < n; i++) {
    num += (x[i] - xmean) * (slice[i] - ymean);
    den += (x[i] - xmean) ** 2;
  }
  const slope = den === 0 ? 0 : num / den;
  const intercept = ymean - slope * xmean;
  const fitted = intercept + slope * (n - 1);
  return { fitted, slope };
}

export function vortexLast(highs, lows, closes, period = 14) {
  if (highs.length < period + 1) return null;
  const tr = [];
  const vmp = [];
  const vmm = [];
  for (let i = 1; i < highs.length; i++) {
    tr.push(Math.max(highs[i] - lows[i], Math.abs(highs[i] - closes[i - 1]), Math.abs(lows[i] - closes[i - 1])));
    vmp.push(Math.abs(highs[i] - lows[i - 1]));
    vmm.push(Math.abs(lows[i] - highs[i - 1]));
  }
  function sumLast(arr, p) { return arr.slice(-p).reduce((s, v) => s + v, 0); }
  const vip = sumLast(vmp, period) / sumLast(tr, period);
  const vin = sumLast(vmm, period) / sumLast(tr, period);
  return { vip, vin, signal: vip > vin ? "UP" : vip < vin ? "DOWN" : "NEUTRAL" };
}

export function linregSlope(values, period = 14) {
  const res = lsmaLast(values, period);
  return res ? (res.slope > 0 ? "UP" : res.slope < 0 ? "DOWN" : "NEUTRAL") : "NEUTRAL";
}

export function tsiLast(values, r1 = 25, r2 = 13) {
  if (values.length < r1 + r2 + 2) return null;
  const momentum = [];
  for (let i = 1; i < values.length; i++) momentum.push(values[i] - values[i - 1]);
  const m1 = emaArray(momentum, r1);
  const m2 = emaArray(m1, r2);
  const abs1 = emaArray(momentum.map(Math.abs), r1);
  const abs2 = emaArray(abs1, r2);
  const lastNum = last(m2 || [0]) || 0;
  const lastDen = last(abs2 || [1]) || 1;
  const tsi = lastDen === 0 ? 0 : 100 * (lastNum / lastDen);
  return { tsi, signal: tsi > 0 ? "UP" : tsi < 0 ? "DOWN" : "NEUTRAL" };
}

export function laguerreFilterLast(values, gamma = 0.5) {
  if (values.length < 3) return null;
  let L0 = 0, L1 = 0, L2 = 0, L3 = 0;
  for (let i = 0; i < values.length; i++) {
    const price = values[i];
    L0 = (1 - gamma) * price + gamma * L0;
    L1 = -gamma * L0 + L0 + gamma * L1;
    L2 = -gamma * L1 + L1 + gamma * L2;
    L3 = -gamma * L2 + L2 + gamma * L3;
  }
  return (L0 + 2 * L1 + 2 * L2 + L3) / 6;
}

export function fisherTransformLast(values, period = 10) {
  if (values.length < period) return null;
  const slice = values.slice(-period);
  const max = Math.max(...slice);
  const min = Math.min(...slice);
  const value = (last(values) - min) / (max - min || 1);
  const x = 0.33 * (2 * clamp(value, 0.0001, 0.9999) - 1) + 0.67 * 0;
  const fish = 0.5 * Math.log((1 + x) / (1 - x));
  return { fish, signal: fish > 0 ? "UP" : fish < 0 ? "DOWN" : "NEUTRAL" };
}

export function schaffTrendCycleLast(values) {
  if (values.length < 50) return null;
  const macdFast = emaLast(values, 12);
  const macdSlow = emaLast(values, 26);
  const macd = macdFast - macdSlow;
  const signal = emaLast(["placeholder", macd].slice(1), 9);
  return { value: macd, signal: macd > (signal || 0) ? "UP" : "DOWN" };
}

export function donchianMidLast(highs, lows, period = 20) {
  if (highs.length < period) return null;
  const hh = Math.max(...highs.slice(-period));
  const ll = Math.min(...lows.slice(-period));
  const mid = (hh + ll) / 2;
  return { mid, signal: last(highs) > mid ? "UP" : last(lows) < mid ? "DOWN" : "NEUTRAL" };
}

export function gannHiLoLast(highs, lows, period = 10) {
  if (highs.length < period) return null;
  const hh = Math.max(...highs.slice(-period));
  const ll = Math.min(...lows.slice(-period));
  const activator = (hh + ll) / 2;
  return { activator, signal: last(highs) > activator ? "UP" : last(lows) < activator ? "DOWN" : "NEUTRAL" };
}

export function qqeApprox(values, period = 14) {
  if (values.length < period + 5) return null;
  let gains = 0, losses = 0;
  for (let i = values.length - period; i < values.length; i++) {
    const diff = values[i] - values[i - 1] || 0;
    if (diff >= 0) gains += diff; else losses -= diff;
  }
  const rs = losses === 0 ? 100 : gains / losses;
  const rsi = 100 - (100 / (1 + rs));
  return { rsi, signal: rsi > 50 ? "UP" : "DOWN" };
}

export function vwmaLast(closes, volumes, period = 20) {
  if (closes.length < period) return null;
  const sliceC = closes.slice(-period);
  const sliceV = volumes.slice(-period);
  let num = 0, den = 0;
  for (let i = 0; i < period; i++) {
    num += sliceC[i] * sliceV[i];
    den += sliceV[i];
  }
  const vwma = den ? num / den : null;
  return { vwma, signal: last(closes) > vwma ? "UP" : last(closes) < vwma ? "DOWN" : "NEUTRAL" };
}

export function cmaLast(values, period = 50) {
  const slice = values.slice(-period);
  const sum = slice.reduce((s, v) => s + v, 0);
  const cma = sum / slice.length;
  return { cma, signal: last(values) > cma ? "UP" : last(values) < cma ? "DOWN" : "NEUTRAL" };
}

export function medianPriceMALast(highs, lows, period = 20) {
  const medPrices = highs.map((h, i) => (h + lows[i]) / 2);
  return { value: smaLast(medPrices, period), signal: last(medPrices) > smaLast(medPrices, period) ? "UP" : "DOWN" };
}

export function mcginleyLast(values, period = 10) {
  if (values.length < period) return null;
  let md = values[0];
  for (let i = 1; i < values.length; i++) {
    const price = values[i];
    const k = period;
    md = md + (price - md) / (k * (price / (md || price)));
  }
  return { md, signal: last(values) > md ? "UP" : "DOWN" };
}

export function fdiLast(values, period = 20) {
  if (values.length < period) return null;
  const n = period;
  let sum = 0;
  for (let i = values.length - n + 1; i < values.length; i++) sum += Math.abs(values[i] - values[i - 1] || 0);
  const r = Math.max(...values.slice(-n)) - Math.min(...values.slice(-n)) || 1;
  const fd = (Math.log(sum / r) / Math.log(n)) || 0;
  return { fd, signal: fd < 0.9 ? "TRENDING" : "RANGING" };
}

export function regressionChannelLast(values, period = 30) {
  if (values.length < period) return null;
  const slice = values.slice(-period);
  const n = period;
  const x = Array.from({ length: n }, (_, i) => i);
  const xmean = x.reduce((s, v) => s + v, 0) / n;
  const ymean = slice.reduce((s, v) => s + v, 0) / n;
  let num = 0, den = 0;
  for (let i = 0; i < n; i++) {
    num += (x[i] - xmean) * (slice[i] - ymean);
    den += (x[i] - xmean) ** 2;
  }
  const slope = den === 0 ? 0 : num / den;
  const intercept = ymean - slope * xmean;
  const fitted = slice.map((_, i) => intercept + slope * i);
  const meanFit = fitted.reduce((s, v) => s + v, 0) / n;
  const sd = Math.sqrt(fitted.map(v => (v - meanFit) ** 2).reduce((s, v) => s + v, 0) / n);
  const upper = last(fitted) + sd;
  const lower = last(fitted) - sd;
  const lastPrice = last(values);
  const signal = lastPrice > upper ? "UP" : lastPrice < lower ? "DOWN" : "NEUTRAL";
  return { slope, intercept, upper, lower, signal };
}

export function polynomialRegLast(values, degree = 2, period = 30) {
  if (values.length < period) return null;
  const slice = values.slice(-period);
  const n = period;
  const A = [];
  for (let i = 0; i < n; i++) {
    const row = [];
    for (let d = 0; d <= degree; d++) row.push(Math.pow(i, d));
    A.push(row);
  }
  const b = slice.map(v => [v]);
  const At = math.transpose(A);
  const AtA = math.multiply(At, A);
  const Atb = math.multiply(At, b);
  let coeffs;
  try {
    coeffs = math.lusolve(AtA, Atb).map(r => r[0]);
  } catch (e) {
    coeffs = [0];
  }
  const xlast = n - 1;
  let deriv = 0;
  for (let d = 1; d < coeffs.length; d++) deriv += d * coeffs[d] * Math.pow(xlast, d - 1);
  const signal = deriv > 0 ? "UP" : deriv < 0 ? "DOWN" : "NEUTRAL";
  return { coeffs, deriv, signal };
}

export function majorityDirectionFromMAList(values, periods) {
  const directions = periods.map(p => {
    const m = emaLast(values, p);
    return last(values) > m ? 1 : (last(values) < m ? -1 : 0);
  });
  const sum = directions.reduce((s, v) => s + v, 0);
  return sum > 0 ? "UP" : sum < 0 ? "DOWN" : "NEUTRAL";
}

export function psarCalc(highs, lows, closes, step = 0.02, maxStep = 0.2) {
  if (highs.length < 5) return { value: null, signal: "NEUTRAL" };
  let bull = true;
  let af = step;
  let ep = highs[0];
  let sar = lows[0];
  for (let i = 1; i < closes.length; i++) {
    sar = sar + af * (ep - sar);
    if (bull) {
      if (lows[i] < sar) {
        bull = false;
        sar = ep;
        ep = lows[i];
        af = step;
      } else {
        if (highs[i] > ep) { ep = highs[i]; af = Math.min(maxStep, af + step); }
      }
    } else {
      if (highs[i] > sar) {
        bull = true;
        sar = ep;
        ep = highs[i];
        af = step;
      } else {
        if (lows[i] < ep) { ep = lows[i]; af = Math.min(maxStep, af + step); }
      }
    }
  }
  return { value: sar, signal: bull ? "UP" : "DOWN" };
}

export function smmaLast(values, period = 14) {
  if (values.length < period) return null;
  let prev = values.slice(0, period).reduce((s, v) => s + v, 0) / period;
  for (let i = period; i < values.length; i++) prev = (prev * (period - 1) + values[i]) / period;
  return prev;
}

export function t3Approx(values, period = 8) {
  const e1 = emaLast(values, period);
  const e2 = emaLast(values.slice(0, -1).concat([e1]), period);
  return e2;
}

export { smaLast, emaLast, emaArray, wmaLast, zlemaArray, hmaLast, atrArray, dmi_and_adx, last };
