import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface AccessNumberRecordAgrs {
  'status' : string,
  'reqNum' : bigint,
  'accessNumber' : MobileNumber,
  'expiration' : Expiration,
  'rewards' : bigint,
  'succNum' : bigint,
  'carrier' : string,
  'online' : Timestamp,
}
export interface AccessNumberRecordAgrs2 {
  'did' : DID,
  'status' : string,
  'reqNum' : bigint,
  'accessNumber' : MobileNumber,
  'expiration' : Expiration,
  'rewards' : bigint,
  'succNum' : bigint,
  'carrier' : string,
  'online' : Timestamp,
}
export interface AccessNumberRecordAgrsAndTip {
  'tip' : string,
  'record' : Array<AccessNumberRecordAgrs2>,
}
export type ActorCanisterId = [
  string,
  { 'one' : CanisterId } |
    { 'list' : Array<CanisterId> },
];
export type AdvanceAmount = { 'ECIF' : bigint } |
  { 'MiningCredit' : bigint };
export interface AppIdentityTokenArgs {
  'dAppIdentToken' : IdentityToken,
  'accCanisterId' : CanisterId,
}
export interface BasicInfo { 'population' : bigint, 'baseRate' : bigint }
export type CanisterCodeType = { 'ICPfunds' : null } |
  { 'DappCenter' : null } |
  { 'LedgerArchive' : null } |
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
export interface CanisterMapArgs {
  'mobileCanisterId' : CanisterId,
  'statsCanisterId' : CanisterId,
  'pendingUSCTCanisterId' : CanisterId,
  'accountCanisters' : Array<CanisterDate>,
  'mcWalletCanisterId' : CanisterId,
  'ICPfundsCanisterId' : CanisterId,
  'Ledgers' : Array<[CoinCode, CanisterId]>,
  'dappCenterCanisterId' : CanisterId,
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
export interface Delta {
  '_advanceAmount' : ActorMethod<[AdvanceAmount], bigint>,
  '_debugShowAccessNumberList' : ActorMethod<
    [CountryCode],
    Array<[DID, AccessNumberRecordAgrs]>
  >,
  '_delAccessNumber' : ActorMethod<[DID, CountryCode, string], boolean>,
  '_isAdmin' : ActorMethod<[Principal], boolean>,
  '_ledgerArchive_wasm_module' : ActorMethod<[], Uint8Array | number[]>,
  'activeAccessNumber2online' : ActorMethod<
    [string, CountryCode, AppIdentityTokenArgs],
    Result
  >,
  'addAccessNumber' : ActorMethod<[DID, string, string, Expiration], boolean>,
  'addNewLedgerCanister' : ActorMethod<
    [CoinCode, [] | [LedgerInitArgs]],
    CanisterId
  >,
  'appendMainCyclesLog' : ActorMethod<[bigint], boolean>,
  'applyNewDTCTCanister' : ActorMethod<[], CanisterId>,
  'basicInfo' : ActorMethod<[], BasicInfo>,
  'buildAccessNumberActiveCode' : ActorMethod<
    [CanisterId, CountryCode, IdentityToken],
    string
  >,
  'callbackVerification' : ActorMethod<[string, AppIdentityTokenArgs], string>,
  'checkAccessNumberLimit' : ActorMethod<
    [CountryCode],
    { 'err' : string, 'allowedNum' : bigint, 'acNum' : bigint }
  >,
  'countAccessNumberRecord' : ActorMethod<[], Array<[CountryCode, bigint]>>,
  'countAccessNumberRecord2' : ActorMethod<
    [],
    Array<[CountryCode, bigint, bigint]>
  >,
  'countDids' : ActorMethod<[], Index>,
  'createLogin' : ActorMethod<[string, DID, string], [CanisterId, DID, Token]>,
  'createVerification' : ActorMethod<
    [Array<string>, Array<DID>, string, E164Code, CountryCode, string],
    VerificationPack
  >,
  'createVerification2' : ActorMethod<
    [
      Array<string>,
      Array<DID>,
      string,
      E164Code,
      CountryCode,
      SecurityCircleVerify,
    ],
    VerificationPack
  >,
  'cyclesBalance' : ActorMethod<[], bigint>,
  'deleteAccount' : ActorMethod<
    [IdentityToken, string, [] | [DID]],
    Array<Uid>
  >,
  'distributeECIF' : ActorMethod<[DID, bigint, string], Index>,
  'filterOptionalAccessNumbers' : ActorMethod<
    [CountryCode],
    Array<[DID, AccessNumberRecordAgrs]>
  >,
  'filterOptionalAccessNumbers2' : ActorMethod<
    [CountryCode],
    AccessNumberRecordAgrsAndTip
  >,
  'getAccessNumberRecord' : ActorMethod<
    [CountryCode, DID],
    [] | [AccessNumberRecordAgrs]
  >,
  'getCanisterId' : ActorMethod<[CanisterCodeType], CanisterId>,
  'getCanisterIdMap' : ActorMethod<[], Array<ActorCanisterId>>,
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
  'listE164map' : ActorMethod<[], Array<E164AndISOCode>>,
  'matchAccountCanister' : ActorMethod<[DID], [] | [CanisterId]>,
  'matchAccountCanisters' : ActorMethod<
    [Array<DID>],
    Array<[CanisterId, Array<DID>]>
  >,
  'parseDID' : ActorMethod<[DID], Index>,
  'parseMoneyAddress' : ActorMethod<[string], [Index, bigint, bigint]>,
  'pauseAccessNumber' : ActorMethod<
    [CountryCode, AppIdentityTokenArgs],
    AccessNumberRecordAgrs
  >,
  'queryVerifyStatus' : ActorMethod<[string], VerifyStatus>,
  'receiveUpdates' : ActorMethod<[Update2Main], undefined>,
  'reconcileUSCT' : ActorMethod<
    [string, Array<string>, BigUint64Array | bigint[], bigint],
    boolean
  >,
  'reinstallCanister' : ActorMethod<
    [CanisterCodeType, Uint8Array | number[]],
    string
  >,
  'remainingTotalCredit' : ActorMethod<[], TotalCredit>,
  'renewalAccessNumber' : ActorMethod<[DID, CountryCode, Expiration], boolean>,
  'rts_info' : ActorMethod<[], Array<[string, bigint]>>,
  'setGlobalAccessNumber' : ActorMethod<
    [string, string, [] | [string]],
    string
  >,
  'showAccessToken' : ActorMethod<
    [{ 'global' : null } | { 'gsmsToken' : null }],
    string
  >,
  'updateAccessNumberOnline' : ActorMethod<
    [CountryCode, AppIdentityTokenArgs],
    AccessNumberRecordAgrs
  >,
  'updateCanisterStatus' : ActorMethod<[CanisterId], boolean>,
  'updateLedgersArgs' : ActorMethod<[LedgerInitArgs], undefined>,
  'updateMobileApplastVersion' : ActorMethod<
    [Array<MobileApplastVersion>],
    boolean
  >,
  'upgradeAccountArg' : ActorMethod<
    [],
    Array<[CanisterId, [bigint, CanisterMapArgs]]>
  >,
  'upgradeCanister' : ActorMethod<
    [CanisterCodeType, Uint8Array | number[]],
    string
  >,
  'upgradeCanisterArg' : ActorMethod<
    [CanisterCodeType],
    Array<[CanisterId, Uint8Array | number[]]>
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
export type IcNetwork = { 'Mainnet' : null } |
  { 'Local' : null } |
  { 'Testnet' : null };
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
    'ios' : { 'version' : string, 'store' : string, 'notes' : string }
  } |
  {
    'android' : {
      'apk' : string,
      'version' : string,
      'store' : string,
      'notes' : string,
    }
  };
export type MobileNumber = string;
export type Result = { 'ok' : AccessNumberRecordAgrs } |
  { 'err' : string };
export type SecurityCircleVerify = { 'code' : string } |
  { 'mobs' : Array<{ 'did' : DID, 'mob' : MobileNumber }> } |
  { 'identity' : IdentityToken };
export type Timestamp = bigint;
export type Token = string;
export interface TotalCredit {
  'fuel' : bigint,
  'mining' : bigint,
  'ecolog' : bigint,
  'consensusDev' : bigint,
}
export interface TransferFee { 'max' : bigint, 'min' : bigint, 'rate' : bigint }
export type Uid = bigint;
export type Update2Main = { 'LedgerArchiveId' : [CoinCode, CanisterId] } |
  { 'SubMiningCredit' : bigint } |
  { 'SubECIF' : bigint };
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
