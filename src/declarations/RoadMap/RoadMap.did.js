export const idlFactory = ({ IDL }) => {
  const VoteMark = IDL.Variant({ 'no' : IDL.Null, 'yes' : IDL.Null });
  const DID = IDL.Text;
  const Token = IDL.Text;
  const IdentityToken = IDL.Record({ 'did' : DID, 'token' : Token });
  const CanisterId = IDL.Text;
  const AppIdentityTokenArgs = IDL.Record({
    'dAppIdentToken' : IdentityToken,
    'accCanisterId' : CanisterId,
  });
  const Timestamp = IDL.Nat;
  const Vote = IDL.Record({
    'did' : DID,
    'content' : IDL.Text,
    'mark' : VoteMark,
    'timestamp' : Timestamp,
  });
  const TotalVotes = IDL.Record({ 'no' : IDL.Nat, 'yes' : IDL.Nat });
  const Status = IDL.Variant({
    'completed' : IDL.Null,
    'queuing' : IDL.Null,
    'processing' : IDL.Null,
  });
  const RoadNode = IDL.Record({
    'id' : IDL.Nat,
    'status' : Status,
    'suggestionId' : IDL.Vec(IDL.Nat),
    'title' : IDL.Text,
    'content' : IDL.Text,
    'updateLogId' : IDL.Vec(IDL.Nat),
    'progressLine' : IDL.Vec(IDL.Tuple(Status, Timestamp)),
  });
  const Nickname = IDL.Text;
  const Suggestion = IDL.Record({
    'did' : DID,
    'title' : IDL.Text,
    'content' : IDL.Text,
    'nickname' : Nickname,
    'totalVotes' : TotalVotes,
    'adoptedRoadNodeId' : IDL.Opt(IDL.Nat),
    'timestamp' : Timestamp,
    'index' : IDL.Nat,
  });
  const UpdateLog = IDL.Variant({
    'DSMSAccessTerminal' : IDL.Text,
    'Website' : IDL.Text,
    'MobileApp' : IDL.Text,
    'SmartContract' : IDL.Text,
    'Other' : IDL.Text,
  });
  const UpdateLogObj = IDL.Record({
    'id' : IDL.Nat,
    'suggestionId' : IDL.Vec(IDL.Nat),
    'logs' : IDL.Vec(UpdateLog),
    'time' : Timestamp,
  });
  const Index = IDL.Nat;
  const MobileAppType = IDL.Variant({ 'ios' : IDL.Null, 'android' : IDL.Null });
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
  const VoteSB = IDL.Record({
    'content' : IDL.Text,
    'mark' : VoteMark,
    'timestamp' : Timestamp,
  });
  const Main = IDL.Service({
    'addAndUpdateVote' : IDL.Func(
        [IDL.Nat, VoteMark, IDL.Text, AppIdentityTokenArgs],
        [Vote, TotalVotes],
        [],
      ),
    'addRoadNode' : IDL.Func([RoadNode], [IDL.Bool], []),
    'addSuggestion' : IDL.Func(
        [IDL.Text, IDL.Text, AppIdentityTokenArgs],
        [Suggestion],
        [],
      ),
    'addUpdateLog' : IDL.Func([UpdateLogObj, IDL.Opt(IDL.Nat)], [Index], []),
    'changeUpdateLog' : IDL.Func([IDL.Nat, UpdateLogObj], [Index], []),
    'cyclesBalance' : IDL.Func([], [IDL.Nat], ['query']),
    'deposit_cycles' : IDL.Func([IDL.Nat], [IDL.Bool], []),
    'editSuggestion' : IDL.Func(
        [IDL.Nat, IDL.Text, AppIdentityTokenArgs],
        [IDL.Bool],
        [],
      ),
    'getMobileApplastVersion' : IDL.Func(
        [MobileAppType],
        [MobileApplastVersion],
        ['query'],
      ),
    'getSuggestion' : IDL.Func([IDL.Nat], [Suggestion], ['query']),
    'init' : IDL.Func([], [], ['oneway']),
    'listHot30Sugg' : IDL.Func([], [IDL.Vec(Suggestion)], ['query']),
    'listRoadNodes' : IDL.Func([], [IDL.Vec(RoadNode)], ['query']),
    'listSuggestion' : IDL.Func([IDL.Nat], [IDL.Vec(Suggestion)], ['query']),
    'listUpdateLog' : IDL.Func([IDL.Nat], [IDL.Vec(UpdateLogObj)], ['query']),
    'listVote' : IDL.Func([IDL.Nat, IDL.Nat], [IDL.Vec(Vote)], ['query']),
    'myVote' : IDL.Func(
        [IDL.Nat, AppIdentityTokenArgs],
        [IDL.Opt(VoteSB)],
        ['query'],
      ),
    'rts_info' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Text, IDL.Nat))],
        ['query'],
      ),
    'updateMobileApplastVersion' : IDL.Func(
        [IDL.Vec(MobileApplastVersion)],
        [IDL.Bool],
        [],
      ),
  });
  return Main;
};
export const init = ({ IDL }) => { return []; };
