import inquirer from 'inquirer';
import chalk from 'chalk';
import fs from 'fs';
import { analyzeSymbol } from './analyzer.js';

const symbols = JSON.parse(fs.readFileSync('./symbols.json', 'utf8'));

console.log(chalk.redBright(`
                                                                                   
 █████╗ ███╗   ██╗     ██╗ █████╗ ██╗     ██╗██╗   ██╗███████╗███████╗██████╗ 
██╔══██╗████╗  ██║     ██║██╔══██╗██║     ██║╚██╗ ██╔╝╚══███╔╝██╔════╝██╔══██╗
███████║██╔██╗ ██║     ██║███████║██║     ██║ ╚████╔╝   ███╔╝ █████╗  ██████╔╝
██╔══██║██║╚██╗██║██   ██║██╔══██║██║     ██║  ╚██╔╝   ███╔╝  ██╔══╝  ██╔══██╗
██║  ██║██║ ╚████║╚█████╔╝██║  ██║███████╗██║   ██║   ███████╗███████╗██║  ██║
╚═╝  ╚═╝╚═╝  ╚═══╝ ╚════╝ ╚═╝  ╚═╝╚══════╝╚═╝   ╚═╝   ╚══════╝╚══════╝╚═╝  ╚═╝
                                                                              
                              v1.0 - 50 Technical Indicators
  ❤️Developed by: shivaya-dav                                                  
  🚩GitHub: github.com/shivaya-dav                                             
  📱Instagram: @shivaya.dav       
  
  💼 Need custom configuration or paid algo bot?                             
  📧 Contact me on GitHub or Instagram  

`));

async function main() {
  const { mode } = await inquirer.prompt([
    {
      type: 'list',
      name: 'mode',
      message: 'Select analysis mode:',
      choices: [
        { name: '📈 Single Symbol', value: 'single' },
        { name: '💰 All Crypto (25)', value: 'crypto' },
        { name: '💱 All Forex (15)', value: 'forex' },
        { name: '📊 All Stocks (60)', value: 'stocks' },
        { name: '🌐 Analyze Everything (100+)', value: 'all' },
        { name: '❌ Exit', value: 'exit' }
      ]
    }
  ]);

  if (mode === 'exit') {
    console.log(chalk.yellow('\n👋 Goodbye!\n'));
    return;
  }

  let symbolsToAnalyze = [];

  if (mode === 'single') {
    const { symbol } = await inquirer.prompt([
      {
        type: 'input',
        name: 'symbol',
        message: 'Enter symbol:',
        default: 'BTC-USD'
      }
    ]);
    symbolsToAnalyze = [symbol.toUpperCase()];
  } else if (mode === 'all') {
    symbolsToAnalyze = [...symbols.crypto, ...symbols.forex, ...symbols.stocks, ...symbols.indices];
  } else {
    symbolsToAnalyze = symbols[mode];
  }

  const { interval } = await inquirer.prompt([
    {
      type: 'list',
      name: 'interval',
      message: 'Select timeframe:',
      choices: [
        { name: '5 Minutes', value: '5m' },
        { name: '15 Minutes', value: '15m' },
        { name: '1 Hour', value: '1h' },
        { name: '4 Hours', value: '4h' },
        { name: '1 Day', value: '1d' },
        { name: '1 Week', value: '1wk' }
      ],
      default: '1h'
    }
  ]);

  console.log(chalk.cyan(`\n⏳ Analyzing ${symbolsToAnalyze.length} symbol(s)...\n`));

  const results = [];
  for (let i = 0; i < symbolsToAnalyze.length; i++) {
    const symbol = symbolsToAnalyze[i];
    process.stdout.write(chalk.gray(`[${i + 1}/${symbolsToAnalyze.length}] ${symbol}... `));
    
    const result = await analyzeSymbol(symbol, interval);
    results.push(result);
    
    if (result.error) {
      console.log(chalk.red('❌'));
    } else {
      const color = result.direction === 'UP' ? chalk.green : result.direction === 'DOWN' ? chalk.red : chalk.gray;
      console.log(color(`✓ ${result.direction} ${result.confidence}%`));
    }
  }

  const validResults = results.filter(r => !r.error);
  const buySignals = validResults.filter(r => r.direction === 'UP').sort((a, b) => b.confidence - a.confidence).slice(0, 3);
  const sellSignals = validResults.filter(r => r.direction === 'DOWN').sort((a, b) => b.confidence - a.confidence).slice(0, 3);

  console.log(chalk.green('\n╔════════════════════════════════════════════════════════╗'));
  console.log(chalk.green('║            🟢 TOP 3 BUY SIGNALS 🟢                   ║'));
  console.log(chalk.green('╚════════════════════════════════════════════════════════╝\n'));

  buySignals.forEach((r, i) => {
    console.log(chalk.green(`${i + 1}. ${r.symbol.padEnd(15)} ${r.confidence}% (${r.upCount}↑ ${r.downCount}↓ ${r.neutralCount}○)`));
  });

  console.log(chalk.red('\n╔════════════════════════════════════════════════════════╗'));
  console.log(chalk.red('║            🔴 TOP 3 SELL SIGNALS 🔴                  ║'));
  console.log(chalk.red('╚════════════════════════════════════════════════════════╝\n'));

  sellSignals.forEach((r, i) => {
    console.log(chalk.red(`${i + 1}. ${r.symbol.padEnd(15)} ${r.confidence}% (${r.upCount}↑ ${r.downCount}↓ ${r.neutralCount}○)`));
  });

  console.log(chalk.cyan('\n╔════════════════════════════════════════════════════════╗'));
  console.log(chalk.cyan('║                ALL RESULTS TABLE                       ║'));
  console.log(chalk.cyan('╚════════════════════════════════════════════════════════╝\n'));

  validResults.forEach(r => {
    const color = r.direction === 'UP' ? chalk.green : r.direction === 'DOWN' ? chalk.red : chalk.yellow;
    console.log(`${r.symbol.padEnd(15)} ${color(r.direction.padEnd(8))} ${r.confidence}%`.padEnd(30) + ` ${r.upCount}↑ ${r.downCount}↓ ${r.neutralCount}○  $${r.currentPrice}`);
  });

  console.log(chalk.magenta('\n════════════════════════════════════════════════════════'));
  console.log(chalk.white(`✓ Analyzed: ${validResults.length} | ✗ Failed: ${results.length - validResults.length}`));
  console.log(chalk.magenta('════════════════════════════════════════════════════════\n'));

  const { again } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'again',
      message: 'Analyze more symbols?',
      default: true
    }
  ]);

  if (again) {
    await main();
  } else {
    console.log(chalk.yellow('\n👋 Thanks for using Trend Analyzer!\n'));
  }
}

main().catch(console.error);
