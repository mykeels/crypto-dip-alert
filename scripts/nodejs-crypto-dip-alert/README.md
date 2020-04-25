# NodeJS Crypto Dip Alert

A CLI tool to monitor the prices of crypto, and notify you when it drops past a threshold you specify.

## Installation and Usage

- Make sure you have [NodeJS](https://nodejs.org/en/download/) installed.
- Run `npm i -g crypto-dip-alert` or `yarn global add crypto-dip-alert` to install to your computer.
- Run `crypto-dip-alert -e` or `crypto-dip-alert --env` to view and edit the `.env` file according to the [instructions given here](./ENV.md).
- Run `crypto-dip-alert` with the right options.

## CLI Options

This CLI tool has the following synopsis:

```txt
Usage: crypto-dip-alert [options]

Options:
  -c, --coins <coins>  A comma-separated list of coins to track (default: ["BTC","ETH"])
  -p, --price <price>  A price value to monitor (default: "0.01")
  -t, --type <type>    "percent" or "cents" (default: "percent")
  -l, --list           List available Cryptos
  -e, --env            View and Edit the .env file
  -h, --help           display help for command
```

**Example 1.**

```bash
crypto-dip-alert -c ETH,BTC,USDC,EOS
```

to track `ETH`, `BTC`, `USDC` and `EOS` coins.

**Example 2.**

```bash
crypto-dip-alert -c ETH -p 10 -t percent
```

to track a 10% dip in the price of `ETH`.

**Example 3.**

```bash
crypto-dip-alert -l
```

to list all symbols for available cryptos you can track.

**Example 4.**

```bash
crypto-dip-alert -e
```

to open/edit the `.env` file.

## Notifications

This script is written to make the notification system configurable.

By default, it comes with the following notifications:

- Console (Terminal Output)
- Mailgun (Uses the Mailgun service to send emails)
- SMTP (Uses SMTP to send emails)
- Telegram (Uses Telegram chat)

See [Env Setup](./ENV.md) for more.
