import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export type AccountIdentifier = Uint8Array | number[];
export type Balance = bigint;
export interface BindDataAgs {
  'startTime' : Timestamp,
  'moneyAddress' : MoneyAddress,
  'expiry' : Timestamp,
  'confirming' : [] | [[TxHash, string]],
  'received' : bigint,
  'canisterId' : CanisterId,
}
export type BindKey = string;
export type BitcoinAddress = string;
export type CanisterId = string;
export type ChainIdent = string;
export interface ChainInfo {
  'confirmations' : number,
  'transactionPath' : string,
  'chainType' : ChainType,
  'name' : ChainName,
  'explorer' : Url,
  'netFee' : { 'fixed' : bigint } |
    { 'smartFee' : null } |
    { 'baseBid' : null } |
    { 'custom' : null } |
    { 'baseBidTip' : null },
  'addressLength' : string,
  'addressPath' : string,
  'coinCode' : CoinCode,
  'ident' : ChainIdent,
}
export type ChainName = string;
export type ChainType = { 'EVM' : bigint } |
  { 'Null' : null } |
  { 'TRON' : bigint } |
  { 'UTXO' : null };
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
export interface DepositAddress {
  'expiryTime' : Timestamp,
  'address' : OutsideAdderss,
}
export interface ExportTokenFee { 'In' : bigint, 'out' : [bigint, CoinCode] }
export type ExportTokenResult = {
    'ok' : {
      'chainCoinCode' : CoinCode,
      'chainFee' : Balance,
      'txHash' : TxHash,
      'amount' : Balance,
    }
  } |
  { 'err' : Note } |
  { 'pending' : TxHash } |
  { 'rebuild' : null } |
  { 'execution' : null };
export interface HttpHeader { 'value' : string, 'name' : string }
export interface HttpResponsePayload {
  'status' : bigint,
  'body' : Uint8Array | number[],
  'headers' : Array<HttpHeader>,
}
export type IcNetwork = { 'Mainnet' : null } |
  { 'Local' : null } |
  { 'Testnet' : null };
export interface LedgerInitArgs {
  'web' : string,
  'decimals' : bigint,
  'code' : CoinCode,
  'name' : CoinName,
  'transferFee' : TransferFee,
  'crossChainConfs' : Array<CrossChainConf>,
  'symbol' : string,
}
export interface Main {
  '_testFindWalletMap' : ActorMethod<
    [string, OutsideAdderss],
    Array<[string, WalletDatas]>
  >,
  '_testlistWalletMap' : ActorMethod<[], Array<[string, WalletDatas]>>,
  'activateCoinLedger' : ActorMethod<[string], CanisterId>,
  'bindDepositReceivWalletAddress' : ActorMethod<
    [MoneyAddress, CoinCode, ChainIdent],
    DepositAddress
  >,
  'bitcoin_balance' : ActorMethod<[Network, BitcoinAddress], Satoshi>,
  'buildTransaction' : ActorMethod<
    [MoneyAddress, CoinCode, ChainIdent, bigint, OutsideAdderss],
    boolean
  >,
  'callBackOfTask' : ActorMethod<
    [TaskCBargs],
    {
      'receivedAmountResp' : Array<[bigint, string]>,
      'sentTxRawResp' : Array<[bigint, string]>,
    }
  >,
  'cyclesBalance' : ActorMethod<[], bigint>,
  'estimateNetWorkFee' : ActorMethod<
    [CoinCode, ChainIdent],
    [bigint, CoinCode]
  >,
  'fixReceivedCallback' : ActorMethod<[ReceivedAmountAgrs], [bigint, string]>,
  'getBindAdderss' : ActorMethod<[string], [[] | [OutsideAdderss], bigint]>,
  'getChainInfos' : ActorMethod<[], Array<ChainInfo>>,
  'getLedgerInitArgs' : ActorMethod<[CoinCode], LedgerInitArgs>,
  'getOutFee' : ActorMethod<[ChainIdent], TransferOutFee>,
  'get_current_fee_percentiles' : ActorMethod<
    [Network],
    BigUint64Array | bigint[]
  >,
  'httpTransform' : ActorMethod<[TransformArgs], HttpResponsePayload>,
  'listLedgerInitArgs' : ActorMethod<[], Array<LedgerInitArgs>>,
  'queryRSstatus' : ActorMethod<
    [MoneyAddress, CoinCode, Array<ChainIdent>],
    RSstatus
  >,
  'queryTask' : ActorMethod<[], TaskResult>,
  'removeChainInfo' : ActorMethod<[ChainIdent], boolean>,
  'removeLedgerInitArg' : ActorMethod<[string], boolean>,
  'rts_info' : ActorMethod<[], Array<[string, bigint]>>,
  'saveChainInfo' : ActorMethod<[Array<ChainInfo>], boolean>,
  'saveLedgerInitArgs' : ActorMethod<[LedgerInitArgs], boolean>,
  'testQueryRawTransactionPool' : ActorMethod<[], Array<QueryRawTxBindData>>,
  'testTransferNetWorkFee' : ActorMethod<
    [CoinCode, ChainIdent, bigint],
    ExportTokenFee
  >,
  'transferOutBTC' : ActorMethod<[OutsideAdderss, bigint], [string, bigint]>,
  'transferOutICP' : ActorMethod<[AccountIdentifier, bigint], bigint>,
  'unbindDeposit' : ActorMethod<
    [MoneyAddress, CoinCode, ChainIdent],
    undefined
  >,
}
export type MillisatoshiPerByte = bigint;
export type MoneyAddress = string;
export type Network = { 'Mainnet' : null } |
  { 'Regtest' : null } |
  { 'Testnet' : null };
export type Note = string;
export type OutsideAdderss = string;
export interface PendingRawTransaction {
  'raw' : string,
  'bindKey' : BindKey,
  'nonce' : bigint,
  'sendAddr' : OutsideAdderss,
}
export interface QueryRawTxBindData {
  'raw' : string,
  'status' : string,
  'txId' : string,
  'toAddr' : OutsideAdderss,
  'bindKey' : string,
  'chainCoinCode' : CoinCode,
  'nonce' : bigint,
  'sendAddr' : OutsideAdderss,
  'amount' : bigint,
  'canisterId' : CanisterId,
}
export interface RSstatus {
  'sendTrx' : Array<SendTrxStatus>,
  'received' : Array<ReceivedStatus>,
}
export interface ReceivedAmountAgrs {
  'id' : bigint,
  'result' : { 'confirming' : [TxHash, string] } |
    { 'received' : [TxHash, bigint, OutsideAdderss] },
  'chainIdent' : ChainIdent,
  'outsideAdderss' : OutsideAdderss,
  'coinCode' : CoinCode,
  'trxTime' : Timestamp,
}
export interface ReceivedStatus {
  'status' : { 'confirming' : [] | [[TxHash, string]], 'received' : bigint },
  'chainIdent' : ChainIdent,
  'outsideAdderss' : OutsideAdderss,
  'expiryTimeDiff' : Timestamp,
}
export type Satoshi = bigint;
export interface SendTrxStatus {
  'status' : string,
  'chainIdent' : ChainIdent,
  'txId' : string,
  'toAddr' : OutsideAdderss,
}
export interface TaskCBargs {
  'updateOutFee' : Array<[ChainIdent, TransferOutFee]>,
  'sentTxRaw' : Array<[bigint, BindKey, ExportTokenResult]>,
  'receivedAmount' : Array<ReceivedAmountAgrs>,
  'monitoredAddress' : Array<string>,
}
export interface TaskResult {
  'beMonitorAddress' : Array<string>,
  'beSentTransactions' : Array<PendingRawTransaction>,
}
export type Timestamp = bigint;
export interface TransferFee { 'max' : bigint, 'min' : bigint, 'rate' : bigint }
export type TransferOutFee = { 'smartFee' : { 'estimateSmartFee' : number } } |
  { 'baseBid' : { 'gasPrice' : bigint } } |
  { 'baseBidTip' : { 'gasPrice' : bigint, 'maxPriorityFeePerGas' : bigint } };
export interface TransformArgs {
  'context' : Uint8Array | number[],
  'response' : HttpResponsePayload,
}
export type TxHash = string;
export type Url = string;
export interface WalletDatas {
  'lastsBind' : Array<BindDataAgs>,
  'lockAmount' : Balance,
  'balance' : Balance,
  'publicKeyId' : bigint,
  'lastTxhash' : TxHash,
}
export interface _SERVICE extends Main {}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
