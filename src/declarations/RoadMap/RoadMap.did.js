export const idlFactory = ({ IDL }) => {
  const Status = IDL.Variant({
    'processing' : IDL.Null,
    'completed' : IDL.Null,
    'queuing' : IDL.Null,
  });
  const Timestamp = IDL.Nat;
  const RoadNode = IDL.Record({
    'status' : Status,
    'suggestionId' : IDL.Vec(IDL.Nat),
    'title' : IDL.Text,
    'content' : IDL.Text,
    'progressLine' : IDL.Vec(IDL.Tuple(Status, Timestamp)),
  });
  const DID = IDL.Text;
  const Token = IDL.Text;
  const CanisterId = IDL.Text;
  const AppIdentityToken = IDL.Record({
    'did' : DID,
    'token' : Token,
    'canisterId' : CanisterId,
  });
  const Index = IDL.Nat;
  const Nickname = IDL.Text;
  const Suggestion = IDL.Record({
    'did' : DID,
    'title' : IDL.Text,
    'content' : IDL.Text,
    'nickname' : Nickname,
    'totalVotes' : IDL.Record({ 'no' : IDL.Nat, 'yes' : IDL.Nat }),
    'adoptedRoadNodeId' : IDL.Opt(IDL.Nat),
    'timestamp' : Timestamp,
  });
  const Avatar = IDL.Text;
  const VoteMark = IDL.Variant({ 'no' : IDL.Null, 'yes' : IDL.Null });
  const Vote = IDL.Record({
    'did' : DID,
    'content' : IDL.Text,
    'mark' : VoteMark,
    'timestamp' : Timestamp,
  });
  const VoteSB = IDL.Record({
    'content' : IDL.Text,
    'mark' : VoteMark,
    'timestamp' : Timestamp,
  });
  const Main = IDL.Service({
    'addRoadNode' : IDL.Func([RoadNode], [IDL.Bool], []),
    'addSuggestion' : IDL.Func(
        [IDL.Text, IDL.Text, AppIdentityToken],
        [Index, Suggestion, Avatar],
        [],
      ),
    'addVote' : IDL.Func(
        [IDL.Nat, VoteMark, IDL.Text, AppIdentityToken],
        [Vote],
        [],
      ),
    'editSuggestion' : IDL.Func(
        [IDL.Nat, IDL.Text, AppIdentityToken],
        [IDL.Bool],
        [],
      ),
    'listHeat90Sugg' : IDL.Func([IDL.Nat], [IDL.Vec(Suggestion)], ['query']),
    'listRoadNodes' : IDL.Func([], [IDL.Vec(RoadNode)], ['query']),
    'listSuggestion' : IDL.Func([IDL.Nat], [IDL.Vec(Suggestion)], ['query']),
    'listVote' : IDL.Func([IDL.Nat, IDL.Nat], [IDL.Vec(Vote)], ['query']),
    'myVote' : IDL.Func(
        [IDL.Nat, AppIdentityToken],
        [IDL.Opt(VoteSB)],
        ['query'],
      ),
  });
  return Main;
};
export const init = ({ IDL }) => { return []; };
