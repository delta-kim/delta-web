import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface AccessNumberRecordAgrs {
  'reqNum' : bigint,
  'accessNumber' : MobileNumber,
  'expiration' : Expiration,
  'rewards' : bigint,
  'succNum' : bigint,
  'carrier' : string,
  'online' : Timestamp,
}
export type ActorCanisterId = [
  string,
  { 'one' : CanisterId } |
    { 'list' : Array<CanisterId> },
];
export interface AppIdentityTokenArgs {
  'dAppIdentToken' : IdentityToken,
  'accCanisterId' : CanisterId,
}
export interface BasicInfo { 'population' : bigint, 'baseRate' : bigint }
export type CanisterCodeType = { 'ICPfunds' : null } |
  { 'DappCenter' : null } |
  { 'stats' : null } |
  { 'Ledgers' : CoinCode } |
  { 'account' : null } |
  { 'PendingUSCT' : null } |
  { 'xCredits' : null } |
  { 'MultiChainWallet' : null } |
  { 'mobile' : null } |
  { 'RoadMap' : null };
export interface CanisterDate {
  'end' : Index,
  'fulled' : boolean,
  'start' : Index,
  'canisterId' : CanisterId,
}
export type CanisterId = string;
export interface CanisterSettings {
  'freezing_threshold' : [] | [bigint],
  'controllers' : [] | [Array<Principal>],
  'memory_allocation' : [] | [bigint],
  'compute_allocation' : [] | [bigint],
}
export interface CanisterStatus {
  'status' : Status,
  'memory_size' : bigint,
  'cycles' : bigint,
  'settings' : CanisterSettings,
  'module_hash' : [] | [Uint8Array | number[]],
}
export type ChainIdent = string;
export type CoinCode = string;
export type CoinName = string;
export interface ContractConf {
  'chainIdent' : ChainIdent,
  'tokenAddress' : string,
  'inputDecimals' : bigint,
  'standard' : string,
}
export type CountryCode = string;
export interface CreditCanisterData {
  'skip' : Index,
  'fulled' : boolean,
  'length' : Index,
  'canisterId' : CanisterId,
}
export type CreditType = { 'DTCT' : null } |
  { 'USCT' : null };
export type CrossChainConf = {
    'native' : { 'chainIdent' : ChainIdent, 'inputDecimals' : bigint }
  } |
  { 'contract' : ContractConf } |
  { 'Delta' : null };
export type DID = string;
export type DID__1 = string;
export type DID__2 = string;
export interface DTCTHistory64 {
  'did' : DID__1,
  'summary' : Summary,
  'timestamp' : bigint,
  'index' : bigint,
  'amount' : bigint,
}
export interface Delta {
  '_isAdmin' : ActorMethod<[CanisterId], boolean>,
  '_ledgerArchive_wasm_module' : ActorMethod<[], Uint8Array | number[]>,
  'addAccessNumber' : ActorMethod<[DID, string, string, Expiration], boolean>,
  'addNewLedgerCanister' : ActorMethod<[CoinCode], CanisterId>,
  'appendCredits' : ActorMethod<[HistoryByType], boolean>,
  'basicInfo' : ActorMethod<[], BasicInfo>,
  'callbackVerification' : ActorMethod<[string, AppIdentityTokenArgs], string>,
  'checkAccessNumberLimit' : ActorMethod<
    [CountryCode],
    { 'err' : string, 'allowedNum' : bigint, 'acNum' : bigint }
  >,
  'countAccessNumberRecord' : ActorMethod<[], Array<[CountryCode, bigint]>>,
  'countDids' : ActorMethod<[], Index>,
  'createLogin' : ActorMethod<[string, DID, string], [CanisterId, DID, Token]>,
  'createVerification' : ActorMethod<
    [Array<string>, Array<DID>, string, E164Code, CountryCode, string],
    VerificationPack
  >,
  'cyclesBalance' : ActorMethod<[], bigint>,
  'filterOptionalAccessNumbers' : ActorMethod<
    [CountryCode],
    Array<[DID, AccessNumberRecordAgrs]>
  >,
  'getAccessNumberRecord' : ActorMethod<
    [CountryCode, DID],
    AccessNumberRecordAgrs
  >,
  'getCanisterId' : ActorMethod<[CanisterCodeType], CanisterId>,
  'getCanisterIdMap' : ActorMethod<[], Array<ActorCanisterId>>,
  'getCanisterStatus' : ActorMethod<
    [Array<CanisterId>],
    Array<[CanisterId, CanisterStatus]>
  >,
  'getDSMSencryptKey' : ActorMethod<
    [MobileNumber, AppIdentityTokenArgs],
    string
  >,
  'getMobileApplastVersion' : ActorMethod<
    [MobileAppType],
    MobileApplastVersion
  >,
  'getXCreditCanisterData' : ActorMethod<
    [CreditType],
    Array<CreditCanisterData>
  >,
  'httpTransform' : ActorMethod<[TransformArgs], HttpResponsePayload>,
  'init' : ActorMethod<
    [Uint8Array | number[], Uint8Array | number[]],
    Array<string>
  >,
  'isAccountPrincipal' : ActorMethod<[Principal], boolean>,
  'isCanAddAccessNumber' : ActorMethod<
    [CountryCode, E164Code, MobileNumber],
    boolean
  >,
  'listAccountCanisterDate' : ActorMethod<[], Array<CanisterDate>>,
  'listAllCanisterStatus' : ActorMethod<
    [],
    Array<[CanisterId, CanisterStatus]>
  >,
  'listE164map' : ActorMethod<[], Array<E164AndISOCode>>,
  'matchAccountCanister' : ActorMethod<[DID], [] | [CanisterId]>,
  'matchAccountCanisters' : ActorMethod<
    [Array<DID>],
    Array<[CanisterId, Array<DID>]>
  >,
  'parseDID' : ActorMethod<[DID], Index>,
  'queryVerifyStatus' : ActorMethod<[string], VerifyStatus>,
  'receiveUpdates' : ActorMethod<[Update2Main], undefined>,
  'reconcileUSCT' : ActorMethod<
    [string, Array<string>, BigUint64Array | bigint[], bigint],
    boolean
  >,
  'remainingTotalCredit' : ActorMethod<[], TotalCredit>,
  'renewalAccessNumber' : ActorMethod<[DID, CountryCode, Expiration], boolean>,
  'reset' : ActorMethod<[], boolean>,
  'rts_info' : ActorMethod<[], Array<[string, bigint]>>,
  'setGlobalAccessNumberByAdmin' : ActorMethod<[string, string], string>,
  'test' : ActorMethod<[], Array<[string, string]>>,
  'testAppend_DTCT' : ActorMethod<[], boolean>,
  'testWalletAddress' : ActorMethod<
    [Index, bigint],
    [string, bigint, bigint, bigint]
  >,
  'updateLedgersArgs' : ActorMethod<[LedgerInitArgs], undefined>,
  'updateMobileApplastVersion' : ActorMethod<[MobileApplastVersion], boolean>,
  'upgradeCanister' : ActorMethod<
    [CanisterCodeType, Uint8Array | number[]],
    string
  >,
  'upload_wasm_module' : ActorMethod<
    [Uint8Array | number[], Uint8Array | number[]],
    boolean
  >,
  'verifyConfirmation' : ActorMethod<[string], [VerifyStatus, MobileNumber]>,
  'whoami' : ActorMethod<[], CanisterId>,
}
export type E164AndISOCode = [E164Code, E164Code2, CountryCode];
export type E164Code = string;
export type E164Code2 = string;
export type Expiration = bigint;
export type HistoryByType = { 'DTCT' : Array<DTCTHistory64> } |
  { 'USCT' : Array<USCTHistory64> };
export interface HttpHeader { 'value' : string, 'name' : string }
export interface HttpResponsePayload {
  'status' : bigint,
  'body' : Uint8Array | number[],
  'headers' : Array<HttpHeader>,
}
export interface IdentityToken { 'did' : DID, 'token' : Token }
export type Index = bigint;
export interface LedgerInitArgs {
  'web' : string,
  'decimals' : bigint,
  'code' : CoinCode,
  'name' : CoinName,
  'transferFee' : TransferFee,
  'crossChainConfs' : Array<CrossChainConf>,
  'symbol' : string,
}
export type MobileAppType = { 'ios' : null } |
  { 'android' : null };
export type MobileApplastVersion = {
    'ios' : { 'version' : string, 'store' : string }
  } |
  { 'android' : { 'apk' : string, 'version' : string, 'store' : string } };
export type MobileNumber = string;
export type Status = { 'stopped' : null } |
  { 'stopping' : null } |
  { 'running' : null };
export type Summary = { 'ReleaseToMintDTC' : bigint } |
  { 'PreMint1DTCInEcosystem' : bigint } |
  { 'RecommendNewcomers' : DID__1 } |
  { 'DSMSVerifyReward' : DID__1 } |
  { 'RegisterFromReferrer' : DID__1 } |
  { 'Mining' : string } |
  { 'ICPCrowdfunding' : number } |
  { 'MiningReferralLevel1' : string } |
  { 'MiningReferralLevel2' : string };
export type Timestamp = bigint;
export type Token = string;
export interface TotalCredit {
  'fuel' : bigint,
  'mining' : bigint,
  'ecolog' : bigint,
  'consensusDev' : bigint,
}
export interface TransferFee { 'max' : bigint, 'min' : bigint, 'rate' : bigint }
export interface TransformArgs {
  'context' : Uint8Array | number[],
  'response' : HttpResponsePayload,
}
export interface USCTHistory64 {
  'did' : DID__2,
  'created' : bigint,
  'adId' : string,
  'summary' : USCTSummary,
  'checkTime' : bigint,
  'advertiser' : string,
  'index' : bigint,
  'amount' : bigint,
}
export type USCTSummary = { 'ConvertToUSDT' : [number, bigint] } |
  { 'AdRewards' : null } |
  { 'AdRewardsReferralLevel1' : DID__2 } |
  { 'AdRewardsReferralLevel2' : DID__2 };
export type Update2Main = { 'LedgerArchiveId' : [CoinCode, CanisterId] } |
  { 'SubMiningCredit' : bigint };
export interface VerificationPack {
  'verifyText' : string,
  'encryptKey' : string,
  'accessNumbers' : Array<MobileNumber>,
}
export type VerifyStatus = { 'success' : null } |
  { 'waiting' : null } |
  { 'partSuccs' : null };
export interface _SERVICE extends Delta {}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
