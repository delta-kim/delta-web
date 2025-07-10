export const idlFactory = ({ IDL }) => {
  const CanisterId = IDL.Text;
  const IcNetwork = IDL.Variant({
    'Mainnet' : IDL.Null,
    'Local' : IDL.Null,
    'Testnet' : IDL.Null,
  });
  const OutsideAdderss = IDL.Text;
  const Timestamp = IDL.Nat;
  const MoneyAddress = IDL.Text;
  const TxHash = IDL.Text;
  const BindDataAgs = IDL.Record({
    'startTime' : Timestamp,
    'moneyAddress' : MoneyAddress,
    'expiry' : Timestamp,
    'confirming' : IDL.Opt(IDL.Tuple(TxHash, IDL.Text)),
    'received' : IDL.Nat,
    'canisterId' : CanisterId,
  });
  const Balance = IDL.Nat;
  const WalletDatas = IDL.Record({
    'lastsBind' : IDL.Vec(BindDataAgs),
    'lockAmount' : Balance,
    'balance' : Balance,
    'publicKeyId' : IDL.Nat,
    'lastTxhash' : TxHash,
  });
  const CoinCode = IDL.Text;
  const ChainIdent = IDL.Text;
  const DepositAddress = IDL.Record({
    'expiryTime' : Timestamp,
    'address' : OutsideAdderss,
  });
  const Network = IDL.Variant({
    'Mainnet' : IDL.Null,
    'Regtest' : IDL.Null,
    'Testnet' : IDL.Null,
  });
  const BitcoinAddress = IDL.Text;
  const Satoshi = IDL.Nat64;
  const TransferOutFee = IDL.Variant({
    'smartFee' : IDL.Record({ 'estimateSmartFee' : IDL.Float64 }),
    'baseBid' : IDL.Record({ 'gasPrice' : IDL.Nat }),
    'baseBidTip' : IDL.Record({
      'gasPrice' : IDL.Nat,
      'maxPriorityFeePerGas' : IDL.Nat,
    }),
  });
  const BindKey = IDL.Text;
  const Note = IDL.Text;
  const ExportTokenResult = IDL.Variant({
    'ok' : IDL.Record({
      'chainCoinCode' : CoinCode,
      'chainFee' : Balance,
      'txHash' : TxHash,
      'amount' : Balance,
    }),
    'err' : Note,
    'pending' : TxHash,
    'rebuild' : IDL.Null,
    'execution' : IDL.Null,
  });
  const ReceivedAmountAgrs = IDL.Record({
    'id' : IDL.Nat,
    'result' : IDL.Variant({
      'confirming' : IDL.Tuple(TxHash, IDL.Text),
      'received' : IDL.Tuple(TxHash, IDL.Nat, OutsideAdderss),
    }),
    'chainIdent' : ChainIdent,
    'outsideAdderss' : OutsideAdderss,
    'coinCode' : CoinCode,
    'trxTime' : Timestamp,
  });
  const TaskCBargs = IDL.Record({
    'updateOutFee' : IDL.Vec(IDL.Tuple(ChainIdent, TransferOutFee)),
    'sentTxRaw' : IDL.Vec(IDL.Tuple(IDL.Nat, BindKey, ExportTokenResult)),
    'receivedAmount' : IDL.Vec(ReceivedAmountAgrs),
    'monitoredAddress' : IDL.Vec(IDL.Text),
  });
  const ChainType = IDL.Variant({
    'EVM' : IDL.Nat,
    'Null' : IDL.Null,
    'TRON' : IDL.Nat,
    'UTXO' : IDL.Null,
  });
  const ChainName = IDL.Text;
  const Url = IDL.Text;
  const ChainInfo = IDL.Record({
    'confirmations' : IDL.Nat8,
    'transactionPath' : IDL.Text,
    'chainType' : ChainType,
    'name' : ChainName,
    'explorer' : Url,
    'netFee' : IDL.Variant({
      'fixed' : IDL.Nat,
      'smartFee' : IDL.Null,
      'baseBid' : IDL.Null,
      'custom' : IDL.Null,
      'baseBidTip' : IDL.Null,
    }),
    'addressLength' : IDL.Text,
    'addressPath' : IDL.Text,
    'coinCode' : CoinCode,
    'ident' : ChainIdent,
  });
  const CoinName = IDL.Text;
  const TransferFee = IDL.Record({
    'max' : IDL.Nat,
    'min' : IDL.Nat,
    'rate' : IDL.Nat,
  });
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
  const MillisatoshiPerByte = IDL.Nat64;
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
  const SendTrxStatus = IDL.Record({
    'status' : IDL.Text,
    'chainIdent' : ChainIdent,
    'txId' : IDL.Text,
    'toAddr' : OutsideAdderss,
  });
  const ReceivedStatus = IDL.Record({
    'status' : IDL.Record({
      'confirming' : IDL.Opt(IDL.Tuple(TxHash, IDL.Text)),
      'received' : IDL.Nat,
    }),
    'chainIdent' : ChainIdent,
    'outsideAdderss' : OutsideAdderss,
    'expiryTimeDiff' : Timestamp,
  });
  const RSstatus = IDL.Record({
    'sendTrx' : IDL.Vec(SendTrxStatus),
    'received' : IDL.Vec(ReceivedStatus),
  });
  const PendingRawTransaction = IDL.Record({
    'raw' : IDL.Text,
    'bindKey' : BindKey,
    'nonce' : IDL.Nat,
    'sendAddr' : OutsideAdderss,
  });
  const TaskResult = IDL.Record({
    'beMonitorAddress' : IDL.Vec(IDL.Text),
    'beSentTransactions' : IDL.Vec(PendingRawTransaction),
  });
  const QueryRawTxBindData = IDL.Record({
    'raw' : IDL.Text,
    'status' : IDL.Text,
    'txId' : IDL.Text,
    'toAddr' : OutsideAdderss,
    'bindKey' : IDL.Text,
    'chainCoinCode' : CoinCode,
    'nonce' : IDL.Nat,
    'sendAddr' : OutsideAdderss,
    'amount' : IDL.Nat,
    'canisterId' : CanisterId,
  });
  const ExportTokenFee = IDL.Record({
    'In' : IDL.Nat,
    'out' : IDL.Tuple(IDL.Nat, CoinCode),
  });
  const AccountIdentifier = IDL.Vec(IDL.Nat8);
  const Main = IDL.Service({
    '_testFindWalletMap' : IDL.Func(
        [IDL.Text, OutsideAdderss],
        [IDL.Vec(IDL.Tuple(IDL.Text, WalletDatas))],
        ['query'],
      ),
    '_testlistWalletMap' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Text, WalletDatas))],
        ['query'],
      ),
    'activateCoinLedger' : IDL.Func([IDL.Text], [CanisterId], []),
    'bindDepositReceivWalletAddress' : IDL.Func(
        [MoneyAddress, CoinCode, ChainIdent],
        [DepositAddress],
        [],
      ),
    'bitcoin_balance' : IDL.Func([Network, BitcoinAddress], [Satoshi], []),
    'buildTransaction' : IDL.Func(
        [MoneyAddress, CoinCode, ChainIdent, IDL.Nat, OutsideAdderss],
        [IDL.Bool],
        [],
      ),
    'callBackOfTask' : IDL.Func(
        [TaskCBargs],
        [
          IDL.Record({
            'receivedAmountResp' : IDL.Vec(IDL.Tuple(IDL.Nat, IDL.Text)),
            'sentTxRawResp' : IDL.Vec(IDL.Tuple(IDL.Nat, IDL.Text)),
          }),
        ],
        [],
      ),
    'cyclesBalance' : IDL.Func([], [IDL.Nat], ['query']),
    'estimateNetWorkFee' : IDL.Func(
        [CoinCode, ChainIdent],
        [IDL.Nat, CoinCode],
        ['query'],
      ),
    'fixReceivedCallback' : IDL.Func(
        [ReceivedAmountAgrs],
        [IDL.Nat, IDL.Text],
        [],
      ),
    'getBindAdderss' : IDL.Func(
        [IDL.Text],
        [IDL.Opt(OutsideAdderss), IDL.Nat],
        ['query'],
      ),
    'getChainInfos' : IDL.Func([], [IDL.Vec(ChainInfo)], ['query']),
    'getLedgerInitArgs' : IDL.Func([CoinCode], [LedgerInitArgs], ['query']),
    'getOutFee' : IDL.Func([ChainIdent], [TransferOutFee], ['query']),
    'get_current_fee_percentiles' : IDL.Func(
        [Network],
        [IDL.Vec(MillisatoshiPerByte)],
        [],
      ),
    'httpTransform' : IDL.Func(
        [TransformArgs],
        [HttpResponsePayload],
        ['query'],
      ),
    'listLedgerInitArgs' : IDL.Func([], [IDL.Vec(LedgerInitArgs)], ['query']),
    'queryRSstatus' : IDL.Func(
        [MoneyAddress, CoinCode, IDL.Vec(ChainIdent)],
        [RSstatus],
        ['query'],
      ),
    'queryTask' : IDL.Func([], [TaskResult], ['query']),
    'removeChainInfo' : IDL.Func([ChainIdent], [IDL.Bool], []),
    'removeLedgerInitArg' : IDL.Func([IDL.Text], [IDL.Bool], []),
    'rts_info' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Text, IDL.Nat))],
        ['query'],
      ),
    'saveChainInfo' : IDL.Func([IDL.Vec(ChainInfo)], [IDL.Bool], []),
    'saveLedgerInitArgs' : IDL.Func([LedgerInitArgs], [IDL.Bool], []),
    'testQueryRawTransactionPool' : IDL.Func(
        [],
        [IDL.Vec(QueryRawTxBindData)],
        ['query'],
      ),
    'testTransferNetWorkFee' : IDL.Func(
        [CoinCode, ChainIdent, IDL.Nat],
        [ExportTokenFee],
        ['query'],
      ),
    'transferOutBTC' : IDL.Func(
        [OutsideAdderss, IDL.Nat],
        [IDL.Text, IDL.Nat],
        [],
      ),
    'transferOutICP' : IDL.Func([AccountIdentifier, IDL.Nat], [IDL.Nat64], []),
    'unbindDeposit' : IDL.Func(
        [MoneyAddress, CoinCode, ChainIdent],
        [],
        ['oneway'],
      ),
  });
  return Main;
};
export const init = ({ IDL }) => {
  const CanisterId = IDL.Text;
  const IcNetwork = IDL.Variant({
    'Mainnet' : IDL.Null,
    'Local' : IDL.Null,
    'Testnet' : IDL.Null,
  });
  return [CanisterId, IDL.Text, IcNetwork];
};
