export const idlFactory = ({ IDL }) => {
  const MemberInfo = IDL.Record({
    'title' : IDL.Text,
    'name' : IDL.Text,
    'detail' : IDL.Text,
    'group' : IDL.Vec(IDL.Text),
    'pages' : IDL.Vec(IDL.Tuple(IDL.Text, IDL.Text)),
    'photo' : IDL.Text,
  });
  const CanisterId = IDL.Text;
  const DID = IDL.Text;
  const Token = IDL.Text;
  const IdentityToken = IDL.Record({ 'did' : DID, 'token' : Token });
  const CountryCode = IDL.Text;
  const DaysCountItems = IDL.Vec(
    IDL.Record({ 'val' : IDL.Nat, 'name' : IDL.Text })
  );
  const Balance = IDL.Nat;
  const MemberInfoArgs = IDL.Record({
    'id' : IDL.Nat,
    'title' : IDL.Text,
    'name' : IDL.Text,
    'detail' : IDL.Text,
    'group' : IDL.Vec(IDL.Text),
    'pages' : IDL.Vec(IDL.Tuple(IDL.Text, IDL.Text)),
    'photo' : IDL.Text,
  });
  const Days = IDL.Nat;
  const Main = IDL.Service({
    'addCoreMember' : IDL.Func(
        [MemberInfo, CanisterId, IdentityToken],
        [IDL.Bool],
        [],
      ),
    'addMemberGroup' : IDL.Func([IDL.Text], [IDL.Bool], []),
    'countByCountry' : IDL.Func(
        [IDL.Text],
        [IDL.Vec(IDL.Tuple(CountryCode, IDL.Nat))],
        ['query'],
      ),
    'countByDays' : IDL.Func(
        [IDL.Nat, IDL.Nat],
        [IDL.Vec(IDL.Tuple(IDL.Nat, DaysCountItems))],
        ['query'],
      ),
    'cyclesBalance' : IDL.Func([], [IDL.Nat], ['query']),
    'delMemberGroup' : IDL.Func([IDL.Text], [IDL.Bool], []),
    'getByCountry' : IDL.Func([CountryCode, IDL.Text], [IDL.Nat], ['query']),
    'getTop100IncomeUSCT' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(DID, Balance))],
        ['query'],
      ),
    'listCoreMember' : IDL.Func([], [IDL.Vec(MemberInfoArgs)], ['query']),
    'listMemberGroup' : IDL.Func([], [IDL.Vec(IDL.Text)], ['query']),
    'modifyCoreMember' : IDL.Func(
        [IDL.Nat, MemberInfo, CanisterId, IdentityToken],
        [IDL.Bool],
        [],
      ),
    'moveIndexCoreMember' : IDL.Func(
        [IDL.Nat, IDL.Nat, CanisterId, IdentityToken],
        [IDL.Bool],
        [],
      ),
    'registerOne2' : IDL.Func([CountryCode, IDL.Nat], [], ['oneway']),
    'rts_info' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Text, IDL.Nat))],
        ['query'],
      ),
    'update' : IDL.Func(
        [IDL.Vec(IDL.Tuple(Days, IDL.Nat)), IDL.Vec(IDL.Tuple(DID, Balance))],
        [IDL.Bool],
        [],
      ),
  });
  return Main;
};
export const init = ({ IDL }) => { return []; };
