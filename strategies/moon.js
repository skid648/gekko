// Let's create our own strategy
var strat = {};

// Prepare everything our strat needs
strat.init = function() {
  let macDSettings = { short: 10,long: 21,signal: 9 }
  let rsiSettings = { optInTimePeriod: 15 }
  this.addIndicator('mymacd', 'MACD', macDSettings)
  this.addTulipIndicator('rsi', 'rsi', rsiSettings)
}

// What happens on every new candle?
strat.update = function(candle) {}

// For debugging purposes.
strat.log = function() {}

// Based on the newly calculated
// information, check if we should
// update or not.
strat.check = function(candle) {
  // {
  //   input: 'price',
  //     diff: -0.000004414303775113464,
  //   short:
  //   Indicator {
  //   input: 'price',
  //     weight: 10,
  //     result: 0.0015376700806673234,
  //     age: 10 },
  //   long:
  //     Indicator {
  //   input: 'price',
  //     weight: 21,
  //     result: 0.0015420843844424369,
  //     age: 10 },
  //   signal:
  //     Indicator {
  //   input: 'price',
  //     weight: 9,
  //     result: -0.000003270106014680301,
  //     age: 10 },
  //   result: -0.0000011441977604331632 }

  const rsi = this.tulipIndicators.rsi.result.result
  const macd = this.indicators.mymacd

  console.log(this)
  throw new Error()

  if (rsi !== undefined) {
    // RSI available
    if (rsi > 70) {
      this.advice({ direction: 'short' });
      console.log(`RSI Sell`, candle.start.toDate())
    }
    if (rsi <= 30) {
      this.advice({ direction: 'long' });
      console.log(`RSI Buy`, candle.start.toDate())
    }
  }

  if (macd.signal.result > 0) {
    this.advice({ direction: 'long' });
    console.log(`MACD Buy`, candle.start.toDate())
  }

  // console.log('macd signal', macd.signal.result)

  // this.indicators.mymacd
  // this.advice({ direction: 'long' });
}

// Optional for executing code
// after completion of a backtest.
// This block will not execute in
// live use as a live gekko is
// never ending.
strat.end = function() {}

module.exports = strat;
