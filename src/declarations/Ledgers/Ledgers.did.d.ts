import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export type AddressId = string;
export type Balance = bigint;
export interface CanisterData {
  'skip' : bigint,
  'fulled' : boolean,
  'length' : bigint,
  'canisterId' : string,
}
export type ChainIdent = string;
export type ChainIdent__1 = string;
export type CoinCode = string;
export type CoinName = string;
export interface ContractConf {
  'chainIdent' : ChainIdent,
  'tokenAddress' : string,
  'inputDecimals' : bigint,
  'standard' : string,
}
export type CrossChainConf = {
    'native' : { 'chainIdent' : ChainIdent, 'inputDecimals' : bigint }
  } |
  { 'contract' : ContractConf } |
  { 'Delta' : null };
export type FilterArgs = { 'Id' : Index } |
  { 'To' : AddressId } |
  { 'All' : AddressId } |
  { 'From' : AddressId } |
  { 'TxId' : string };
export type Index = bigint;
export interface InitArgs {
  'web' : string,
  'decimals' : bigint,
  'code' : CoinCode,
  'name' : CoinName,
  'transferFee' : TransferFee,
  'crossChainConfs' : Array<CrossChainConf>,
  'max_supply' : [] | [bigint],
  'symbol' : string,
}
export type Kind = { 'Import' : ChainIdent__1 } |
  { 'burn' : null } |
  { 'mint' : null } |
  { 'export' : ChainIdent__1 } |
  { 'transfer' : null };
export type MetaDatum = [string, Value];
export type MoneyAddress = string;
export interface Token {
  'balance_of' : ActorMethod<[MoneyAddress], Balance>,
  'code' : ActorMethod<[], string>,
  'cyclesBalance' : ActorMethod<[], bigint>,
  'decimals' : ActorMethod<[], bigint>,
  'entriesAccounts' : ActorMethod<[], Array<[bigint, bigint]>>,
  'fee' : ActorMethod<[], TransferFee>,
  'filterTrxBuffer' : ActorMethod<[FilterArgs], Array<Transaction>>,
  'getCanisterData' : ActorMethod<[], Array<CanisterData>>,
  'listTransaction' : ActorMethod<
    [[] | [FilterArgs], bigint, number],
    Array<Transaction>
  >,
  'listTrxBuffer' : ActorMethod<[], Array<Transaction>>,
  'metadata' : ActorMethod<[], Array<MetaDatum>>,
  'name' : ActorMethod<[], string>,
  'queryTrxStatus' : ActorMethod<[], [bigint, bigint]>,
  'resetArgs' : ActorMethod<[InitArgs], undefined>,
  'rts_info' : ActorMethod<[], Array<[string, bigint]>>,
  'symbol' : ActorMethod<[], string>,
  'testTransferFee' : ActorMethod<[bigint], bigint>,
  'total_balance' : ActorMethod<[], Balance>,
  'total_transactions' : ActorMethod<[], bigint>,
  'transfer' : ActorMethod<[TransferArgs], TransferResult>,
  'updateControllers' : ActorMethod<[string], Array<boolean>>,
  'upgradeArchiveCanister' : ActorMethod<[Uint8Array | number[]], boolean>,
  'xfTransaction' : ActorMethod<[string], boolean>,
}
export interface Transaction {
  'id' : bigint,
  'to' : AddressId,
  'fee' : bigint,
  'from' : AddressId,
  'kind' : Kind,
  'memo' : string,
  'txId' : TxId,
  'chainFee' : [] | [bigint],
  'timestamp' : bigint,
  'amount' : bigint,
}
export interface TransferArgs {
  'to' : string,
  'from' : string,
  'kind' : Kind,
  'memo' : string,
  'txId' : TxId,
  'chainFee' : [] | [bigint],
  'amount' : bigint,
}
export interface TransferFee { 'max' : bigint, 'min' : bigint, 'rate' : bigint }
export type TransferResult = { 'ok' : [TxIndex, Balance, Balance] } |
  { 'err' : string };
export type TxId = string;
export type TxIndex = bigint;
export type Value = { 'Int' : bigint } |
  { 'Nat' : bigint } |
  { 'Blob' : Uint8Array | number[] } |
  { 'Text' : string };
export interface _SERVICE extends Token {}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
