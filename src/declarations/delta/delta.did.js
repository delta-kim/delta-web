export const idlFactory = ({ IDL }) => {
  const IcNetwork = IDL.Variant({
    'Mainnet' : IDL.Null,
    'Local' : IDL.Null,
    'Testnet' : IDL.Null,
  });
  const AdvanceAmount = IDL.Variant({
    'ECIF' : IDL.Nat,
    'MiningCredit' : IDL.Nat,
  });
  const CountryCode = IDL.Text;
  const DID = IDL.Text;
  const MobileNumber = IDL.Text;
  const Expiration = IDL.Nat;
  const Timestamp = IDL.Nat;
  const AccessNumberRecordAgrs = IDL.Record({
    'status' : IDL.Text,
    'reqNum' : IDL.Nat,
    'accessNumber' : MobileNumber,
    'expiration' : Expiration,
    'rewards' : IDL.Nat,
    'succNum' : IDL.Nat,
    'carrier' : IDL.Text,
    'online' : Timestamp,
  });
  const Token = IDL.Text;
  const IdentityToken = IDL.Record({ 'did' : DID, 'token' : Token });
  const CanisterId = IDL.Text;
  const AppIdentityTokenArgs = IDL.Record({
    'dAppIdentToken' : IdentityToken,
    'accCanisterId' : CanisterId,
  });
  const Result = IDL.Variant({
    'ok' : AccessNumberRecordAgrs,
    'err' : IDL.Text,
  });
  const CoinCode = IDL.Text;
  const CoinName = IDL.Text;
  const TransferFee = IDL.Record({
    'max' : IDL.Nat,
    'min' : IDL.Nat,
    'rate' : IDL.Nat,
  });
  const ChainIdent = IDL.Text;
  const ContractConf = IDL.Record({
    'chainIdent' : ChainIdent,
    'tokenAddress' : IDL.Text,
    'inputDecimals' : IDL.Nat,
    'standard' : IDL.Text,
  });
  const CrossChainConf = IDL.Variant({
    'native' : IDL.Record({
      'chainIdent' : ChainIdent,
      'inputDecimals' : IDL.Nat,
    }),
    'contract' : ContractConf,
    'Delta' : IDL.Null,
  });
  const LedgerInitArgs = IDL.Record({
    'web' : IDL.Text,
    'decimals' : IDL.Nat,
    'code' : CoinCode,
    'name' : CoinName,
    'transferFee' : TransferFee,
    'crossChainConfs' : IDL.Vec(CrossChainConf),
    'symbol' : IDL.Text,
  });
  const BasicInfo__1 = IDL.Record({
    'population' : IDL.Nat,
    'baseRate' : IDL.Nat,
  });
  const MobileAppType = IDL.Variant({ 'ios' : IDL.Null, 'android' : IDL.Null });
  const BasicInfo = IDL.Record({
    'appVersion' : IDL.Text,
    'population' : IDL.Nat,
    'baseRate' : IDL.Nat,
  });
  const Index = IDL.Nat;
  const E164Code = IDL.Text;
  const VerificationPack = IDL.Record({
    'verifyText' : IDL.Text,
    'encryptKey' : IDL.Text,
    'accessNumbers' : IDL.Vec(MobileNumber),
  });
  const SecurityCircleVerify = IDL.Variant({
    'code' : IDL.Text,
    'mobs' : IDL.Vec(IDL.Record({ 'did' : DID, 'mob' : MobileNumber })),
    'identity' : IdentityToken,
  });
  const Uid = IDL.Nat;
  const SendECIFargs = IDL.Record({
    'did' : DID,
    'qty' : IDL.Nat,
    'reason' : IDL.Text,
  });
  const AccessNumberRecordAgrs2 = IDL.Record({
    'did' : DID,
    'status' : IDL.Text,
    'reqNum' : IDL.Nat,
    'accessNumber' : MobileNumber,
    'expiration' : Expiration,
    'rewards' : IDL.Nat,
    'succNum' : IDL.Nat,
    'carrier' : IDL.Text,
    'online' : Timestamp,
  });
  const AccessNumberRecordAgrsAndTip = IDL.Record({
    'tip' : IDL.Text,
    'record' : IDL.Vec(AccessNumberRecordAgrs2),
  });
  const CanisterCodeType = IDL.Variant({
    'ICPfunds' : IDL.Null,
    'DappCenter' : IDL.Null,
    'LedgerArchive' : IDL.Null,
    'stats' : IDL.Null,
    'Ledgers' : CoinCode,
    'account' : IDL.Null,
    'PendingUSCT' : IDL.Null,
    'xCredits' : IDL.Null,
    'MultiChainWallet' : IDL.Null,
    'mobile' : IDL.Null,
    'RoadMap' : IDL.Null,
    'SettleUSCT' : IDL.Null,
  });
  const ActorCanisterId = IDL.Tuple(
    IDL.Text,
    IDL.Variant({ 'one' : CanisterId, 'list' : IDL.Vec(CanisterId) }),
  );
  const MobileApplastVersion = IDL.Variant({
    'ios' : IDL.Record({
      'version' : IDL.Text,
      'store' : IDL.Text,
      'notes' : IDL.Text,
    }),
    'android' : IDL.Record({
      'apk' : IDL.Text,
      'version' : IDL.Text,
      'store' : IDL.Text,
      'notes' : IDL.Text,
    }),
  });
  const CreditType = IDL.Variant({ 'DTCT' : IDL.Null, 'USCT' : IDL.Null });
  const CreditCanisterData = IDL.Record({
    'skip' : Index,
    'fulled' : IDL.Bool,
    'length' : Index,
    'canisterId' : CanisterId,
  });
  const CanisterDate = IDL.Record({
    'end' : Index,
    'fulled' : IDL.Bool,
    'start' : Index,
    'canisterId' : CanisterId,
  });
  const E164Code2 = IDL.Text;
  const E164AndISOCode = IDL.Tuple(E164Code, E164Code2, CountryCode);
  const VerifyStatus = IDL.Variant({
    'success' : IDL.Null,
    'waiting' : IDL.Null,
    'partSuccs' : IDL.Null,
  });
  const Update2Main = IDL.Variant({
    'LedgerArchiveId' : IDL.Tuple(CoinCode, CanisterId),
    'SubMiningCredit' : IDL.Nat,
    'SubECIF' : IDL.Nat,
  });
  const TotalCredit = IDL.Record({
    'fuel' : IDL.Nat,
    'mining' : IDL.Nat,
    'ecolog' : IDL.Nat,
    'consensusDev' : IDL.Nat,
  });
  const CanisterMapArgs = IDL.Record({
    'mobileCanisterId' : CanisterId,
    'statsCanisterId' : CanisterId,
    'pendingUSCTCanisterId' : CanisterId,
    'accountCanisters' : IDL.Vec(CanisterDate),
    'mcWalletCanisterId' : CanisterId,
    'ICPfundsCanisterId' : CanisterId,
    'Ledgers' : IDL.Vec(IDL.Tuple(CoinCode, CanisterId)),
    'dappCenterCanisterId' : CanisterId,
  });
  const Delta = IDL.Service({
    '_advanceAmount' : IDL.Func([AdvanceAmount], [IDL.Nat], []),
    '_createUSCTSettlReport' : IDL.Func(
        [IDL.Float64, IDL.Nat32, IDL.Nat32, IDL.Text],
        [IDL.Bool],
        [],
      ),
    '_debugShowAccessNumberList' : IDL.Func(
        [CountryCode],
        [IDL.Vec(IDL.Tuple(DID, AccessNumberRecordAgrs))],
        ['query'],
      ),
    '_delAccessNumber' : IDL.Func([DID, CountryCode, IDL.Text], [IDL.Bool], []),
    '_isAdmin' : IDL.Func([IDL.Principal], [IDL.Bool], ['query']),
    '_ledgerArchive_wasm_module' : IDL.Func([], [IDL.Vec(IDL.Nat8)], ['query']),
    'activeAccessNumber2online' : IDL.Func(
        [IDL.Text, CountryCode, AppIdentityTokenArgs],
        [Result],
        [],
      ),
    'addAccessNumber' : IDL.Func(
        [DID, IDL.Text, IDL.Text, Expiration],
        [IDL.Bool],
        [],
      ),
    'addNewLedgerCanister' : IDL.Func(
        [CoinCode, IDL.Opt(LedgerInitArgs)],
        [CanisterId],
        [],
      ),
    'appendMainCyclesLog' : IDL.Func([IDL.Nat64], [IDL.Bool], []),
    'applyNewDTCTCanister' : IDL.Func([], [CanisterId], []),
    'basicInfo' : IDL.Func([], [BasicInfo__1], ['query']),
    'basicInfo2' : IDL.Func([MobileAppType], [BasicInfo], ['query']),
    'buildAccessNumberActiveCode' : IDL.Func(
        [CanisterId, CountryCode, IdentityToken],
        [IDL.Text],
        [],
      ),
    'callbackVerification' : IDL.Func(
        [IDL.Text, AppIdentityTokenArgs],
        [IDL.Text],
        [],
      ),
    'checkAccessNumberLimit' : IDL.Func(
        [CountryCode],
        [
          IDL.Record({
            'err' : IDL.Text,
            'allowedNum' : IDL.Nat,
            'acNum' : IDL.Nat,
          }),
        ],
        ['composite_query'],
      ),
    'check_deposit_cycles' : IDL.Func([], [IDL.Bool], []),
    'countAccessNumberRecord' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(CountryCode, IDL.Nat))],
        ['query'],
      ),
    'countAccessNumberRecord2' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(CountryCode, IDL.Nat, IDL.Nat))],
        ['query'],
      ),
    'countDids' : IDL.Func([], [Index], ['query']),
    'createLogin' : IDL.Func(
        [IDL.Text, DID, IDL.Text],
        [CanisterId, DID, Token],
        [],
      ),
    'createVerification' : IDL.Func(
        [
          IDL.Vec(IDL.Text),
          IDL.Vec(DID),
          IDL.Text,
          E164Code,
          CountryCode,
          IDL.Text,
        ],
        [VerificationPack],
        [],
      ),
    'createVerification2' : IDL.Func(
        [
          IDL.Vec(IDL.Text),
          IDL.Vec(DID),
          IDL.Text,
          E164Code,
          CountryCode,
          SecurityCircleVerify,
        ],
        [VerificationPack],
        [],
      ),
    'cyclesBalance' : IDL.Func([], [IDL.Nat], ['query']),
    'deleteAccount' : IDL.Func(
        [IdentityToken, IDL.Text, IDL.Opt(DID)],
        [IDL.Vec(Uid)],
        [],
      ),
    'distributeECIF' : IDL.Func([DID, IDL.Nat, IDL.Text], [Index], []),
    'distributeECIF2' : IDL.Func([SendECIFargs, IDL.Text], [Index], []),
    'filterOptionalAccessNumbers' : IDL.Func(
        [CountryCode],
        [IDL.Vec(IDL.Tuple(DID, AccessNumberRecordAgrs))],
        ['query'],
      ),
    'filterOptionalAccessNumbers2' : IDL.Func(
        [CountryCode],
        [AccessNumberRecordAgrsAndTip],
        ['query'],
      ),
    'getAccessNumberRecord' : IDL.Func(
        [CountryCode, DID],
        [IDL.Opt(AccessNumberRecordAgrs)],
        ['query'],
      ),
    'getCanisterId' : IDL.Func([CanisterCodeType], [CanisterId], ['query']),
    'getCanisterIdMap' : IDL.Func([], [IDL.Vec(ActorCanisterId)], ['query']),
    'getCanisterStatus' : IDL.Func(
        [CanisterId],
        [IDL.Vec(IDL.Tuple(IDL.Text, IDL.Nat))],
        [],
      ),
    'getDSMSencryptKey' : IDL.Func(
        [MobileNumber, AppIdentityTokenArgs],
        [IDL.Text],
        ['composite_query'],
      ),
    'getMobileApplastVersion' : IDL.Func(
        [MobileAppType],
        [MobileApplastVersion],
        ['query'],
      ),
    'getXCreditCanisterData' : IDL.Func(
        [CreditType],
        [IDL.Vec(CreditCanisterData)],
        ['query'],
      ),
    'init' : IDL.Func(
        [IDL.Vec(IDL.Nat8), IDL.Vec(IDL.Nat8)],
        [IDL.Vec(IDL.Text)],
        [],
      ),
    'isAccountPrincipal' : IDL.Func([IDL.Principal], [IDL.Bool], ['query']),
    'isCanAddAccessNumber' : IDL.Func(
        [CountryCode, E164Code, MobileNumber],
        [IDL.Bool],
        ['composite_query'],
      ),
    'listAccountCanisterDate' : IDL.Func(
        [],
        [IDL.Vec(CanisterDate)],
        ['query'],
      ),
    'listCanisterStatus' : IDL.Func(
        [IDL.Vec(CanisterId)],
        [IDL.Vec(IDL.Tuple(CanisterId, IDL.Vec(IDL.Tuple(IDL.Text, IDL.Nat))))],
        [],
      ),
    'listE164map' : IDL.Func([], [IDL.Vec(E164AndISOCode)], ['query']),
    'matchAccountCanister' : IDL.Func([DID], [IDL.Opt(CanisterId)], ['query']),
    'matchAccountCanisters' : IDL.Func(
        [IDL.Vec(DID)],
        [IDL.Vec(IDL.Tuple(CanisterId, IDL.Vec(DID)))],
        ['query'],
      ),
    'parseDID' : IDL.Func([DID], [Index], ['query']),
    'parseMoneyAddress' : IDL.Func(
        [IDL.Text],
        [Index, IDL.Nat, IDL.Nat],
        ['query'],
      ),
    'pauseAccessNumber' : IDL.Func(
        [CountryCode, AppIdentityTokenArgs],
        [AccessNumberRecordAgrs],
        [],
      ),
    'queryVerifyStatus' : IDL.Func([IDL.Text], [VerifyStatus], ['query']),
    'receiveUpdates' : IDL.Func([Update2Main], [], ['oneway']),
    'reinstallCanister' : IDL.Func(
        [CanisterCodeType, IDL.Vec(IDL.Nat8)],
        [IDL.Text],
        [],
      ),
    'remainingTotalCredit' : IDL.Func([], [TotalCredit], ['composite_query']),
    'renewalAccessNumber' : IDL.Func(
        [DID, CountryCode, Expiration],
        [IDL.Bool],
        [],
      ),
    'rts_info' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Text, IDL.Nat))],
        ['query'],
      ),
    'setGlobalAccessNumber' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Opt(IDL.Text)],
        [IDL.Text],
        [],
      ),
    'showAccessToken' : IDL.Func(
        [IDL.Variant({ 'global' : IDL.Null, 'gsmsToken' : IDL.Null })],
        [IDL.Text],
        ['query'],
      ),
    'updateAccessNumberOnline' : IDL.Func(
        [CountryCode, AppIdentityTokenArgs],
        [AccessNumberRecordAgrs],
        [],
      ),
    'updateCanisterStatus' : IDL.Func([CanisterId], [IDL.Bool], []),
    'updateLedgersArgs' : IDL.Func([LedgerInitArgs], [], ['oneway']),
    'updateMobileApplastVersion' : IDL.Func(
        [IDL.Vec(MobileApplastVersion)],
        [IDL.Bool],
        [],
      ),
    'upgradeAccountArg' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(CanisterId, IDL.Tuple(IDL.Nat, CanisterMapArgs)))],
        ['query'],
      ),
    'upgradeCanister' : IDL.Func(
        [CanisterCodeType, IDL.Vec(IDL.Nat8)],
        [IDL.Text],
        [],
      ),
    'upload_wasm_module' : IDL.Func(
        [IDL.Vec(IDL.Nat8), IDL.Vec(IDL.Nat8)],
        [IDL.Bool],
        [],
      ),
    'verifyConfirmation' : IDL.Func(
        [IDL.Text],
        [VerifyStatus, MobileNumber],
        [],
      ),
    'whoami' : IDL.Func([], [CanisterId], ['query']),
  });
  return Delta;
};
export const init = ({ IDL }) => {
  const IcNetwork = IDL.Variant({
    'Mainnet' : IDL.Null,
    'Local' : IDL.Null,
    'Testnet' : IDL.Null,
  });
  return [IcNetwork];
};
