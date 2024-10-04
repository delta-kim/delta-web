export const idlFactory = ({ IDL }) => {
  const CanisterId = IDL.Text;
  const DID = IDL.Text;
  const Expiration = IDL.Nat;
  const CoinCode = IDL.Text;
  const DID__1 = IDL.Text;
  const Summary = IDL.Variant({
    'ReleaseToMintDTC' : IDL.Nat64,
    'PreMint1DTCInEcosystem' : IDL.Nat64,
    'RecommendNewcomers' : DID__1,
    'DSMSVerifyReward' : DID__1,
    'RegisterFromReferrer' : DID__1,
    'Mining' : IDL.Text,
    'ICPCrowdfunding' : IDL.Nat32,
    'MiningReferralLevel1' : IDL.Text,
    'MiningReferralLevel2' : IDL.Text,
  });
  const DTCTHistory64 = IDL.Record({
    'did' : DID__1,
    'summary' : Summary,
    'timestamp' : IDL.Nat64,
    'index' : IDL.Nat64,
    'amount' : IDL.Int64,
  });
  const DID__2 = IDL.Text;
  const USCTSummary = IDL.Variant({
    'ConvertToUSDT' : IDL.Tuple(IDL.Float64, IDL.Nat64),
    'AdRewards' : IDL.Null,
    'AdRewardsReferralLevel1' : DID__2,
    'AdRewardsReferralLevel2' : DID__2,
  });
  const USCTHistory64 = IDL.Record({
    'did' : DID__2,
    'created' : IDL.Nat64,
    'adId' : IDL.Text,
    'summary' : USCTSummary,
    'checkTime' : IDL.Nat64,
    'advertiser' : IDL.Text,
    'index' : IDL.Nat64,
    'amount' : IDL.Int64,
  });
  const HistoryByType = IDL.Variant({
    'DTCT' : IDL.Vec(DTCTHistory64),
    'USCT' : IDL.Vec(USCTHistory64),
  });
  const BasicInfo = IDL.Record({
    'population' : IDL.Nat,
    'baseRate' : IDL.Nat,
  });
  const Token = IDL.Text;
  const IdentityToken = IDL.Record({ 'did' : DID, 'token' : Token });
  const AppIdentityTokenArgs = IDL.Record({
    'dAppIdentToken' : IdentityToken,
    'accCanisterId' : CanisterId,
  });
  const CountryCode = IDL.Text;
  const Index = IDL.Nat;
  const E164Code = IDL.Text;
  const MobileNumber = IDL.Text;
  const VerificationPack = IDL.Record({
    'verifyText' : IDL.Text,
    'encryptKey' : IDL.Text,
    'accessNumbers' : IDL.Vec(MobileNumber),
  });
  const Timestamp = IDL.Nat;
  const AccessNumberRecordAgrs = IDL.Record({
    'reqNum' : IDL.Nat,
    'accessNumber' : MobileNumber,
    'expiration' : Expiration,
    'rewards' : IDL.Nat,
    'succNum' : IDL.Nat,
    'carrier' : IDL.Text,
    'online' : Timestamp,
  });
  const CanisterCodeType = IDL.Variant({
    'ICPfunds' : IDL.Null,
    'DappCenter' : IDL.Null,
    'stats' : IDL.Null,
    'Ledgers' : CoinCode,
    'account' : IDL.Null,
    'PendingUSCT' : IDL.Null,
    'xCredits' : IDL.Null,
    'MultiChainWallet' : IDL.Null,
    'mobile' : IDL.Null,
    'RoadMap' : IDL.Null,
  });
  const ActorCanisterId = IDL.Tuple(
    IDL.Text,
    IDL.Variant({ 'one' : CanisterId, 'list' : IDL.Vec(CanisterId) }),
  );
  const Status = IDL.Variant({
    'stopped' : IDL.Null,
    'stopping' : IDL.Null,
    'running' : IDL.Null,
  });
  const CanisterSettings = IDL.Record({
    'freezing_threshold' : IDL.Opt(IDL.Nat),
    'controllers' : IDL.Opt(IDL.Vec(IDL.Principal)),
    'memory_allocation' : IDL.Opt(IDL.Nat),
    'compute_allocation' : IDL.Opt(IDL.Nat),
  });
  const CanisterStatus = IDL.Record({
    'status' : Status,
    'memory_size' : IDL.Nat,
    'cycles' : IDL.Nat,
    'settings' : CanisterSettings,
    'module_hash' : IDL.Opt(IDL.Vec(IDL.Nat8)),
  });
  const MobileAppType = IDL.Variant({ 'ios' : IDL.Null, 'android' : IDL.Null });
  const MobileApplastVersion = IDL.Variant({
    'ios' : IDL.Record({ 'version' : IDL.Text, 'store' : IDL.Text }),
    'android' : IDL.Record({
      'apk' : IDL.Text,
      'version' : IDL.Text,
      'store' : IDL.Text,
    }),
  });
  const CreditType = IDL.Variant({ 'DTCT' : IDL.Null, 'USCT' : IDL.Null });
  const CreditCanisterData = IDL.Record({
    'skip' : Index,
    'fulled' : IDL.Bool,
    'length' : Index,
    'canisterId' : CanisterId,
  });
  const HttpHeader = IDL.Record({ 'value' : IDL.Text, 'name' : IDL.Text });
  const HttpResponsePayload = IDL.Record({
    'status' : IDL.Nat,
    'body' : IDL.Vec(IDL.Nat8),
    'headers' : IDL.Vec(HttpHeader),
  });
  const TransformArgs = IDL.Record({
    'context' : IDL.Vec(IDL.Nat8),
    'response' : HttpResponsePayload,
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
  });
  const TotalCredit = IDL.Record({
    'fuel' : IDL.Nat,
    'mining' : IDL.Nat,
    'ecolog' : IDL.Nat,
    'consensusDev' : IDL.Nat,
  });
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
  const Delta = IDL.Service({
    '_isAdmin' : IDL.Func([CanisterId], [IDL.Bool], ['query']),
    '_ledgerArchive_wasm_module' : IDL.Func([], [IDL.Vec(IDL.Nat8)], ['query']),
    'addAccessNumber' : IDL.Func(
        [DID, IDL.Text, IDL.Text, Expiration],
        [IDL.Bool],
        [],
      ),
    'addNewLedgerCanister' : IDL.Func([CoinCode], [CanisterId], []),
    'appendCredits' : IDL.Func([HistoryByType], [IDL.Bool], []),
    'basicInfo' : IDL.Func([], [BasicInfo], ['query']),
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
    'countAccessNumberRecord' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(CountryCode, IDL.Nat))],
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
    'cyclesBalance' : IDL.Func([], [IDL.Nat], ['query']),
    'filterOptionalAccessNumbers' : IDL.Func(
        [CountryCode],
        [IDL.Vec(IDL.Tuple(DID, AccessNumberRecordAgrs))],
        ['query'],
      ),
    'getAccessNumberRecord' : IDL.Func(
        [CountryCode, DID],
        [AccessNumberRecordAgrs],
        ['query'],
      ),
    'getCanisterId' : IDL.Func([CanisterCodeType], [CanisterId], ['query']),
    'getCanisterIdMap' : IDL.Func([], [IDL.Vec(ActorCanisterId)], ['query']),
    'getCanisterStatus' : IDL.Func(
        [IDL.Vec(CanisterId)],
        [IDL.Vec(IDL.Tuple(CanisterId, CanisterStatus))],
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
    'httpTransform' : IDL.Func(
        [TransformArgs],
        [HttpResponsePayload],
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
    'listAllCanisterStatus' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(CanisterId, CanisterStatus))],
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
    'queryVerifyStatus' : IDL.Func([IDL.Text], [VerifyStatus], ['query']),
    'receiveUpdates' : IDL.Func([Update2Main], [], ['oneway']),
    'reconcileUSCT' : IDL.Func(
        [IDL.Text, IDL.Vec(IDL.Text), IDL.Vec(IDL.Nat64), IDL.Nat64],
        [IDL.Bool],
        [],
      ),
    'remainingTotalCredit' : IDL.Func([], [TotalCredit], ['query']),
    'renewalAccessNumber' : IDL.Func(
        [DID, CountryCode, Expiration],
        [IDL.Bool],
        [],
      ),
    'reset' : IDL.Func([], [IDL.Bool], []),
    'rts_info' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Text, IDL.Nat))],
        ['query'],
      ),
    'setGlobalAccessNumberByAdmin' : IDL.Func(
        [IDL.Text, IDL.Text],
        [IDL.Text],
        [],
      ),
    'test' : IDL.Func([], [IDL.Vec(IDL.Tuple(IDL.Text, IDL.Text))], ['query']),
    'testAppend_DTCT' : IDL.Func([], [IDL.Bool], []),
    'testWalletAddress' : IDL.Func(
        [Index, IDL.Nat],
        [IDL.Text, IDL.Nat, IDL.Nat, IDL.Nat],
        [],
      ),
    'updateLedgersArgs' : IDL.Func([LedgerInitArgs], [], ['oneway']),
    'updateMobileApplastVersion' : IDL.Func(
        [MobileApplastVersion],
        [IDL.Bool],
        [],
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
  const CanisterId = IDL.Text;
  return [CanisterId];
};
