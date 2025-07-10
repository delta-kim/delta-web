import { createActor as createDelta } from "../../../declarations/delta/index";
import { createActor as createLedgers } from "../../../declarations/Ledgers/index";
import type { FilterArgs } from "../../../declarations/Ledgers/Ledgers.did";
import { createActor as createMCWallet } from "../../../declarations/MultiChainWallet/index";

const ic_host = "https://icp0.io";
let mainCanisterId = "ojpsk-siaaa-aaaam-adtea-cai";
let mcwCanisterId = "o3jft-6yaaa-aaaam-adtha-cai";

export async function _fetchLedgerTransactions(
  filter: [FilterArgs],
  skipId: any,
  limit: number,
  { coinCode }: { coinCode?: string }
) {
  const delta = await createDelta(mainCanisterId, {
    agentOptions: { host: ic_host },
  });
  console.log({ delta });
  const mcWallet = await createMCWallet(mcwCanisterId, {
    agentOptions: { host: ic_host },
  });
  console.log({ mcWallet });
  let ledgerArgsList = await mcWallet.listLedgerInitArgs();
  console.log({ ledgerArgsList });
  let ledgerArgs = ledgerArgsList.at(1);
  console.log({ ledgerArgs });
  if (!ledgerArgs) {
    throw new Error("No ledger arguments found.");
  }
  let thisLedgerCanisterId = await delta.getCanisterId({
    Ledgers: coinCode ?? ledgerArgs.code,
  });
  console.log({ thisLedgerCanisterId });
  const Ledger = await createLedgers(thisLedgerCanisterId, {
    agentOptions: { host: ic_host },
  });
  // return Ledger.listTransaction(coinCode, filter, skipId, limit);
  const transactions = await Ledger.listTransaction(filter, skipId, limit);
  console.log({ transactions });
  return { transactions, ledgerArgsList };
}

export function _formatCryptoAmount(
  value: bigint | number | string,
  decimals = 8
): string {
  let bigValue: bigint;
  if (typeof value === "bigint") bigValue = value;
  else if (typeof value === "number") bigValue = BigInt(value);
  else bigValue = BigInt(value);

  const divisor = 10n ** BigInt(decimals);
  const whole = bigValue / divisor;
  const fraction = (bigValue % divisor).toString().padStart(decimals, "0");

  // Remove trailing zeros in fraction for cleaner display
  const fractionClean = fraction.replace(/0+$/, "");
  return fractionClean
    ? `${whole.toString()}.${fractionClean}`
    : whole.toString();
}

export function _clipString(str: string): string {
  if (!str || str.length <= 12) return str;
  return `${str.slice(0, 6)}...${str.slice(str.length - 6)}`;
}

export function _formatTimestamp(ts: bigint | number | string): string {
  // Convert to number (seconds), then to milliseconds
  const num = typeof ts === "bigint" ? Number(ts) : Number(ts);
  if (!num) return "";
  const date = new Date(num * 1000);
  return date.toLocaleString(); // or use toLocaleDateString() for just the date
}
