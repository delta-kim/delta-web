import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface AppIdentityToken {
  'did' : DID,
  'token' : Token,
  'canisterId' : CanisterId,
}
export type Avatar = string;
export type CanisterId = string;
export type DID = string;
export type Index = bigint;
export interface Main {
  'addRoadNode' : ActorMethod<[RoadNode], boolean>,
  'addSuggestion' : ActorMethod<
    [string, string, AppIdentityToken],
    [Index, Suggestion, Avatar]
  >,
  'addVote' : ActorMethod<[bigint, VoteMark, string, AppIdentityToken], Vote>,
  'editSuggestion' : ActorMethod<[bigint, string, AppIdentityToken], boolean>,
  'listHeat90Sugg' : ActorMethod<[bigint], Array<Suggestion>>,
  'listRoadNodes' : ActorMethod<[], Array<RoadNode>>,
  'listSuggestion' : ActorMethod<[bigint], Array<Suggestion>>,
  'listVote' : ActorMethod<[bigint, bigint], Array<Vote>>,
  'myVote' : ActorMethod<[bigint, AppIdentityToken], [] | [VoteSB]>,
}
export type Nickname = string;
export interface RoadNode {
  'status' : Status,
  'suggestionId' : Array<bigint>,
  'title' : string,
  'content' : string,
  'progressLine' : Array<[Status, Timestamp]>,
}
export type Status = { 'inprogress' : null } |
  { 'completed' : null } |
  { 'queuing' : null };
export interface Suggestion {
  'did' : DID,
  'title' : string,
  'content' : string,
  'nickname' : Nickname,
  'totalVotes' : { 'no' : bigint, 'yes' : bigint },
  'adoptedRoadNodeId' : [] | [bigint],
  'timestamp' : Timestamp,
}
export type Timestamp = bigint;
export type Token = string;
export interface Vote {
  'did' : DID,
  'content' : string,
  'mark' : VoteMark,
  'timestamp' : Timestamp,
}
export type VoteMark = { 'no' : null } |
  { 'yes' : null };
export interface VoteSB {
  'content' : string,
  'mark' : VoteMark,
  'timestamp' : Timestamp,
}
export interface _SERVICE extends Main {}
