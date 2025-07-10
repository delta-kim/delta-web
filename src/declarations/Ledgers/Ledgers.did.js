export const idlFactory = ({ IDL }) => {
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
  const InitArgs = IDL.Record({
    'web' : IDL.Text,
    'decimals' : IDL.Nat,
    'code' : CoinCode,
    'name' : CoinName,
    'transferFee' : TransferFee,
    'crossChainConfs' : IDL.Vec(CrossChainConf),
    'max_supply' : IDL.Opt(IDL.Nat),
    'symbol' : IDL.Text,
  });
  const MoneyAddress = IDL.Text;
  const Balance = IDL.Nat;
  const Index = IDL.Nat;
  const AddressId = IDL.Text;
  const FilterArgs = IDL.Variant({
    'Id' : Index,
    'To' : AddressId,
    'All' : AddressId,
    'From' : AddressId,
    'TxId' : IDL.Text,
  });
  const ChainIdent__1 = IDL.Text;
  const Kind = IDL.Variant({
    'Import' : ChainIdent__1,
    'burn' : IDL.Null,
    'mint' : IDL.Null,
    'export' : ChainIdent__1,
    'transfer' : IDL.Null,
  });
  const TxId = IDL.Text;
  const Transaction = IDL.Record({
    'id' : IDL.Nat,
    'to' : AddressId,
    'fee' : IDL.Nat,
    'from' : AddressId,
    'kind' : Kind,
    'memo' : IDL.Text,
    'txId' : TxId,
    'chainFee' : IDL.Opt(IDL.Nat),
    'timestamp' : IDL.Nat,
    'amount' : IDL.Nat,
  });
  const CanisterData = IDL.Record({
    'skip' : IDL.Nat,
    'fulled' : IDL.Bool,
    'length' : IDL.Nat,
    'canisterId' : IDL.Text,
  });
  const Value = IDL.Variant({
    'Int' : IDL.Int,
    'Nat' : IDL.Nat,
    'Blob' : IDL.Vec(IDL.Nat8),
    'Text' : IDL.Text,
  });
  const MetaDatum = IDL.Tuple(IDL.Text, Value);
  const TransferArgs = IDL.Record({
    'to' : IDL.Text,
    'from' : IDL.Text,
    'kind' : Kind,
    'memo' : IDL.Text,
    'txId' : TxId,
    'chainFee' : IDL.Opt(IDL.Nat),
    'amount' : IDL.Nat,
  });
  const TxIndex = IDL.Nat;
  const TransferResult = IDL.Variant({
    'ok' : IDL.Tuple(TxIndex, Balance, Balance),
    'err' : IDL.Text,
  });
  const Token = IDL.Service({
    'balance_of' : IDL.Func([MoneyAddress], [Balance], ['query']),
    'code' : IDL.Func([], [IDL.Text], ['query']),
    'cyclesBalance' : IDL.Func([], [IDL.Nat], ['query']),
    'decimals' : IDL.Func([], [IDL.Nat], ['query']),
    'entriesAccounts' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Nat, IDL.Nat64))],
        ['query'],
      ),
    'fee' : IDL.Func([], [TransferFee], ['query']),
    'filterTrxBuffer' : IDL.Func(
        [FilterArgs],
        [IDL.Vec(Transaction)],
        ['query'],
      ),
    'getCanisterData' : IDL.Func([], [IDL.Vec(CanisterData)], ['query']),
    'listTransaction' : IDL.Func(
        [IDL.Opt(FilterArgs), IDL.Nat, IDL.Nat8],
        [IDL.Vec(Transaction)],
        ['composite_query'],
      ),
    'listTrxBuffer' : IDL.Func([], [IDL.Vec(Transaction)], ['query']),
    'metadata' : IDL.Func([], [IDL.Vec(MetaDatum)], ['query']),
    'name' : IDL.Func([], [IDL.Text], ['query']),
    'queryTrxStatus' : IDL.Func([], [IDL.Nat, IDL.Nat], ['query']),
    'resetArgs' : IDL.Func([InitArgs], [], ['oneway']),
    'rts_info' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Text, IDL.Nat))],
        ['query'],
      ),
    'symbol' : IDL.Func([], [IDL.Text], ['query']),
    'testTransferFee' : IDL.Func([IDL.Nat], [IDL.Nat], ['query']),
    'total_balance' : IDL.Func([], [Balance], ['query']),
    'total_transactions' : IDL.Func([], [IDL.Nat], ['query']),
    'transfer' : IDL.Func([TransferArgs], [TransferResult], []),
    'updateControllers' : IDL.Func([IDL.Text], [IDL.Vec(IDL.Bool)], []),
    'upgradeArchiveCanister' : IDL.Func([IDL.Vec(IDL.Nat8)], [IDL.Bool], []),
    'xfTransaction' : IDL.Func([IDL.Text], [IDL.Bool], []),
  });
  return Token;
};
export const init = ({ IDL }) => {
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
  const InitArgs = IDL.Record({
    'web' : IDL.Text,
    'decimals' : IDL.Nat,
    'code' : CoinCode,
    'name' : CoinName,
    'transferFee' : TransferFee,
    'crossChainConfs' : IDL.Vec(CrossChainConf),
    'max_supply' : IDL.Opt(IDL.Nat),
    'symbol' : IDL.Text,
  });
  return [InitArgs, IDL.Principal];
};
